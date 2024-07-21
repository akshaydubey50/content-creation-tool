"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { decryptData } from "@/lib/crypto";

export default function InputOTPControlled() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const { toast } = useToast();
  const verifyCode = async () => {
    setButtonDisabled(true);
    try {
      //if params has token then call /api/verify-token
      const result = await axios.post("/api/verify", {
        code: value,
        email: email,
      });
      console.log("result", result);
      if (result.data.success) {
        toast({
          title: "Success",
          description: "Code verified successfully",
        });
        router.push("/signin");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("axiosError", axiosError.response?.data);
      toast({
        title: "Verification Code Failed",
        // description: axiosError.response?.data,
        variant: "destructive",
      });
    } finally {
      setButtonDisabled(false);
    }
  };
  
  useEffect(() => {
    // Retrieve and decrypt the email from sessionStorage
    const encryptedEmail = sessionStorage.getItem("verificationEmail");
    if (encryptedEmail) {
      const decryptedEmail = decryptData(encryptedEmail);
      setEmail(decryptedEmail);
    } else {
      // If email is not found, redirect to signup
      router.push("/signup");
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4 w-fit  mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Verify Your Account</h1>
        <p className="text-sm text-gray-300">
          Enter Verification code sent to your email
        </p>
      </div>
      <Input
        maxLength={6}
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      />

      <Button
        onClick={verifyCode}
        // variant={"outline"}
        className={`text-center font-semibold  `}
        type="submit"
        disabled={buttonDisabled || value.length < 6}
      >
        {buttonDisabled ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Verifying Code
          </>
        ) : (
          "Verify"
        )}
      </Button>
    </div>
  );
}
