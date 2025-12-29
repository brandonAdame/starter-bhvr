import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { LoginFormContent } from "@/forms/login-form";
import { useLoginForm } from "@/hooks/use-login-form";
import { useAuthModal } from "@/components/contexts/AuthModalContext";
import { useAuth } from "@/components/contexts/AuthContext";

export default function LoginModal() {
  const loginForm = useLoginForm();
  const { isOpen, closeModal } = useAuthModal();
  const { isAuthenticated } = useAuth();

  // Prevent closing the modal if user is not authenticated
  const handleOpenChange = (open: boolean) => {
    if (!open && isAuthenticated) {
      closeModal();
    }
    // If not authenticated, don't allow closing
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Login</DialogTitle>
          <DialogDescription>
            User session expired. Please login again.
          </DialogDescription>
        </DialogHeader>
        <form
          id="login-form-modal"
          onSubmit={(e) => {
            e.preventDefault();
            loginForm.handleSubmit();
          }}
        >
          <LoginFormContent form={loginForm} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
