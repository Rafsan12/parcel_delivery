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
import { useEffect, useState } from "react";
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
  const [timer, setTimer] = useState(120);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOTP = async () => {
    const toastId = toast.loading("Sending Otp...");
    try {
      const res = await sendOtp({ email }).unwrap();
      setTimer(120);
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

  useEffect(() => {
    const timerId = setInterval(() => {
      if (email && confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      {confirmed ? (
        <Card className="w-full max-w-md p-6 sm:p-8 shadow-lg rounded-2xl bg-card border border-border">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Please enter the 6-digit code we sent to <br />
              <span className="font-medium text-primary">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full sm:w-2/3 space-y-5 mx-auto"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="gap-3">
                            {[...Array(6)].map((_, i) => (
                              <InputOTPSlot
                                key={i}
                                index={i}
                                className="w-10 h-12 rounded-md border border-input bg-transparent text-base focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormDescription className="text-sm text-muted-foreground">
                        Enter the code sent to your email.
                      </FormDescription>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleSendOTP}
                          type="button"
                          variant="link"
                          className="p-0 h-auto text-primary hover:text-primary/80"
                          disabled={timer !== 0}
                        >
                          Resend OTP
                        </Button>
                        {timer > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {timer}s
                          </span>
                        )}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-md p-6 sm:p-8 shadow-lg rounded-2xl bg-card border border-border">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We will send you an OTP at <br />
              <span className="font-medium text-primary">{email}</span>
              {name && (
                <div className="mt-1 text-sm text-muted-foreground">
                  Account holder: {name}
                </div>
              )}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Button onClick={handleSendOTP} className="w-full sm:w-[300px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
