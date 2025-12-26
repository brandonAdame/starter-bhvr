import { Spinner } from "@/components/ui/spinner";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Suspense } from "react";
import { apiClient } from "@/client/axiosClient";

type RootContext = {
  queryClient: QueryClient;
  apiClient: typeof apiClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <Suspense
      fallback={
        <div>
          <Spinner className="size-8 text-green-500" />
        </div>
      }
    >
      <>
        <main className="font-monsterrat pt-5">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </>
    </Suspense>
  ),
});
