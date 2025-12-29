import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import LoginModal from "@/components/modals/login-modal";
import { useAuth } from "@/components/contexts/AuthContext";
import { useAuthModal } from "@/components/contexts/AuthModalContext";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();

  // Open modal when user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      openModal();
    }
  }, [isAuthenticated, openModal]);

  return (
    <>
      <LoginModal />
      {isAuthenticated ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className="font-monsterrat pt-5 flex w-full justify-center">
            <Outlet />
          </main>
        </SidebarProvider>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          {/* Modal will show, this is just a placeholder */}
        </div>
      )}
    </>
  );
}
