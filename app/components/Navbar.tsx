import Link from "next/link";
import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/reddit-full.svg";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

function Navbar() {
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
                <Button variant="secondary">Sign Up</Button>
                <Button>Login</Button>
            </div>
        </nav>
    )
}

export default Navbar