import VerifyEmail from '@/components/email/Verify';
import { sendEmail } from '@/app/service/email';
import { generateVerificationToken } from '@/app/service/verification';

export const sendVerificationEmail = async (firstName: string, email: string) => {
  const subject = '[維域設計後台管理系統]驗證您的信箱帳號';

  const token = generateVerificationToken(email);

  try {
    sendEmail({
      to: [email],
      subject,
      template: VerifyEmail({
        firstName,
        token,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
