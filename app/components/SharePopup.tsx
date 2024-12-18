"use client";

import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import CopyLink from './CopyLink'

interface SharePopupProps {
    id: string
}

export function SharePopup({ id }: SharePopupProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleCopy = () => {
        setIsOpen(false)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:bg-muted hover:text-primary"
                >
                    <Share2 className="h-4 w-4" />
                    Share
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="flex flex-col">
                    <CopyLink id={id} onCopy={handleCopy} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}