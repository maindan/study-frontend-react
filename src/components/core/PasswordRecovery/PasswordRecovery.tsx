import Stepper, { Step } from "@/components/Stepper";
import { DialogComponent } from "@/components/shared/Dialog/DialogComponent";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function PasswordRecovery({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const urlBase = import.meta.env.VITE_API_BASE_URL

  // Validações de cada step
  const isEmailValid = email.includes("@");
  const isCodeValid = code.length === 6;
  const isPasswordValid = password.trim().length >= 6 && password === confirm;
  
  useEffect(() => {
    setEmail('');
    setCode('');
    setPassword('');
    setConfirm('');
    setLoading(false);
  }, [open])

  async function handleNext(step: number): Promise<boolean> {
    setLoading(true);
    
    if (step === 1) {
      return axios.post(`${urlBase}/auth/recovery/request`, { email })
        .then(() => {
          toast.success("Se o e-mail estiver cadastrado no banco, um código de confirmação será enviado.");
          return true;
        })
        .catch(err => {
          toast.error(err?.response?.data?.message || "Erro ao enviar e-mail.");
          return false;
        })
        .finally(() => setLoading(false));
    }

    if (step === 2) {
      return axios.post(`${urlBase}/auth/recovery/verify`, { email, otpCode: code })
        .then(() => {
          toast.success("Código verificado com sucesso!");
          return true;
        })
        .catch(err => {
          toast.error(err?.response?.data?.message || "Código inválido.");
          return false;
        })
        .finally(() => setLoading(false));
    }

    if (step === 3) {
      return axios.post(`${urlBase}/auth/recovery/update`, { email, otpCode: code, password })
        .then(() => {
          toast.success("Senha atualizada com sucesso!");
          onOpenChange(false);
          return true;
        })
        .catch(err => {
          toast.error(err?.response?.data?.message || "Erro ao atualizar senha.");
          return false;
        })
        .finally(() => setLoading(false));
    }

    return Promise.resolve(false);
  };

  return (
    <DialogComponent
      open={open}
      onOpenChange={onOpenChange}
      hideBtns={true}
      className="w-[400px] h-fit flex items-center justify-center border-0 p-0 rounded-4xl"
    >
      <Stepper
        initialStep={1}
        backButtonText="Voltar"
        nextButtonText="Avançar"
        completeButtonText="Salvar"
        className="flex-1 min-w-full mr-4"
        onStepChange={setCurrentStep}
        onNext={handleNext}
        isNextLoading={loading}
        isNextDisabled={
          (currentStep === 1 && !isEmailValid) ||
          (currentStep === 2 && !isCodeValid) ||
          (currentStep === 3 && !isPasswordValid)
        }
      >
        <Step>
          <div className="pb-1">
            <h2 className="text-lg font-semibold mb-2">Informe seu e-mail</h2>
            <p className="text-sm text-gray-600 mb-4">Enviaremos um código de verificação para o e-mail informado.</p>
            <input
              className="border w-full p-2 rounded"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Step>

        <Step>
          <div className="pb-1">
            <h2 className="text-lg font-semibold mb-2">Código de verificação</h2>
            <p className="text-sm text-gray-600 mb-4">Insira o código de 6 dígitos enviado para o seu e-mail.</p>
            <input
              className="border w-full p-2 rounded text-center tracking-widest"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </Step>

        <Step>
          <div className="pb-1">
            <h2 className="text-lg font-semibold mb-2">Nova senha</h2>
            <p className="text-sm text-gray-600 mb-4">Defina uma nova senha segura para sua conta.</p>
            <input
              className="border w-full p-2 rounded mb-2"
              placeholder="Nova senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border w-full p-2 rounded"
              placeholder="Confirmar senha"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </Step>
      </Stepper>
    </DialogComponent>
  );
}
