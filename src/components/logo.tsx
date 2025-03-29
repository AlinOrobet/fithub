import Link from "next/link";
import Image from "next/image";

import {cn} from "@/lib/utils";

interface LogoProps {
  href: string;
  className?: string;
}

export const Logo = ({href, className}: LogoProps) => {
  return (
    <Link href={href} className={cn("relative", className)}>
      <Image src="/logo.svg" alt="logo" fill />
    </Link>
  );
};
