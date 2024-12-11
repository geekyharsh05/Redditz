// 'use client'

// import React from 'react'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { type Editor } from '@tiptap/react'
// import { Button } from '@/components/ui/button'
// import { 
//   Bold, 
//   Italic, 
//   Heading1, 
//   Heading2, 
//   Heading3, 
//   Strikethrough 
// } from 'lucide-react'

// export function MenuBar({ editor }: { editor: Editor | null }) {
//   if (!editor) return null

//   return (
//     <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-start w-full overflow-x-auto p-1'>
//       {[
//         { 
//           icon: <Heading1 className="w-4 h-4" />, 
//           action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), 
//           isActive: editor.isActive('heading', { level: 1 }) 
//         },
//         { 
//           icon: <Heading2 className="w-4 h-4" />, 
//           action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 
//           isActive: editor.isActive('heading', { level: 2 }) 
//         },
//         { 
//           icon: <Heading3 className="w-4 h-4" />, 
//           action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 
//           isActive: editor.isActive('heading', { level: 3 }) 
//         },
//         { 
//           icon: <Bold className="w-4 h-4" />, 
//           action: () => editor.chain().focus().toggleBold().run(), 
//           isActive: editor.isActive('bold') 
//         },
//         { 
//           icon: <Italic className="w-4 h-4" />, 
//           action: () => editor.chain().focus().toggleItalic().run(), 
//           isActive: editor.isActive('italic') 
//         },
//         { 
//           icon: <Strikethrough className="w-4 h-4" />, 
//           action: () => editor.chain().focus().toggleStrike().run(), 
//           isActive: editor.isActive('strike') 
//         }
//       ].map((item, index) => (
//         <Button
//           key={index}
//           type='button'
//           size="icon"
//           variant={item.isActive ? 'default' : 'secondary'}
//           onClick={item.action}
//           className="w-8 h-8 p-1"
//         >
//           {item.icon}
//         </Button>
//       ))}
//     </div>
//   )
// }

// export function TipTapEditor({ 
//   initialContent = "<p>Hello World</p>", 
//   className = '',
//   placeholder = "Start typing...",
//   onContentChange
// }: { 
//   initialContent?: string, 
//   className?: string,
//   placeholder?: string,
//   onContentChange?: (content: string) => void
// }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//     ],
//     content: initialContent,
//     editorProps: {
//       attributes: {
//         class: "prose dark:prose-invert w-full min-h-[150px]"
//       }
//     },
//     onUpdate: ({ editor }) => {
//       if (onContentChange) {
//         onContentChange(editor.getHTML())
//       }
//     }
//   })

//   return (
//     <div className={`w-full max-w-full space-y-2 ${className}`}>
//       <MenuBar editor={editor} />
//       <EditorContent
//         editor={editor}
//         placeholder={placeholder}
//         className='rounded-lg border p-2 min-h-[150px] w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200'
//       />
//     </div>
//   )
// }

// export default TipTapEditor

"use client";

import React, { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown'
import { type Editor } from '@tiptap/react'
import {
    Button
} from '@/components/ui/button'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Heading1,
    Heading2,
    Heading3,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    Highlighter,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo
} from 'lucide-react'

// Utility function to set a link
const setLink = (editor: Editor) => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter the URL', previousUrl)

    // Cancelled
    if (url === null) {
        return
    }

    // Empty
    if (url === '') {
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()
        return
    }

    // Set link
    editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
}

