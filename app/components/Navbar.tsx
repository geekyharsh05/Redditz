import Link from "next/link";
import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/reddit-full.svg";
import Image from "next/image";
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
                    src={redditMobile}
                    alt="Reddit Mobile Logo"
                    className="h-10 w-fit"
                />
                <Image
                    src={RedditText}
                    alt="Reddit Text"
                    className="h-9 hidden w-fit lg:block"
                />
            </Link>
            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                {user ? (
                    <UserDropdown email={user.email} username={`${user.given_name} ${user.family_name}`} userImage={user.picture} />
                ) : (
                    <div className="flex items-center gap-x-4">
                        <Button variant="secondary" asChild>
                            <RegisterLink>
                                Sign Up
                            </RegisterLink>
                        </Button>
                        <Button asChild>
                            <LoginLink>
                                Login
                            </LoginLink>
                        </Button>
                    </div>
                )
                }
            </div>
        </nav>
    )
}

export default Navbar