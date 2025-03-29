import Link from "next/link";
import {ShieldBan} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotAuthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-6 py-5">
        <CardHeader className="flex justify-center items-center">
          <div className="flex items-center justify-center size-20 rounded-full border bg-muted/30">
            <ShieldBan className="size-12 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="text-center">Ai ajuns într-un loc restricționat!</CardTitle>
          <CardDescription className="text-center">
            Din păcate, nu ai acces la această pagină. Dacă ai nevoie de ajutor, suntem aici pentru
            tine!
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/">Înapoi la prima pagină</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotAuthorized;
