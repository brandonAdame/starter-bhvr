import { useAuth } from "@/components/contexts/AuthContext";
import { LoginSchema } from "@/schemas/login-form-schema";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuthModal } from "@/components/contexts/AuthModalContext";

export function useLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { closeModal } = useAuthModal();

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onBlur: LoginSchema,
      onChange: LoginSchema,
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password);
        closeModal();
        navigate({ to: "/" });
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
        console.log("Login error:", error);
      }
    },
  });

  return loginForm;
}
