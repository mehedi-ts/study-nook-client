import LoginClient from "@/components/clientComponents/LoginClient";
import { Suspense } from "react";
export const metadata = {
  title: "StudyNook – Login",
  description: "Login to your Study Nook account to continue.",
};
export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
