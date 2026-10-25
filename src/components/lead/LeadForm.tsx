import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { OFFER_LIST } from "@/data/offers";
import { readAttribution } from "@/lib/attribution";
import { buildLeadWhatsAppUrl } from "@/lib/lead-message";
import { leadSchema, type LeadInput, type ProductId } from "@/lib/lead-schema";
import { submitLead } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

const CHOICES: { id: ProductId; label: string }[] = [
  ...OFFER_LIST.map((o) => ({ id: o.id as ProductId, label: o.name })),
  { id: "nao-sei", label: "Ainda não sei" },
];

type Errors = Partial<Record<string, string>>;

const fieldClass = "mt-1.5 h-12 text-base";
const errorClass = "mt-1.5 text-sm text-destructive";
const primaryButton =
  "h-12 w-full rounded-full bg-brand-blue text-base text-white hover:bg-brand-blue/90";

/**
 * Formulário de 2 passos: o que a pessoa quer ver e quem é ela.
 * Por enquanto é um só para todos os produtos; perguntas específicas de cada
 * produto entram depois, em passos novos após a reunião.
 */
export function LeadForm({ defaultProduct }: { defaultProduct?: ProductId }) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [product, setProduct] = useState<ProductId | undefined>(defaultProduct);
  const [business, setBusiness] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const draft: Partial<LeadInput> = { product, business, name };

  function goToStep2(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!product) next.product = "Escolha o que você quer ver";
    if (!business.trim()) next.business = "Conte o nome ou o tipo do negócio";
    setErrors(next);
    if (Object.keys(next).length === 0) setStep(2);
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    const parsed = leadSchema.safeParse({
      product,
      business,
      name,
      phone,
      email,
      link,
      website,
      attribution: readAttribution(),
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setFailed(false);
    setSending(true);
    const result = await submitLead(parsed.data);
    setSending(false);
    if (result.ok) navigate("/obrigado");
    else setFailed(true);
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <p className="text-sm font-medium text-muted-foreground" aria-live="polite">
        Passo {step} de 2
      </p>

      {step === 1 ? (
        <form onSubmit={goToStep2} noValidate className="mt-4 space-y-5">
          <fieldset>
            <legend className="text-lg font-semibold tracking-tight">O que você quer ver?</legend>
            <div className="mt-3 grid gap-2">
              {CHOICES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setProduct(c.id)}
                  aria-pressed={product === c.id}
                  className={cn(
                    "flex min-h-12 items-center justify-between rounded-2xl border px-4 text-left text-base font-medium transition-colors",
                    product === c.id
                      ? "border-brand-blue bg-brand-blue/5 text-foreground"
                      : "border-border hover:border-brand-blue/50",
                  )}
                >
                  {c.label}
                  {product === c.id && <Check className="h-4 w-4 text-brand-blue" />}
                </button>
              ))}
            </div>
            {errors.product && <p className={errorClass}>{errors.product}</p>}
          </fieldset>

          <div>
            <label htmlFor="lead-business" className="text-sm font-medium">
              Qual é o seu negócio?
            </label>
            <Input
              id="lead-business"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="Ex.: barbearia, escola infantil, loja"
              maxLength={80}
              className={fieldClass}
            />
            {errors.business && <p className={errorClass}>{errors.business}</p>}
          </div>

          <Button type="submit" size="lg" className={primaryButton}>
            Continuar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <form onSubmit={send} noValidate className="relative mt-4 space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">Para onde enviamos o horário?</h3>

          <div>
            <label htmlFor="lead-name" className="text-sm font-medium">
              Seu nome
            </label>
            <Input
              id="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              maxLength={80}
              className={fieldClass}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="lead-phone" className="text-sm font-medium">
              WhatsApp com DDD
            </label>
            <Input
              id="lead-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="(31) 99999-9999"
              maxLength={20}
              className={fieldClass}
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="lead-link" className="text-sm font-medium">
              Instagram ou página do Google do negócio{" "}
              <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <Input
              id="lead-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="@seunegocio ou link"
              maxLength={200}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="lead-email" className="text-sm font-medium">
              E-mail <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={fieldClass}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          {/* Isca para robôs: fica fora da tela e fora da navegação por teclado. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="lead-website">Não preencha</label>
            <input
              id="lead-website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {failed && (
            <div
              role="alert"
              className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm"
            >
              <p className="font-medium">
                Não conseguimos enviar agora. Seus dados não se perderam.
              </p>
              <Button
                asChild
                className="mt-3 h-11 w-full rounded-full bg-brand-green text-white hover:bg-brand-green/90"
              >
                <a href={buildLeadWhatsAppUrl(draft)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Falar no WhatsApp com tudo preenchido
                </a>
              </Button>
            </div>
          )}

          <Button type="submit" size="lg" disabled={sending} className={primaryButton}>
            {sending && <Loader2 className="h-4 w-4 animate-spin" />}
            {sending ? "Enviando" : "Agendar demonstração"}
          </Button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Voltar
          </button>
        </form>
      )}
    </div>
  );
}
