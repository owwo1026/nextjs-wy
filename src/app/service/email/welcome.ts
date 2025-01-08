import SigninWelcomeEmail from 'components/email/SigninWelcome';
import { sendEmail } from '.';

export const sendWelcomeEmail = async (firstName: string, email: string) => {
  const subject = '[維域設計後台管理系統]會員帳號已啟用';
  try {
    sendEmail({
      to: [email],
      subject,
      template: SigninWelcomeEmail({ firstName }),
    });
  } catch (error) {
    console.error(error);
  }
};
