import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export default function LoginCard() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
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

        navigate({ to: "/" });
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
        console.log("Login error:", error);
      }
    },
  });

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center font-semibold text-2xl">
        Login
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder="Enter your email"
                      type="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter your password"
                      type="password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
          ]}
          children={([canSubmit, isSubmitting, isDirty]) => (
            <Field orientation={"horizontal"}>
              <Button variant={"outline"} onClick={() => form.reset()}>
                Reset
              </Button>
              <Button
                type="submit"
                form="login-form"
                disabled={!canSubmit || isSubmitting || !isDirty}
              >
                Login
              </Button>
            </Field>
          )}
        />
      </CardFooter>
    </Card>
  );
}
