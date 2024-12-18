"use client";

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React, { use, useState } from 'react'
import pfp from '../../../../public/pfp.png'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Text, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TipTapEditor } from '@/app/components/TipTapEditor'
import { SubmitButton } from '@/app/components/Buttons'
import { UploadDropzone } from '@/app/components/Uploadthing'
import { JSONContent } from "@tiptap/react";
import { createPost } from '@/app/actions'

const rules = [
    {
        id: 1,
        text: "Be respectful and considerate to others.",
    },
    {
        id: 2,
        text: "Ensure your content is relevant.",
    },
    {
        id: 3,
        text: "Provide proper attribution for shared content.",
    },
    {
        id: 4,
        text: "Avoid spamming or excessive self-promotion.",
    },
    {
        id: 5,
        text: "Follow the specific rules of the subreddit.",
    },
];

export function CreatePostRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [title, setTitle] = useState<null | string>(null);
    const resolvedParams = use(params)

    const createPostReddit = createPost.bind(null, { jsonContent: json });

    return (
        <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                <h1 className="font-semibold">
                    Subreddit:{" "}
                    <Link href={`/r/${resolvedParams.id}`} className="text-primary">
                        r/{resolvedParams.id}
                    </Link>
                </h1>
                <Tabs defaultValue="post" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post">
                            <Text className="h-4 w-4 mr-2" /> Post
                        </TabsTrigger>
                        <TabsTrigger value="image">
                            <Video className="h-4 w-4 mr-2" />
                            Image & Video
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <Card>
                            <form action={createPostReddit}>
                                <input
                                    type="hidden"
                                    name="imageUrl"
                                    value={imageUrl ?? undefined}
                                />
                                <input type="hidden" name="subName" value={resolvedParams.id} />
                                <CardHeader>
                                    <Label>Title</Label>
                                    <Input
                                        required
                                        name="title"
                                        placeholder="Title"
                                        value={title ?? ""}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <TipTapEditor setJson={setJson} json={json} />
                                </CardHeader>
                                <CardFooter>
                                    <SubmitButton text="Create Post" />
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="image">
                        <Card>
                            <CardHeader>
                                {imageUrl === null ? (
                                    <UploadDropzone
                                        className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            setImageUrl(res[0].url);
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(error.message);
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={imageUrl}
                                        alt="uploaded image"
                                        width={500}
                                        height={400}
                                        className="h-80 rounded-lg w-full object-contain"
                                    />
                                )}
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="w-[35%]">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <Image className="h-10 w-10" src={pfp} alt="pfp" />
                        <h1 className="font-medium">Posting to Redditz</h1>
                    </div>
                    <Separator className="mt-2" />

                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((item) => (
                            <div key={item.id}>
                                <p className="text-sm font-medium">
                                    {item.id}. {item.text}
                                </p>
                                <Separator className="mt-2" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default CreatePostRoute