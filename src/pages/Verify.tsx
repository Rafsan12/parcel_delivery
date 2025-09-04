import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOTPMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";
import z from "zod";

const verifySchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  // console.log(location.state);
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOTPMutation();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      pin: "",
    },
  });

  // const navigate = useNavigate();

  //! Needed
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email]);

  const handleConfirmed = async () => {
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent");
      }

      setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data: z.infer<typeof verifySchema>) => {
    console.log(data);
  };
  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="max-w-md w-full p-6 sm:p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Verify Your Email Address
            </CardTitle>
            <CardDescription>
              Please enter your 6-digit code we sent to your <br />
              <span className="font-medium text-indigo-600">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full sm:w-2/3 space-y-4 mx-auto"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="gap-2">
                            {[...Array(6)].map((_, i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center sm:justify-end">
            <Button
              form="otp-form"
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-md w-full p-6 sm:p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Verify Your Email Address
            </CardTitle>
            <CardDescription>
              We will send you an OTP at <br />
              <span className="font-medium text-indigo-600">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center sm:justify-end">
            <Button
              onClick={handleConfirmed}
              className=" w-[300px] bg-red-600 hover:bg-red-400"
            >
              Confirmed
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
