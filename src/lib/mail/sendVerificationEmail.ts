import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
});

const sendVerificationEmail = async ({ user, token }: { user: { email: string }, token: string }) => {
    // Sicherstellen, dass die URL keine doppelten Slashes bekommt
    const baseUrl = process.env.BETTER_AUTH_BASE_URL?.replace(/\/$/, "");
    const verificationUrl = `${baseUrl}/auth?view=verification&token=${token}`;

    const colors = {
        primary: "#7AA2F7",
        background: "#121212",
        surface: "#212121",
        textPrimary: "#E5E7EB",
        textSecondary: "#9CA3AF",
    };

    const htmlLayout = `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style>
          /* Korrigierter Google Font Import */
          @import url('https://fonts.googleapis.com');

          :root { color-scheme: light dark; supported-color-schemes: light dark; }
          
          body { font-family: 'Roboto', Arial, sans-serif !important; margin: 0; padding: 40px 0; background-color: #F3F4F6; color: #111827; }
          .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #E5E7EB; }
          
          @media (prefers-color-scheme: dark) {
            body { background-color: ${colors.surface} !important; color: ${colors.textPrimary} !important; }
            .card { background-color: ${colors.background} !important; border-color: #374151 !important; }
            .text-muted { color: ${colors.textSecondary} !important; }
            .primary-text { color: ${colors.primary} !important; }
          }

          /* Outlook Dark Mode Support */
          [data-ogsc] body { background-color: ${colors.surface} !important; color: ${colors.textPrimary} !important; }
          [data-ogsc] .card { background-color: ${colors.background} !important; }
        </style>
      </head>
      <body>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <table class="card" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <div style="background-color: rgba(122, 162, 247, 0.1); width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 20px; display: table;">
                      <span style="display: table-cell; vertical-align: middle; font-size: 32px;">🔐</span>
                    </div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">E-Mail bestätigen</h1>
                    <p class="text-muted" style="margin: 20px 0; font-size: 16px; line-height: 1.5; color: #4B5563;">
                      Tippe auf den Button, um deine Registrierung für <b class="primary-text" style="color: ${colors.primary};">Better Auth</b> abzuschließen.
                    </p>
                    <a href="${verificationUrl}" style="background-color: ${colors.primary}; color: #0B1020; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; margin-top: 10px; letter-spacing: 0.5px;">
                      JETZT VERIFIZIEREN
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    return await transporter.sendMail({
        from: '"Better Auth" <no-reply@deinedomain.de>',
        to: user.email,
        subject: "Verifiziere dein Konto",
        html: htmlLayout,
        text: "Verifiziere bitte dein Konto" + ${verificationUrl}
    });
};

export default sendVerificationEmail;
