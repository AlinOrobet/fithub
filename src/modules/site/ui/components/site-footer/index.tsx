import Link from "next/link";
import Image from "next/image";

import {FaFacebook, FaYoutube, FaTiktok, FaInstagram} from "react-icons/fa";

import {cn} from "@/lib/utils";

export const SiteFooter = () => {
  // TODO:Fetch documents
  return (
    <footer className="flex flex-col items-center">
      <div className="w-full bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-xl mx-auto w-full p-4 md:p-6 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <h2 className="text-center md:text-left font-bold mb-4 text-2xl">{data.name}</h2>
            <div className="space-y-2 md:col-span-2 md:max-w-lg">
              <p className="text-muted-foreground text-xs xs:text-sm sm:text-normal leading-5 text-center md:text-left">
                Sediu social: <span className="font-bold">{data.address}</span>
              </p>
              <p className="text-muted-foreground text-xs xs:text-sm sm:text-normal leading-5 text-center md:text-left">
                Certificat de înregistrare la Registrul Comerțului cu Seria{" "}
                <span className="font-bold">{data.series}</span> și nr.{" "}
                <span className="font-bold">{data.number}</span>
              </p>
              <p className="text-muted-foreground text-xs xs:text-sm sm:text-normal leading-5 text-center md:text-left">
                <span className="font-bold">Număr de ordine Registrul Comerțului:</span>{" "}
                {data.orderNumber} · CUI: <span className="font-bold">{data.id}</span> ·{" "}
                <span className="font-bold">Cod CAEN activitate principală:</span>{" "}
                {data.mainActiviy}
              </p>
              <div className="flex flex-row items-center justify-center py-4 gap-4 md:justify-normal">
                <Link href="" target="_blank">
                  <FaFacebook className="size-6" />
                </Link>
                <Link href="" target="_blank">
                  <FaInstagram className="size-6" />
                </Link>
                <Link href="" target="_blank">
                  <FaYoutube className="size-6" />
                </Link>
                <Link href="" target="_blank">
                  <FaTiktok className="size-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:flex-col flex-wrap items-center md:items-start justify-center gap-x-2 max-w-xs mx-auto">
            {[
              {name: "Termeni și condiții", href: ""},
              {name: "Politica de cookies", href: ""},
              {name: "Politica de confidențialitate", href: ""},
              {name: "ANPC", href: "https://anpc.ro"},
              {name: "SOL", href: "https://ec.europa.eu/consumers/odr"},
            ].map((item, index) => (
              <Link key={index} href={item.href} target="_blank">
                <p className="hover:underline text-sm">
                  <span className={cn("md:hidden", index === 0 && "hidden")}>&#183; </span>
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 bg-muted/30 py-4">
        <Link href="https://anpc.ro">
          <Image src="/litigilor.svg" width={255} height={55} alt="anpc" className="h-[55px]" />
        </Link>
        <Link href="https://ec.europa.eu/consumers/odr">
          <Image
            src="/online-badge-mobile.svg"
            width={255}
            height={55}
            alt="sol"
            className="sm:h-[55px]"
          />
        </Link>
      </div>
    </footer>
  );
};

const data = {
  name: "SC SLS TRENDCONCEPT SRL",
  address: "Localitatea ULMA, nr 59, Județul SUCEAVA",
  series: "B",
  number: "4138501",
  orderNumber: "J33/1611/26.11.2020",
  id: "43387130",
  mainActiviy: "9313",
};
