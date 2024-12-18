"use client";

import { createCommunity } from '@/app/actions'
import { SubmitButton } from '@/app/components/Buttons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react'

const initalState = {
    message: "",
    status: "",
    redirectUrl: ""
};

function SubRedditPage() {
    const [state, formAction] = useActionState(createCommunity, initalState);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        } else if (state.status === "success") {
            toast({
                title: "Success",
                description: state.message,
            });

            if (state.redirectUrl) {
                router.push(state.redirectUrl);
            }
        }
    }, [state, toast, router]);

    return (
        <div className="max-w-[1000px] mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <form action={formAction} className="space-y-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Create Community</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Start a new community and connect with like-minded individuals.
                    </p>
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label htmlFor="name" className="text-lg font-medium block">
                        Community Name
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Community names including capitalization cannot be changed!
                    </p>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg font-semibold text-muted-foreground">
                            r/
                        </span>
                        <Input
                            id="name"
                            name="name"
                            required
                            className="pl-8 pr-3 py-2 w-full"
                            minLength={2}
                            maxLength={21}
                            placeholder="YourCommunityName"
                        />
                    </div>
                    {state?.status === "error" && (
                        <p className="text-sm text-destructive mt-1">{state.message}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <Link href='/' className={buttonVariants({ variant: "secondary" })}>
                        Cancel
                    </Link>
                    <SubmitButton text="Create Community" />
                </div>
            </form>
        </div>
    )
}

export default SubRedditPage