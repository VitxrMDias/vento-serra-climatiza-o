import { ArrowRight } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CITY, ENVIRONMENT_OPTIONS, IS_DEMO, SERVICE_OPTIONS, type ServiceId } from "@/config/site";
import {
  buildQuoteMessage,
  EMPTY_QUOTE,
  FIELD_ORDER,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteInput,
} from "@/lib/quote";
import { cn } from "@/lib/utils";

import { QuoteSummaryDialog } from "./QuoteSummaryDialog";

const fieldId = (f: QuoteField) => `orc-${f}`;
const errorId = (f: QuoteField) => `orc-${f}-erro`;

const inputClass =
  "h-12 rounded-xl border-input bg-background px-4 text-base focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive";

function FieldError({ field, errors }: { field: QuoteField; errors: QuoteErrors }) {
  if (!errors[field]) return null;
  return (
    <p id={errorId(field)} className="mt-2 text-sm font-medium text-destructive">
      {errors[field]}
    </p>
  );
}

function Optional() {
  return <span className="ml-1.5 font-normal text-muted-foreground">(opcional)</span>;
}

interface ChoiceProps {
  field: "service" | "environment";
  legend: string;
  options: readonly { id: string; label: string }[];
  value: string;
  errors: QuoteErrors;
  onChange: (v: string) => void;
  columns: string;
}

function ChoiceGroup({ field, legend, options, value, errors, onChange, columns }: ChoiceProps) {
  const invalid = Boolean(errors[field]);
  return (
    <fieldset aria-describedby={invalid ? errorId(field) : undefined}>
      <legend className="text-sm font-semibold">
        {legend} <span className="text-cta" aria-hidden="true">*</span>
        <span className="sr-only"> (obrigatório)</span>
      </legend>
      <div className={cn("mt-3 grid gap-2.5", columns)}>
        {options.map((o, i) => {
          const id = `${fieldId(field)}-${o.id}`;
          return (
            <div key={o.id}>
              <input
                type="radio"
                id={id}
                name={field}
                value={o.id}
                checked={value === o.id}
                onChange={() => onChange(o.id)}
                aria-invalid={invalid || undefined}
                // o primeiro radio recebe o id do campo para o foco em caso de erro
                data-field={i === 0 ? field : undefined}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center rounded-xl border bg-background px-4 py-3 text-[0.95rem] leading-snug transition-colors duration-150",
                  "hover:border-petrol/50 peer-checked:border-petrol peer-checked:bg-petrol peer-checked:text-primary-foreground",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card",
                  invalid && "border-destructive/70",
                )}
              >
                {o.label}
              </label>
            </div>
          );
        })}
      </div>
      <FieldError field={field} errors={errors} />
    </fieldset>
  );
}

export function QuoteForm({ preselected }: { preselected: { id: ServiceId; at: number } | null }) {
  const [values, setValues] = useState<QuoteInput>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (preselected) {
      setValues((v) => ({ ...v, service: preselected.id }));
      setErrors((e) => ({ ...e, service: undefined }));
    }
  }, [preselected]);

  const set = (field: QuoteField) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const focusField = (field: QuoteField) => {
    const el =
      document.querySelector<HTMLElement>(`[data-field="${field}"]`) ??
      document.getElementById(fieldId(field));
    el?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateQuote(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = FIELD_ORDER.find((f) => result.errors[f]);
      if (first) focusField(first);
      return;
    }
    setErrors({});
    setMessage(buildQuoteMessage(result.data));
    setOpen(true);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="bg-secondary/60 py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Simulação
          </p>
          <h2 id="orcamento-title" className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
            Simule seu pedido de orçamento.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Campos com <span className="text-cta">*</span> são obrigatórios. Ao final, você vê um
            resumo pronto para copiar.
          </p>
          {IS_DEMO ? (
            <p className="mt-6 rounded-xl border border-cta/40 bg-cta/10 px-4 py-3 text-sm font-medium">
              Simulação: nenhuma mensagem é enviada ou armazenada.
            </p>
          ) : null}
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          aria-label="Simulação de orçamento"
          className="space-y-8 rounded-2xl border bg-card p-6 shadow-soft sm:p-10 lg:col-span-8"
        >
          <div aria-live="polite" className="sr-only">
            {errorCount > 0 ? `Há ${errorCount} campo(s) para corrigir.` : ""}
          </div>

          <div>
            <Label htmlFor={fieldId("name")} className="text-sm font-semibold">
              Seu nome <Optional />
            </Label>
            <Input
              id={fieldId("name")}
              autoComplete="given-name"
              maxLength={80}
              value={values.name}
              onChange={(e) => set("name")(e.target.value)}
              aria-invalid={Boolean(errors.name) || undefined}
              aria-describedby={errors.name ? errorId("name") : undefined}
              className={cn(inputClass, "mt-2")}
            />
            <FieldError field="name" errors={errors} />
          </div>

          <ChoiceGroup
            field="service"
            legend="Tipo de serviço"
            options={SERVICE_OPTIONS}
            value={values.service}
            errors={errors}
            onChange={set("service")}
            columns="sm:grid-cols-2"
          />

          <div>
            <Label htmlFor={fieldId("neighborhood")} className="text-sm font-semibold">
              Bairro <span className="text-cta" aria-hidden="true">*</span>
              <span className="sr-only"> (obrigatório)</span>
            </Label>
            <Input
              id={fieldId("neighborhood")}
              autoComplete="address-level3"
              maxLength={80}
              placeholder={`Ex.: o seu bairro em ${CITY}`}
              value={values.neighborhood}
              onChange={(e) => set("neighborhood")(e.target.value)}
              aria-required="true"
              aria-invalid={Boolean(errors.neighborhood) || undefined}
              aria-describedby={errors.neighborhood ? errorId("neighborhood") : undefined}
              className={cn(inputClass, "mt-2")}
            />
            <FieldError field="neighborhood" errors={errors} />
          </div>

          <ChoiceGroup
            field="environment"
            legend="Tipo de ambiente"
            options={ENVIRONMENT_OPTIONS}
            value={values.environment}
            errors={errors}
            onChange={set("environment")}
            columns="grid-cols-2 sm:grid-cols-3"
          />

          <div>
            <Label htmlFor={fieldId("description")} className="text-sm font-semibold">
              Conte um pouco mais <Optional />
            </Label>
            <Textarea
              id={fieldId("description")}
              rows={4}
              maxLength={600}
              placeholder="Ex.: o aparelho da sala está pingando e com cheiro forte."
              value={values.description}
              onChange={(e) => set("description")(e.target.value)}
              aria-invalid={Boolean(errors.description) || undefined}
              aria-describedby={`${fieldId("description")}-dica${errors.description ? ` ${errorId("description")}` : ""}`}
              className="mt-2 rounded-xl border-input bg-background px-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p id={`${fieldId("description")}-dica`} className="mt-2 text-sm text-muted-foreground">
              Marca, potência (BTUs) ou o sintoma ajudam bastante. {values.description.length}/600
            </p>
            <FieldError field="description" errors={errors} />
          </div>

          <div className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Nada é enviado ao clicar.</p>
            <Button type="submit" variant="cta" size="xl" className="group">
              Ver resumo da solicitação
              <ArrowRight
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </Button>
          </div>
        </form>
      </div>

      <QuoteSummaryDialog open={open} onOpenChange={setOpen} message={message} />
    </section>
  );
}
