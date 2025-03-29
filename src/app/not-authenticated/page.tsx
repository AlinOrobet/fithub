import Link from "next/link";
import {ShieldAlert} from "lucide-react";

import {AuthSwitcher} from "@/modules/auth/ui/components/auth-switcher";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotAuthenticated = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-6 py-5">
        <CardHeader className="flex justify-center items-center">
          <div className="flex items-center justify-center size-20 rounded-full border bg-muted/30">
            <ShieldAlert className="size-12 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="text-center">Trebuie să te autentifici!</CardTitle>
          <CardDescription className="text-center">
            Pentru a accesa această pagină, te rugăm să te autentifici. Ești la doar un pas de a
            continua!
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row items-center gap-x-2">
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/">Inapoi la prima pagină</Link>
          </Button>
          <Button asChild className="w-full">
            <AuthSwitcher navigateTo="sign-in">Intră în contul tău</AuthSwitcher>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotAuthenticated;
