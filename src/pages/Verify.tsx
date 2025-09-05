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
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";
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
  const { email, name } = location.state || { email: "", name: "" };
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOTPMutation();
  const [verifyOtp] = useVerifyOTPMutation();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirmed = async () => {
    const toastId = toast.loading("Sending Otp...");
    try {
      const res = await sendOtp({ email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent", { id: toastId });
        setConfirmed(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP", { id: toastId });
      console.log(error);
    }
  };

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    const userInfo = {
      email,
      otp: data.pin,
    };
    const toastId = toast.loading("Verifying OTP...");
    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP verified", { id: toastId });
        setConfirmed(true);
      }
    } catch (error) {
      toast.error("Failed to  OTP verified", { id: toastId });
      console.log(error);
    }
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
              Please enter your 6-digit code we sent to <br />
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
                        Please enter the one-time password sent to your email.
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
              {name && (
                <div className="text-sm text-gray-500 mt-1">
                  Account holder: {name}
                </div>
              )}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center sm:justify-end">
            <Button
              onClick={handleConfirmed}
              className="w-[300px] bg-red-600 hover:bg-red-400"
            >
              Confirmed
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
