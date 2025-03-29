import Link from "next/link";
import {Ghost} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-6 py-5">
        <CardHeader className="flex justify-center items-center">
          <div className="flex items-center justify-center size-20 rounded-full border bg-muted/30">
            <Ghost className="size-12 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="text-center">Ești în locul greșit?</CardTitle>
          <CardDescription className="text-center">
            Ups! Se pare că pagina aceasta nu mai există. Încearcă să te întorci la pagina
            principală și să cauți din nou.
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

export default NotFound;
