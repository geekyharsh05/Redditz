import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../public/pfp.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";

export default function CreatePostCard() {
    return (
        <Card className="px-4 py-2 flex items-center gap-x-4">
            <Image src={pfp} alt="pfp" className="h-12 w-fit" />

            <Link href="/r/harsh/create" className="w-full">
                <Input placeholder="What's on your mind?" />
            </Link>

            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/r/harsh/create">
                        <ImageDown className="w-4 h-4" />
                    </Link>
                </Button>

                <Button variant="outline" size="icon">
                    <Link href="/r/harsh/create">
                        <Link2 className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </Card>
    );
}