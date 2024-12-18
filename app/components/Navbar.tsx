import Link from "next/link";
import Image from "next/image";
import { LogInIcon, UserPlusIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserDropdown from "./UserDropdown";

async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
            <Link href={"/"} className="flex items-center gap-x-3">
                <Image
                    src="/reddit-full.svg"
                    alt="Reddit Mobile Logo"
                    width={40}
                    height={40}
                    className="h-10 w-fit"
                />
                <Image
                    src="/redditz.svg"
                    alt="Reddit Text"
                    width={100}
                    height={30}
                    className="h-9 hidden w-fit lg:block"
                />
            </Link>
            
            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                {user ? (
                    <UserDropdown
                        email={user.email}
                        username={`${user.given_name} ${user.family_name}`}
                        userImage={user.picture}
                    />
                ) : (
                    <div className="flex items-center gap-x-4">
                        <Button variant="secondary" asChild className="flex items-center gap-x-2">
                            <RegisterLink>
                                <UserPlusIcon className="h-4 w-4" />
                                <span>Sign Up</span>
                            </RegisterLink>
                        </Button>
                        <Button asChild className="flex items-center gap-x-2">
                            <LoginLink>
                                <LogInIcon className="h-4 w-4" />
                                <span>Login</span>
                            </LoginLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;