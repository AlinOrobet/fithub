"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
// import {useLocalStorage} from "react-use";

import {cn} from "@/lib/utils";
import {navigationRoutes} from "@/modules/site/data";

export const Routes = () => {
  const pathname = usePathname();
  // const {data: categories, isLoading} = useGetCategories(true, "true");

  // const isMobile = useIsMobile();

  // const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
  //   "t-navigation-state-aodes",
  //   {}
  // );

  // const defaultAccordionValue: string[] = Object.keys(expanded ?? {}).reduce(
  //   (acc: string[], key: string) => {
  //     if (expanded?.[key]) {
  //       acc.push(key);
  //     }
  //     return acc;
  //   },
  //   []
  // );

  // const onExpand = (id: string) => {
  //   setExpanded((curr) => ({...curr, [id]: !curr?.[id]}));
  // };

  return (
    <div className="flex flex-col items-start lg:flex-row lg:items-center gap-2 lg:gap-4">
      {navigationRoutes.map((route, index) => (
        <Link
          href={route.href}
          key={index}
          className={cn(
            "text-white/80 hover:text-white duration-300 transition-all",
            pathname.includes(route.href) && "text-white"
          )}
        >
          <h2>{route.label}</h2>
        </Link>
      ))}
    </div>
  );

  // if (isMobile) {
  //   return (
  //     <Accordion type="multiple" defaultValue={defaultAccordionValue} className="pt-2">
  //       <ul className={cn("flex flex-col items-start gap-2")}>
  //         <AccordionItem value="locatii" className="w-full">
  //           <AccordionTrigger className="w-full" hideIcon>
  //             <Link
  //               href={`/locatii`}
  //               className="text-white/80 text-3xl sm:text-xl xl:text-3xl font-bold hover:text-white"
  //             >
  //               LOCAȚII
  //             </Link>
  //           </AccordionTrigger>
  //         </AccordionItem>
  //         {categories.data.map((route, index) => (
  //           <AccordionItem key={index} value={route.name} className="w-full">
  //             <AccordionTrigger onClick={() => onExpand(route.name)} className="w-full">
  //               <Link
  //                 href={`/categorii/${route.name.toLowerCase().replaceAll(" ", "-")}`}
  //                 className="text-white/80 text-3xl sm:text-xl xl:text-3xl font-bold hover:text-white"
  //               >
  //                 {route.name.toUpperCase()}
  //               </Link>
  //             </AccordionTrigger>
  //             <AccordionContent className="pt-2 pb-0">
  //               <Content
  //                 startUrl={`/categorii/${route.name.toLowerCase().replaceAll(" ", "-")}`}
  //                 productNames={route?.productNames}
  //                 className="flex flex-col items-start"
  //               />
  //             </AccordionContent>
  //           </AccordionItem>
  //         ))}
  //       </ul>
  //     </Accordion>
  //   );
  // }

  // return (
  //   <NavigationMenu>
  //     <NavigationMenuList className="flex flex-col items-start lg:flex-row lg:items-center">
  //       <NavigationMenuItem>
  //         <NavigationMenuTrigger
  //           className={cn(
  //             "text-white/80 hover:text-white duration-300 transition-all uppercase -skew-x-12 hover:bg-background/30 hover:lg:bg-muted/40 lg:h-20 flex justify-center items-center py-2 lg:py-0 px-4",
  //             pathname.includes(`/locatii`) && "text-white"
  //           )}
  //           hideIcon
  //         >
  //           <Link href={`/locatii`} className="skew-x-12 text-3xl font-bold">
  //             LOCAȚII
  //           </Link>
  //         </NavigationMenuTrigger>
  //       </NavigationMenuItem>
  //       {categories.data.map((route, index) => (
  //         <NavigationMenuItem key={index}>
  //           <NavigationMenuTrigger
  //             className={cn(
  //               "text-white/80 hover:text-white duration-300 transition-all uppercase -skew-x-12 hover:bg-background/30 hover:lg:bg-muted/40 lg:h-20 flex justify-center items-center py-2 lg:py-0 px-2",
  //               pathname.includes(`/categorii/${route.name.toLowerCase().replaceAll(" ", "-")}`) &&
  //                 "text-white"
  //             )}
  //             hideIcon={!route.productNames?.length}
  //           >
  //             <Link
  //               href={`/categorii/${route.name.toLowerCase().replaceAll(" ", "-")}`}
  //               className="skew-x-12 text-3xl font-bold"
  //             >
  //               {route.name.toUpperCase()}
  //             </Link>
  //           </NavigationMenuTrigger>
  //           <NavigationMenuContent className="min-w-[550px]">
  //             <Content
  //               startUrl={`/categorii/${route.name.toLowerCase().replaceAll(" ", "-")}`}
  //               productNames={route?.productNames}
  //             />
  //           </NavigationMenuContent>
  //         </NavigationMenuItem>
  //       ))}
  //     </NavigationMenuList>
  //   </NavigationMenu>
  // );
};

// interface ContentProps {
//   startUrl: string;
//   productNames: string[];
//   className?: string;
// }

// const Content = ({startUrl, productNames, className}: ContentProps) => {
//   const formattedData = productNames
//     ?.map((item) => {
//       const [name, value] = item.split("@@");
//       return {name, value};
//     })
//     .sort((a, b) => a.name.length - b.name.length);

//   return (
//     <ul
//       className={
//         className
//           ? className
//           : cn("grid", formattedData.length <= 1 ? "grid-cols-1" : "grid-cols-2")
//       }
//     >
//       {formattedData.map((data, index) => (
//         <Link
//           href={`${startUrl}/${data.value}`}
//           key={index}
//           className="uppercase text-left flex items-center text-white/80 hover:text-white hover:bg-muted/50 p-3 rounded-md w-full"
//         >
//           {data.name}
//         </Link>
//       ))}
//     </ul>
//   );
// };
