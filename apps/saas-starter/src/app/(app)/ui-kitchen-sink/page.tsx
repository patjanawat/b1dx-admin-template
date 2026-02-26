"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  AppButton,
  ConfirmDialog,
  ErrorBanner,
  Form,
  FormField,
  Input,
  Modal,
  RHFDatePicker,
  RHFDecimalInput,
  RHFNumberInput,
} from "@b1dx/ui";

export const dynamic = "force-dynamic";

type DemoFormValues = {
  name: string;
  email: string;
  quantity: number | null;
  amountTHB: string;
  amountUSD: string;
  amountDecimal: string;
  date: Date | null;
};

export default function UIKitchenSinkPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  const {
    handleSubmit,
    control,
    register,
    setError,
    reset,
    formState: { errors, submitCount, isSubmitSuccessful }
  } = useForm<DemoFormValues>({
    defaultValues: {
      name: "",
      email: "",
      quantity: null,
      amountTHB: "",
      amountUSD: "",
      amountDecimal: "",
      date: null
    }
  });

  const onSubmit = (values: DemoFormValues) => {
    let hasError = false;

    if (!values.name.trim()) {
      setError("name", { message: "Name is required" });
      hasError = true;
    }

    if (!values.email.includes("@")) {
      setError("email", { message: "Enter a valid email" });
      hasError = true;
    }

    if (values.quantity === null) {
      setError("quantity", { message: "Quantity is required" });
      hasError = true;
    }

    if (!values.amountUSD) {
      setError("amountUSD", { message: "USD amount is required" });
      hasError = true;
    }

    if (!values.date) {
      setError("date", { message: "Pick a date" });
      hasError = true;
    }

    if (!hasError) {
      setLastAction("Form submitted successfully.");
    }
  };

  const handleConfirm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLastAction("Confirmed destructive action.");
    setConfirmOpen(false);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">UI Kitchen Sink</h2>
        <p className="text-sm text-slate-600">
          Quick visual checks for form inputs, overlays, and feedback components.
        </p>
      </div>

      <div className="space-y-4">
        <ErrorBanner
          placement="stickyTop"
          variant="info"
          title="Sticky banner"
          message="This banner uses stickyTop placement."
        />
        <ErrorBanner
          placement="inline"
          variant="error"
          title="Inline banner"
          message="Inline banner with an action button."
          actions={<AppButton size="sm">Retry</AppButton>}
        />
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">RHF Form Examples</h3>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Name"
              required
              error={errors.name?.message}
              errorMode="inline"
              touched={Boolean(errors.name)}
              submitCount={submitCount}
            >
              <Input placeholder="Jane Doe" {...register("name")} />
            </FormField>

            <FormField
              label="Email"
              required
              description="Tooltip errors auto-show after submit"
              error={errors.email?.message}
              errorMode="tooltip"
              touched={Boolean(errors.email)}
              submitCount={submitCount}
            >
              <Input type="email" placeholder="jane@company.com" {...register("email")} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <RHFNumberInput
              name="quantity"
              control={control}
              label="Quantity"
              required
              min={0}
              max={99}
              errorMode="inline"
            />
            <RHFDatePicker
              name="date"
              control={control}
              label="Date"
              required
              errorMode="tooltip"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <RHFDecimalInput
              name="amountTHB"
              control={control}
              label="Amount (THB)"
              format="currency"
              currency="THB"
              allowNegative={false}
            />
            <RHFDecimalInput
              name="amountUSD"
              control={control}
              label="Amount (USD)"
              format="currency"
              currency="USD"
              allowNegative={false}
              errorMode="tooltip"
            />
            <RHFDecimalInput
              name="amountDecimal"
              control={control}
              label="Decimal Amount"
              format="decimal"
              allowNegative
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <AppButton type="submit">Submit</AppButton>
            <AppButton
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setLastAction(null);
              }}
            >
              Reset
            </AppButton>
          </div>

          {isSubmitSuccessful && lastAction ? (
            <p className="text-sm text-emerald-600">{lastAction}</p>
          ) : null}
        </Form>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Overlays</h3>
        <div className="flex flex-wrap gap-3">
          <AppButton onClick={() => setModalOpen(true)}>Open Modal</AppButton>
          <AppButton variant="destructive" onClick={() => setConfirmOpen(true)}>
            Open Confirm Dialog
          </AppButton>
        </div>

        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Modal Title"
          description="Simple modal for visual check."
          footer={
            <>
              <AppButton variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </AppButton>
              <AppButton onClick={() => setModalOpen(false)}>Save</AppButton>
            </>
          }
        >
          <p className="text-sm text-slate-600">
            This modal uses the shared Dialog wrapper and renders a footer slot.
          </p>
        </Modal>

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete record"
          description="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          typeToConfirm="DELETE"
          onConfirm={handleConfirm}
        />
      </section>
    </div>
  );
}
