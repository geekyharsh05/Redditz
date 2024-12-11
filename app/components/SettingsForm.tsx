"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { SubmitButton } from "./Buttons";


export default function SettingsForm({
    username,
}: {
    username: string | null | undefined
}) {
    return (
        <form >
            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>

            <Separator className="my-4" />
            <Label className="text-lg">Username</Label>
            <p className="text-muted-foreground">
                Your username is your public display name. You can change it at any time.
            </p>

            <Input
                defaultValue={username ?? undefined}
                name="username"
                required
                className="mt-2"
                min={2}
                maxLength={21}
            />


            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <SubmitButton text="Change Username" />
            </div>
        </form>
    )
}   