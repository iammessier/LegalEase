import LoginPage from '@/components/component/login-page';
import ForgotPassword from '@/components/component/forgot-password';
import {UserPage} from '@/components/component/user-page';
import LegaleaseLanding from '@/components/component/legalease-landing';
import ClientSignup from '@/components/component/client-signup';
import { LawStudentSignup } from '@/components/component/law-student-signup';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0a0e27] justify-between p-24">
      <LegaleaseLanding />
      <LoginPage />
      <ClientSignup />
      <LawStudentSignup />
      <ForgotPassword />
      <UserPage />
    </main>
  );
}
