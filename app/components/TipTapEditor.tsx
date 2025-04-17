'use client'

import React from 'react'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    Strikethrough
} from 'lucide-react'

export function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null

    return (
        <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-start w-full overflow-x-auto p-1'>
            {[
                {
                    icon: <Heading1 className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                    isActive: editor.isActive('heading', { level: 1 })
                },
                {
                    icon: <Heading2 className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                    isActive: editor.isActive('heading', { level: 2 })
                },
                {
                    icon: <Heading3 className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                    isActive: editor.isActive('heading', { level: 3 })
                },
                {
                    icon: <Bold className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleBold().run(),
                    isActive: editor.isActive('bold')
                },
                {
                    icon: <Italic className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleItalic().run(),
                    isActive: editor.isActive('italic')
                },
                {
                    icon: <Strikethrough className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleStrike().run(),
                    isActive: editor.isActive('strike')
                }
            ].map((item, index) => (
                <Button
                    key={index}
                    type='button'
                    size="icon"
                    variant={item.isActive ? 'default' : 'secondary'}
                    onClick={item.action}
                    className="w-8 h-8 p-1"
                >
                    {item.icon}
                </Button>
            ))}
        </div>
    )
}

export function TipTapEditor({
    setJson,
    json,
}: {
    setJson: React.Dispatch<React.SetStateAction<JSONContent | null>>;
    json: JSONContent | null;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: json ?? "<p>Hello world</p>",
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert w-full min-h-[150px]"
            }
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            setJson(json);
        }
    })

    return (
        <div className={`w-full max-w-full space-y-2`}>
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className='rounded-lg border p-2 min-h-[150px] w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200'
            />
        </div>
    )
}

export default TipTapEditor