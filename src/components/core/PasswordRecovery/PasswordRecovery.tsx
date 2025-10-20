import Stepper, { Step } from "@/components/Stepper";
import { DialogComponent } from "@/components/shared/Dialog/DialogComponent";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PasswordRecovery({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const isEmailValid = email.includes("@");
  const isCodeValid = code.length === 6;
  const isPasswordValid = password.length >= 6 && password === confirm;

  const handleNext = async (step: number) => {
    try {
      setLoading(true);
      if (step === 1) {
        // Chamada para enviar e-mail
        const res = await fetch("/auth/recovery/request", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        if (!res.ok) toast.error("Erro ao enviar e-mail");
      }
      if (step === 2) {
        // Verificação do código
        const res = await fetch("/auth/recovery/verify", {
          method: "POST",
          body: JSON.stringify({ email, code }),
        });
        if (!res.ok) toast.error("Código inválido");
      }
      if (step === 3) {
        // Atualizar senha
        const res = await fetch("/api/reset-password", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) toast.error("Erro ao redefinir senha");
        onOpenChange(false); // fecha o dialog
      }

      return true; // permite avançar
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
      return false; // bloqueia avanço
    } finally {
      setLoading(false);
    }
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
