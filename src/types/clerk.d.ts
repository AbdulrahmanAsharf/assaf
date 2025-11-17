// types/clerk.d.ts
import "@clerk/nextjs";

declare global {
  interface Window {
    clerk: import("@clerk/nextjs").Clerk;
    signIn: import("@clerk/nextjs").SignIn;
    signUp: import("@clerk/nextjs").SignUp;
  }
}

export {};