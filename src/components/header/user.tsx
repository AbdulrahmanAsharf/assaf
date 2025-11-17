/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocale, useTranslations } from "next-intl";
import {
  createEmailSchema,
  createDetailsSchema,
  type EmailSchema,
  type DetailsSchema,
} from "@/validations/auth";
import { Spinner } from "../ui/spinner";
import { checkEmailExists } from "@/actions/check-email-exists";
import OtpStep from "../auth/OtpStep";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { useToast } from "@/utils/toast";

// Export the type for external use
export interface UserSRef {
  openDialog: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserSProps {}

export const UserS = forwardRef<UserSRef, UserSProps>((props, ref) => {
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const { setActive } = useClerk();

  const [step, setStep] = useState<"email" | "otp" | "details">("email");
  const [email, setEmail] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const locale = useLocale();
  const t = useTranslations("validations");
  const tLogin = useTranslations("login");
  const dir = locale === "ar" ? "rtl" : "ltr";
  const defaultCountry = locale === "ar" ? "eg" : "us";
  const toast = useToast();

  const triggerRef = useRef<HTMLButtonElement>(null);

  // Expose method to open dialog from parent component
  useImperativeHandle(ref, () => ({
    openDialog: () => {
      triggerRef.current?.click();
    }
  }));

  const emailForm = useForm<EmailSchema>({
    resolver: zodResolver(createEmailSchema(t)),
    defaultValues: { email: "" },
  });

  const detailsForm = useForm<DetailsSchema>({
    resolver: zodResolver(createDetailsSchema(t)),
    defaultValues: { firstName: "", lastName: "", phone: "" },
  });

  async function handleEmail(values: EmailSchema) {
    if (!signInLoaded || !signUpLoaded || !signIn || !signUp) {
      toast.error("clerkNotReady");
      return;
    }

    setIsEmailLoading(true);

    try {
      const { exists } = await checkEmailExists(values.email);

      if (exists) {
        await signIn.create({ identifier: values.email });

        const factor = signIn.supportedFirstFactors?.find(
          (f: any) => f.strategy === "email_code"
        ) as { emailAddressId: string };

        if (!factor?.emailAddressId) throw new Error("Email factor not found");

        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: factor.emailAddressId,
        });

        toast.success("otp");
        setEmail(values.email);
        setStep("otp");
      } else {
        await signUp.create({ emailAddress: values.email });
        toast.success("newUser");
        setEmail(values.email);
        setStep("details");
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "identifier_not_found") {
        try {
          await signUp.create({ emailAddress: values.email });
          toast.success("newUser");
          setEmail(values.email);
          setStep("details");
        } catch (signUpErr: any) {
          toast.error(signUpErr.message || "signupError");
        }
      } else {
        toast.error(err.message || "signupError");
      }
    } finally {
      setIsEmailLoading(false);
    }
  }

  async function handleSaveDetails(values: DetailsSchema) {
    if (!signUp) return;

    setIsDetailsLoading(true);
    try {
      const updateResult = await signUp.update({
        firstName: values.firstName,
        lastName: values.lastName,
        unsafeMetadata: { phone: values.phone },
      });

      if (updateResult.status === "complete" && signUp.createdSessionId) {
        await setActive({ session: signUp.createdSessionId });
        toast.success("detailssuccess");
        triggerRef.current?.click();
      } else {
        const result = await signUp.attemptEmailAddressVerification({ code: "000000" });
        if (result.status === "complete" && signUp.createdSessionId) {
          await setActive({ session: signUp.createdSessionId });
          toast.success("detailssuccess");
          triggerRef.current?.click();
        } else {
          throw new Error("فشل إنشاء الحساب");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "detailsError");
    } finally {
      setIsDetailsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button ref={triggerRef}>
          <User className="cursor-pointer" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[380px] rounded-sm" dir={dir}>
        <DialogHeader className="items-center gap-6 mb-5">
          <DialogDescription className="rounded-full border-gray-200 border p-6">
            <User />
          </DialogDescription>
          <DialogTitle className="text-gray-700 !font-bold">
            {tLogin("title")}
          </DialogTitle>
        </DialogHeader>

        {step === "email" && (
          <>
            <div id="clerk-captcha"></div>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmail)} className="space-y-8">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-3 text-gray-500">
                        {tLogin("emailLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="your@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage>
                        {emailForm.formState.errors.email?.message
                          ? t("invalidEmail")
                          : null}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-sm py-5 text-gray-300 font-bold cursor-pointer"
                  disabled={isEmailLoading}
                >
                  {isEmailLoading ? <Spinner /> : tLogin("button")}
                </Button>
              </form>
            </Form>
          </>
        )}

        {step === "otp" && (
          <OtpStep
            email={email}
            onBack={() => setStep("email")}
            onSuccess={() => {
              triggerRef.current?.click();
            }}
          />
        )}

        {step === "details" && (
          <Form {...detailsForm}>
            <form
              onSubmit={detailsForm.handleSubmit(handleSaveDetails)}
              className="space-y-4"
            >
              <FormField
                control={detailsForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tLogin("firstName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={tLogin("firstNamePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tLogin("lastName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={tLogin("lastNamePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={detailsForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-[200px]">
                    <FormLabel>{tLogin("phone")}</FormLabel>
                    <FormControl>
                      <div className={locale === "ar" ? "phone-input-rtl" : ""}>
                        <PhoneInput
                          country={defaultCountry}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={() => detailsForm.trigger("phone")}
                          inputClass="!w-full !h-11"
                          containerClass={locale === "ar" ? "rtl-phone-container" : ""}
                          buttonClass={locale === "ar" ? "rtl-phone-button" : ""}
                          dropdownClass={locale === "ar" ? "rtl-phone-dropdown" : ""}
                          enableSearch
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isDetailsLoading}
              >
                {isDetailsLoading ? <Spinner /> : tLogin("submitButton")}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
});

UserS.displayName = 'UserS';