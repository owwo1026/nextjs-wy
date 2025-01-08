/* eslint-disable @next/next/no-img-element */
interface SigninWelcomeEmailProps {
  firstName: string;
}

export const SigninWelcomeEmail = (props: SigninWelcomeEmailProps) => {
  const { firstName } = props;
  return (
    <html>
      <body style={main}>
        <div style={container}>
          <img
            src={`https://nextauth.dannyisadog.com/logo.png`}
            width="50"
            height="50"
            alt="nextjs-authjs-template"
            style={logo}
          />
          <p style={paragraph}>親愛的 {firstName} 您好:</p>
          <p style={paragraph}>
            您已成功註冊 {process.env.WEBSITE_NAME} 帳號!
            <br />
          </p>
          <br />
          <br />
          <p style={paragraph}>如無在此註冊會員，請忽略並刪除此封郵件，謝謝。</p>
          <p style={paragraph}>
            Best,
            <br />
            {process.env.WEBSITE_NAME}
          </p>
        </div>
      </body>
    </html>
  );
};

SigninWelcomeEmail.PreviewProps = {
  firstName: '',
} as SigninWelcomeEmailProps;

export default SigninWelcomeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  maxWidth: '37.5em',
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#0773f7',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};
