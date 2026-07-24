"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/typography";
import { cn } from "@/lib/utils";

interface Fields {
  name: string;
  email: string;
  organisation: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please tell us your name.";
  if (!fields.email.trim()) errors.email = "Please add an email address.";
  else if (!EMAIL.test(fields.email.trim()))
    errors.email = "That email address doesn’t look right.";
  if (fields.message.trim().length < 10)
    errors.message = "A sentence or two of context helps us prepare.";
  return errors;
}

const EMPTY: Fields = { name: "", email: "", organisation: "", message: "" };

/**
 * The contact form.
 *
 * Fully accessible: every field is labelled, errors are announced via
 * aria-describedby with aria-invalid, the submit button carries a loading
 * state, and success is announced politely with role="status". No form library
 * — the validation is small enough to own, keeping the bundle lean.
 *
 * Submission is simulated (no backend yet); wiring a route handler is a later
 * step. The UX around it is production-shaped.
 */
export function ContactForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const fieldId = (name: keyof Fields) => `${uid}-${name}`;
  const errorId = (name: keyof Fields) => `${uid}-${name}-error`;

  const update = (name: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as the visitor corrects it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Move focus to the first field in error for keyboard users.
      const first = (["name", "email", "message"] as const).find(
        (key) => found[key],
      );
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");
    // Simulated round-trip until a route handler exists.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setFields(EMPTY);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl border border-success/25 bg-success/5 p-8"
      >
        <span className="grid size-11 place-items-center rounded-full bg-success/10 text-success">
          <Check aria-hidden="true" className="size-5" />
        </span>
        <p className="font-display text-h3 text-foreground">
          Thank you — your note is with us.
        </p>
        <Text measure="narrow">
          We read every message ourselves and typically respond within one
          business day.
        </Text>
        <Button
          variant="outline"
          size="lg"
          className="mt-2 h-11 px-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <Field
        id={fieldId("name")}
        label="Name"
        error={errors.name}
        errorId={errorId("name")}
      >
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId("name") : undefined}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={fieldId("email")}
          label="Email"
          error={errors.email}
          errorId={errorId("email")}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id={fieldId("organisation")} label="Organisation" optional>
          <input
            id={fieldId("organisation")}
            name="organisation"
            type="text"
            autoComplete="organization"
            value={fields.organisation}
            onChange={(e) => update("organisation", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field
        id={fieldId("message")}
        label="How can we help?"
        error={errors.message}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={cn(inputClass(Boolean(errors.message)), "resize-y")}
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="h-12 self-start px-7 text-body-sm transition-[background-color,transform,box-shadow] duration-(--dur-cta) ease-editorial hover:-translate-y-px hover:bg-(--agp-navy-hover) hover:shadow-card"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-card px-4 py-3 text-body text-foreground outline-none transition-[border-color,box-shadow] duration-(--dur-color) ease-editorial placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/15",
    hasError ? "border-destructive" : "border-border hover:border-border-strong",
  );
}

function Field({
  id,
  label,
  optional,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between text-body-sm font-medium text-foreground"
      >
        {label}
        {optional ? (
          <span className="text-body-sm font-normal text-muted-foreground">
            Optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-body-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
