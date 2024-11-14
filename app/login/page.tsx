import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8 mx">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="New Money"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem vindo</h1>
        <p className="text-muted-foreground mb-8">
          New money seu novo jeito de gerencenciar sua grana!
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mb-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
