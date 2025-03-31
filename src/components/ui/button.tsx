import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-white text-muted hover:bg-white/90 hover:text-muted/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        offset: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        auto: "h-auto w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "offset") {
      return (
        <button
          className={cn(
            "group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300",
            className
          )}
          ref={ref}
          {...props}
        >
          <div className="absolute inset-0 translate-x-2 -translate-y-2 border-2 border-muted-foreground" />
          <div
            className="absolute inset-0 bg-white transition-transform duration-300 
            group-hover:translate-x-2 group-hover:-translate-y-2"
          />

          <span
            className="relative z-10 transition-transform duration-300 
            group-hover:translate-x-2 group-hover:-translate-y-2 text-muted uppercase text-sm sm:text-lg font-semibold"
          >
            {props.children}
          </span>
        </button>
      );
    }

    return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export {Button, buttonVariants};
