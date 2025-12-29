import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/hooks/use-login-form";

interface LoginFormContentProps {
  form: ReturnType<typeof useLoginForm>;
}

export function LoginFormContent({ form: loginForm }: LoginFormContentProps) {

  return (
    <div className="flex flex-col space-y-5">
      <FieldGroup>
        <loginForm.Field
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <loginForm.Field
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <loginForm.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isDirty,
        ]}
        children={([canSubmit, isSubmitting, isDirty]) => (
          <Field orientation={"horizontal"}>
            <Button variant={"outline"} onClick={() => loginForm.reset()}>
              Reset
            </Button>
            <Button
              type="submit"
              form="login-form-modal"
              disabled={!canSubmit || isSubmitting || !isDirty}
            >
              Login
            </Button>
          </Field>
        )}
      />
    </div>
  );
}
