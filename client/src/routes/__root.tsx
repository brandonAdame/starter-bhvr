import { Spinner } from "@/components/ui/spinner";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Suspense } from "react";

type RootContext = {
  queryClient: QueryClient;
  auth: {
    isAuthenticated: boolean;
    user: any;
    isLoading: boolean;
  };
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
        <Outlet />
        <TanStackRouterDevtools position={"bottom-right"} />
      </>
    </Suspense>
  ),
});
