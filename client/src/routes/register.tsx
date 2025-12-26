import RegistrationCard from "@/components/cards/registration-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegistrationCard />
    </div>
  );
}
