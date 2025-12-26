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
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Email is required";
                  const result = z.email().safeParse(value);
                  return !result.success
                    ? result.error.issues[0].message
                    : undefined;
                },
              }}
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
                      <FieldError
                        errors={field.state.meta.errors.map((err) =>
                          typeof err === "string" ? { message: err } : err
                        )}
                      />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Password is required";
                  const result = z.string().min(8).safeParse(value);
                  return !result.success
                    ? result.error.issues[0].message
                    : undefined;
                },
              }}
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
                      <FieldError
                        errors={field.state.meta.errors.map((err) =>
                          typeof err === "string" ? { message: err } : err
                        )}
                      />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"horizontal"}>
          <Button
            className="cursor-pointer"
            variant={"outline"}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            className="cursor-pointer"
            type="submit"
            form="login-form"
            disabled={form.state.isSubmitting || !form.state.isFormValid}
          >
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
