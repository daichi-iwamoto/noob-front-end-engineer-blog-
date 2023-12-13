import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, mail, body, token } = await request.json();

  const serverSecretKey = `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  const recaptchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: serverSecretKey,
    },
  );

  const { success } = await recaptchaResponse.json();

  if (!success) {
    return Response.json({ message: "reCAPTCHAが正しくありません。" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  const result = await transporter.sendMail({
    from: process.env.GOOGLE_USER,
    to: process.env.ADMIN_MAIL_ADDRESS,
    subject: `${name} 様からお問合せがありました。`,
    text: `      
お名前: ${name}
メールアドレス: ${mail}

------------------------------

お問い合わせ内容:

${body}
    `,
  });

  return Response.json(result);
}
