import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

interface AuthSocialsProps {
  disabled: boolean;
}

export const AuthSocials = ({disabled}: AuthSocialsProps) => {
  return (
    <div>
      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">Sau continuă cu</span>
        <hr className="border-dashed" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" disabled={disabled}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <linearGradient
              id="a"
              x1="-277.375"
              x2="-277.375"
              y1="406.6018"
              y2="407.5726"
              gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#0062e0" />
              <stop offset="1" stopColor="#19afff" />
            </linearGradient>
            <path
              fill="url(#a)"
              d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z"
            />
            <path
              fill="#fff"
              d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"
            />
          </svg>

          <span>Facebook</span>
        </Button>
        <Button type="button" variant="outline" disabled={disabled}>
          <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
            <path
              fill="#4285f4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34a853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#fbbc05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
            ></path>
            <path
              fill="#eb4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <span>Google</span>
        </Button>
      </div>
    </div>
  );
};

export const AuthSocialsSkeleton = () => {
  return (
    <div>
      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">Sau continuă cu</span>
        <hr className="border-dashed" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline">
          <Loader2 className="animate-spin text-muted-foreground" />
        </Button>
        <Button type="button" variant="outline">
          <Loader2 className="animate-spin text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
