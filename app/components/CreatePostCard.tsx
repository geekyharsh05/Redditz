import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../public/pfp.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";

export default function CreatePostCard() {
    return (
        <Card className="px-4 py-2 flex flex-col sm:flex-row items-center gap-x-4 sm:gap-x-6 sm:gap-y-0 gap-y-4">
            {/* Profile Image */}
            <Image src={pfp} alt="pfp" className="h-12 w-12 rounded-full sm:h-14 sm:w-14" />

            {/* Input Area */}
            <Link href="/r/harsh/create" className="w-full">
                <Input placeholder="What's on your mind?" className="w-full" />
            </Link>

            {/* Buttons Section */}
            <div className="flex items-center gap-x-4 sm:gap-x-6">
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
