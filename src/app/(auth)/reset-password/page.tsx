"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function VerifyPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const verifyCode = async () => {
    setError(null);
    setButtonDisabled(true);
    try {
      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords do not match",
          description: "Please ensure both passwords are the same.",
          variant: "destructive",
        });
        setError("Please ensure both passwords are the same.");
        setButtonDisabled(false);
        return;
      }

      const token = new URLSearchParams(window.location.search).get("token");
      const result = await axios.post("/api/reset-password", {
        token: token,
        newPassword: newPassword,
      });
      console.log("result", result);

      if (result.data.success) {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        router.push("/signin");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        status: boolean;
        message: string;
      }>;
      console.log("axiosError", axiosError.response?.data);
      setError(axiosError.response?.data?.message || "Something went wrong");
      toast({
        title: "Something went wrong. Try again!",
        // description: "Error occurred.",
        variant: "destructive",
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4 w-fit mx-auto">
      <Card className="w-full max-w-sm p-6 shadow-lg bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          <Button
            onClick={verifyCode}
            type="button"
            variant="outline"
            className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
            disabled={
              buttonDisabled ||
              newPassword.length < 6 ||
              confirmPassword.length < 6
            }
          >
            {buttonDisabled ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Resetting Password
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
