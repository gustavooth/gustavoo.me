import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getService } from "../data/services";
import { buildServiceMessage, buildWhatsAppUrl } from "../lib/whatsapp";
import WizardProgress from "../components/services/WizardProgress";
import StepService from "../components/services/StepService";
import StepConfig from "../components/services/StepConfig";
import StepContact from "../components/services/StepContact";

interface State {
  step: 1 | 2 | 3;
  serviceId: string | null;
  addons: Record<string, boolean>;
  texts: Record<string, string>;
  name: string;
  budget: string;
  hurry: boolean;
  hurryDays: string;
}

type Action =
  | { type: "SELECT_SERVICE"; id: string }
  | { type: "TOGGLE_ADDON"; id: string }
  | { type: "SET_TEXT"; id: string; value: string }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_BUDGET"; value: string }
  | { type: "TOGGLE_HURRY" }
  | { type: "SET_HURRY_DAYS"; value: string }
  | { type: "NEXT" }
  | { type: "BACK" };

const initialState: State = {
  step: 1,
  serviceId: null,
  addons: {},
  texts: {},
  name: "",
  budget: "",
  hurry: false,
  hurryDays: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_SERVICE": {
      const svc = getService(action.id);
      // Troca de serviço zera addons/texts (opções são específicas do serviço).
      const addons: Record<string, boolean> = {};
      svc?.addons.forEach((a) => {
        if (a.defaultOn) addons[a.id] = true;
      });
      return { ...state, serviceId: action.id, addons, texts: {}, step: 2 };
    }
    case "TOGGLE_ADDON":
      return {
        ...state,
        addons: { ...state.addons, [action.id]: !state.addons[action.id] },
      };
    case "SET_TEXT":
      return { ...state, texts: { ...state.texts, [action.id]: action.value } };
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_BUDGET":
      return { ...state, budget: action.value };
    case "TOGGLE_HURRY":
      // Ao desmarcar, limpa os dias para não vazar valor antigo na mensagem.
      return { ...state, hurry: !state.hurry, hurryDays: "" };
    case "SET_HURRY_DAYS":
      return { ...state, hurryDays: action.value };
    case "NEXT":
      return { ...state, step: Math.min(3, state.step + 1) as State["step"] };
    case "BACK":
      return { ...state, step: Math.max(1, state.step - 1) as State["step"] };
    default:
      return state;
  }
}

export default function Servicos() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const service = getService(state.serviceId);

  // Rola para o topo a cada troca de passo.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.step]);

  // Validação do passo atual para liberar "avançar"/"enviar".
  const requiredTextMissing =
    !!service &&
    (service.textareas ?? []).some(
      (ta) => ta.required && !state.texts[ta.id]?.trim()
    );

  const canAdvanceStep2 = !!service && !requiredTextMissing;
  const canSubmit = state.name.trim().length > 0;

  const waUrl =
    service &&
    buildWhatsAppUrl(
      buildServiceMessage({
        service,
        addons: state.addons,
        texts: state.texts,
        name: state.name,
        budget: state.budget,
        hurry: state.hurry,
        hurryDays: state.hurryDays,
      })
    );

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header slim */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-stroke">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="favicon.svg"
              alt="Gustavo Oliveira"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="text-sm font-medium text-text-primary">
            gustavoo<span className="text-muted">.me</span>
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao site
        </Link>
      </header>

      {/* Conteúdo do wizard */}
      <div className="flex-1 w-full max-w-[760px] mx-auto px-6 py-10 md:py-14 pb-28">
        <WizardProgress step={state.step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {state.step === 1 && (
              <StepService
                selectedId={state.serviceId}
                onSelect={(id) => dispatch({ type: "SELECT_SERVICE", id })}
              />
            )}
            {state.step === 2 && service && (
              <StepConfig
                service={service}
                addons={state.addons}
                texts={state.texts}
                onToggleAddon={(id) => dispatch({ type: "TOGGLE_ADDON", id })}
                onSetText={(id, value) =>
                  dispatch({ type: "SET_TEXT", id, value })
                }
              />
            )}
            {state.step === 3 && service && (
              <StepContact
                service={service}
                addons={state.addons}
                texts={state.texts}
                name={state.name}
                budget={state.budget}
                hurry={state.hurry}
                hurryDays={state.hurryDays}
                onSetName={(value) => dispatch({ type: "SET_NAME", value })}
                onSetBudget={(value) =>
                  dispatch({ type: "SET_BUDGET", value })
                }
                onToggleHurry={() => dispatch({ type: "TOGGLE_HURRY" })}
                onSetHurryDays={(value) =>
                  dispatch({ type: "SET_HURRY_DAYS", value })
                }
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Barra de ação fixa */}
      {state.step > 1 && (
        <div className="fixed bottom-0 inset-x-0 z-30 border-t border-stroke bg-bg/90 backdrop-blur-md">
          <div className="max-w-[760px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => dispatch({ type: "BACK" })}
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            {state.step === 2 && (
              <button
                type="button"
                disabled={!canAdvanceStep2}
                onClick={() => dispatch({ type: "NEXT" })}
                className="group relative rounded-full text-sm px-7 py-3.5 text-bg disabled:opacity-40 disabled:cursor-not-allowed transition-transform enabled:hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-text-primary" />
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            )}

            {state.step === 3 && (
              <a
                href={canSubmit ? waUrl : undefined}
                target="_blank"
                rel="noopener"
                aria-disabled={!canSubmit}
                onClick={(e) => {
                  if (!canSubmit) e.preventDefault();
                }}
                className={`group relative rounded-full text-sm px-6 sm:px-7 py-3.5 text-bg transition-transform ${
                  canSubmit
                    ? "hover:scale-105"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-full bg-text-primary transition-colors group-hover:bg-bg" />
                <span className="relative z-10 flex items-center gap-2 font-medium transition-colors group-hover:text-text-primary">
                  Enviar no WhatsApp
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
