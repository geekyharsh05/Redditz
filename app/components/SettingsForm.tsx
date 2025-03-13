"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "./Buttons";
import { updateUsername } from "../actions";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: "",
  status: "",
};

interface iSettingsForm {
  username: string | null | undefined;
}

export default function SettingsForm({ username }: iSettingsForm) {
  const [state, formAction] = useActionState(updateUsername, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "success") {
      toast({
        title: "Succesfull",
        description: state?.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state?.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">
        Manage your account settings and preferences.
      </p>

      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">
        Your username is your public display name. You can change it at any
        time.
      </p>

      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        min={2}
        maxLength={21}
      />

      {state?.status === "error" && (
        <p className="text-destructive mt-1">{state.message}</p>
      )}

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          Cancel
        </Link>
        <SubmitButton text="Change Username" />
      </div>
    </form>
  );
}
