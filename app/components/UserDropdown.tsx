import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { FileText, LogOut, MenuIcon, PlusCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface iProps {
    email: string | null
    username: string | null
    userImage: string | null
}

function UserDropdown({ email, username, userImage }: iProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3'>
                    <MenuIcon className='h-6 w-6 lg:w-5 lg:h-5' />
                    <Image
                        src={userImage ?? "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"}
                        alt='avatar user'
                        height={40}
                        width={40}
                        className='rounded-full h-8 w-8 hidden lg:block'
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/r/create" className="flex items-center cursor-pointer">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Create Community</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/r/harsh/create" className="flex items-center cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Create Post</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <div className="flex items-center text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <LogoutLink className="w-full">Logout</LogoutLink>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default UserDropdown