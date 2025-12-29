import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:8090";

const RegistrationSchema = z.object({
  email: z.email(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100),
  phoneNumber: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid phone number format"
    )
    .or(z.literal("")),
  avatar: z.string(),
});

export default function RegistrationCard() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phoneNumber: "",
      avatar: "",
    },
    validators: {
      onBlur: RegistrationSchema,
      onSubmit: RegistrationSchema,
      onChange: RegistrationSchema,
    },
    onSubmit: async ({ value }) => {
      const reqData = {
        email: value.email,
        name: value.name,
        password: value.password,
        passwordConfirm: value.password,
        avatar: value.avatar,
      };
      try {
        await axios.post(
          `${SERVER_URL}/api/collections/users/records`,
          reqData
        );

        form.reset();
        toast.success("Registration successful. Please verify your email.");
        navigate({ to: "/login" });
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    },
  });
  return (
    <Card className="w-3/6">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          User Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="registration-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Full Name"
                      autoComplete="off"
                      type={"text"}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
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
                      aria-invalid={isInvalid}
                      placeholder="Enter your email"
                      autoComplete="off"
                      type={"email"}
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
                      aria-invalid={isInvalid}
                      placeholder="Enter a password"
                      autoComplete="off"
                      type={"password"}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="phoneNumber"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your phone number"
                      autoComplete="off"
                      type={"tel"}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="avatar"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Profile Picture
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={"file"}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"horizontal"}>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            form="registration-form"
            disabled={form.state.isSubmitting || !form.state.isValid}
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
