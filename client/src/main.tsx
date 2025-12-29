import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./components/contexts/AuthContext";
import { AuthModalProvider } from "./components/contexts/AuthModalContext";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!, // Will be set by InnerApp
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface RouterContext {
    queryClient: QueryClient;
    auth: {
      isAuthenticated: boolean;
      user: any;
      isLoading: boolean;
    };
  }
}

function InnerApp() {
  const auth = useAuth();

  // Show loading state while validating auth
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        auth: {
          isAuthenticated: auth.isAuthenticated,
          user: auth.user,
          isLoading: auth.isLoading,
        },
      }}
    />
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Check if it's in your index.html or if the id is correct."
  );
}

// Render the app
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <AuthModalProvider>
          <QueryClientProvider client={queryClient}>
            <InnerApp />
            <Toaster />
          </QueryClientProvider>
        </AuthModalProvider>
      </AuthProvider>
    </StrictMode>
  );
}