export function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null

    return (
        <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-start w-full overflow-x-auto p-1 bg-secondary/10 rounded-t-lg'>
            {[
                // History
                {
                    icon: <Undo className="w-4 h-4" />,
                    action: () => editor.chain().focus().undo().run(),
                    title: 'Undo'
                },
                {
                    icon: <Redo className="w-4 h-4" />,
                    action: () => editor.chain().focus().redo().run(),
                    title: 'Redo'
                },
                // Headings
                {
                    icon: <Heading1 className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                    isActive: editor.isActive('heading', { level: 1 }),
                    title: 'Heading 1'
                },
                {
                    icon: <Heading2 className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                    isActive: editor.isActive('heading', { level: 2 }),
                    title: 'Heading 2'
                },
                {
                    icon: <Heading3 className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                    isActive: editor.isActive('heading', { level: 3 }),
                    title: 'Heading 3'
                },
                // Text Formatting
                {
                    icon: <Bold className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleBold().run(),
                    isActive: editor.isActive('bold'),
                    title: 'Bold'
                },
                {
                    icon: <Italic className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleItalic().run(),
                    isActive: editor.isActive('italic'),
                    title: 'Italic'
                },
                {
                    icon: <UnderlineIcon className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleUnderline().run(),
                    isActive: editor.isActive('underline'),
                    title: 'Underline'
                },
                {
                    icon: <Strikethrough className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleStrike().run(),
                    isActive: editor.isActive('strike'),
                    title: 'Strikethrough'
                },
                {
                    icon: <Highlighter className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleHighlight().run(),
                    isActive: editor.isActive('highlight'),
                    title: 'Highlight'
                },
                {
                    icon: <Code className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleCode().run(),
                    isActive: editor.isActive('code'),
                    title: 'Inline Code'
                },
                // Link
                {
                    icon: <LinkIcon className="w-4 h-4" />,
                    action: () => setLink(editor),
                    title: 'Add Link'
                },
                // Lists
                {
                    icon: <List className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleBulletList().run(),
                    isActive: editor.isActive('bulletList'),
                    title: 'Bullet List'
                },
                {
                    icon: <ListOrdered className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleOrderedList().run(),
                    isActive: editor.isActive('orderedList'),
                    title: 'Ordered List'
                },
                // Text Alignment
                {
                    icon: <AlignLeft className="w-4 h-4" />,
                    action: () => editor.chain().focus().setTextAlign('left').run(),
                    isActive: editor.isActive({ textAlign: 'left' }),
                    title: 'Align Left'
                },
                {
                    icon: <AlignCenter className="w-4 h-4" />,
                    action: () => editor.chain().focus().setTextAlign('center').run(),
                    isActive: editor.isActive({ textAlign: 'center' }),
                    title: 'Align Center'
                },
                {
                    icon: <AlignRight className="w-4 h-4" />,
                    action: () => editor.chain().focus().setTextAlign('right').run(),
                    isActive: editor.isActive({ textAlign: 'right' }),
                    title: 'Align Right'
                },
                {
                    icon: <AlignJustify className="w-4 h-4" />,
                    action: () => editor.chain().focus().setTextAlign('justify').run(),
                    isActive: editor.isActive({ textAlign: 'justify' }),
                    title: 'Justify'
                },
                {
                    icon: <Quote className="w-4 h-4" />,
                    action: () => editor.chain().focus().toggleBlockquote().run(),
                    isActive: editor.isActive('blockquote'),
                    title: 'Blockquote'
                },
            ].map((item, index) => (
                <Button
                    key={index}
                    type='button'
                    size="icon"
                    variant={item.isActive ? 'default' : 'secondary'}
                    onClick={item.action}
                    className="w-8 h-8 p-1"
                    title={item.title}
                >
                    {item.icon}
                </Button>
            ))}
        </div>
    )
}

export function TipTapEditor({
    initialContent = "<p>Hello World</p>",
    className = '',
    placeholder = "Start typing...",
    onContentChange,
    mode = 'html' // 'html' or 'markdown'
}: {
    initialContent?: string,
    className?: string,
    placeholder?: string,
    onContentChange?: (content: string) => void,
    mode?: 'html' | 'markdown'
}) {
    const [content, setContent] = useState(initialContent)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            Markdown.configure({
                html: true,
                transformCopiedText: true,
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert w-full min-h-[200px] p-2 focus:outline-none",
                placeholder: placeholder
            }
        },

        immediatelyRender: false,
        
        onUpdate: ({ editor }) => {
            const newContent = mode === 'markdown'
                ? editor.storage.markdown.getMarkdown()
                : editor.getHTML()

            setContent(newContent)

            if (onContentChange) {
                onContentChange(newContent)
            }
        }
    })

    return (
        <div className={`w-full max-w-full space-y-2 ${className}`}>
            <MenuBar editor={editor} />
            <div className="relative">
                <EditorContent
                    editor={editor}
                    className='rounded-b-lg border min-h-[200px] w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200'
                />
            </div>
        </div>
    )
}

export default TipTapEditor