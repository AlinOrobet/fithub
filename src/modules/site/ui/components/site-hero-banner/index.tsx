import Link from "next/link";
import Image from "next/image";

import {Button} from "@/components/ui/button";

export const SiteHeroBanner = () => {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)]">
      <Image
        src="/HeroBanner.svg"
        alt="hero-banner"
        fill
        className="object-cover object-[-90px] sm:object-left"
      />
      <div className="absolute inset-0">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-16 h-full w-full">
          <div className="w-full lg:w-2/3 max-w-lg xl:max-w-2xl h-full ml-auto flex flex-col items-start justify-center space-y-6">
            <h1>Ship 10x Faster with NS</h1>
            <p>
              Highly customizable components for building modern websites and applications that look
              and feel the way you mean it.
            </p>
            <Button variant="site" size="auto" className="p-4 sm:px-6" asChild>
              <Link href="">
                <span className="skew-x-12">Descoperă mai mult</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
