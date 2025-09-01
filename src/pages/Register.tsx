import RegisterImg from "@/assets/images/Register.jpg";
import Logo from "@/assets/images/Website_logo.png";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src={RegisterImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to={"/"}>
            <img className="w-28 dark:brightness-[0.5]" src={Logo} alt="" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
