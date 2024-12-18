"use client"

import { Textarea } from "@/components/ui/textarea"
import { SaveButton } from "./Buttons"
import { useActionState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { updateSubRedditDescription } from "../actions"

interface iProps {
    subName: string
    description: string | null | undefined
}

const initialState = {
    message: "",
    status: "",
};

function SubDescriptionForm({ description, subName }: iProps) {
    const [state, formAction] = useActionState(updateSubRedditDescription, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state?.status === "success") {
            toast({
                title: "Succesfull",
                description: state.message,
            });
        } else if (state?.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [toast, state]);

    return (
        <form className="mt-3 flex flex-col gap-y-2" action={formAction}>
            <input type="hidden" name="subName" value={subName} />
            <Textarea
                placeholder="Add a description for your subreddit"
                maxLength={100}
                name="description"
                defaultValue={description ?? undefined}
            />
            <SaveButton />
        </form>
    )
}

export default SubDescriptionForm