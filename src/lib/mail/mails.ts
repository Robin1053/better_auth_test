import nodemailer from "nodemailer";
import { theme } from "@/theme/mui.ts"
const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
});

constconst sendVerificationEmail = async ({ user, token }: { user: { email: string }, token: string }) => {
    const baseUrl = process.env.BETTER_AUTH_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/auth?view=verification&token=${token}`;

    const colors = {
        primary: theme.palette.primary.main,
        background: theme.palette.background.default,
        surface: theme.palette.background.paper,
        textPrimary: theme.palette.text.primary,
        textSecondary: theme.palette.text.secondary,
    };

    const htmlLayout = `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com');
          body { font-family: 'Roboto', Arial, sans-serif !important; margin: 0; padding: 40px 0; background-color: #F3F4F6; color: #111827; }
          .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #E5E7EB; }
          @media (prefers-color-scheme: dark) {
            body { background-color: ${colors.surface} !important; color: ${colors.textPrimary} !important; }
            .card { background-color: ${colors.background} !important; border-color: #374151 !important; }
            .text-muted { color: ${colors.textSecondary} !important; }
            .icon-bg { background-color: rgba(122, 162, 247, 0.2) !important; }
          }
        </style>
      </head>
      <body>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <table class="card" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <!-- Material Icon: Lock -->
                    <div class="icon-bg" style="background-color: rgba(122, 162, 247, 0.1); width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 20px; display: inline-block; line-height: 64px; vertical-align: middle;">
                      <svg xmlns="http://www.w3.org" height="32px" viewBox="0 0 24 24" width="32px" fill="${colors.primary}" style="vertical-align: middle; margin-top: -4px;">
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
                      </svg>
                    </div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">E-Mail bestätigen</h1>
                    <p class="text-muted" style="margin: 20px 0; font-size: 16px; line-height: 1.5; color: #4B5563;">
                      Tippe auf den Button, um deine Registrierung für <b style="color: ${colors.primary};">Better Auth</b> abzuschließen.
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
    `
    return await transporter.sendMail({
        from: '"Better Auth" <no-reply@deinedomain.de>',
        to: user.email,
        subject: "Verifiziere deine E-Mail",
        text: `Verifiziere bitte deine E-Mail: ${verificationUrl}`, 
        html: htmlLayout,
    });};



const sendPasswordResetEmail = async ({ user, token }: { user: { email: string }, token: string }) => {
    const baseUrl = process.env.BETTER_AUTH_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const resetUrl = `${baseUrl}/auth?view=reset-password&token=${token}`;

    const colors = {
        primary: theme.palette.primary.main,
        background: theme.palette.background.default,
        surface: theme.palette.background.paper,
        textPrimary: theme.palette.text.primary,
        textSecondary: theme.palette.text.secondary,
    };

    const htmlLayout = `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com');
          body { font-family: 'Roboto', Arial, sans-serif !important; margin: 0; padding: 40px 0; background-color: #F3F4F6; color: #111827; }
          .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #E5E7EB; }
          @media (prefers-color-scheme: dark) {
            body { background-color: ${colors.surface} !important; color: ${colors.textPrimary} !important; }
            .card { background-color: ${colors.background} !important; border-color: #374151 !important; }
            .text-muted { color: ${colors.textSecondary} !important; }
            .icon-bg { background-color: rgba(122, 162, 247, 0.2) !important; }
          }
        </style>
      </head>
      <body>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <table class="card" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <!-- Material Icon: Lock Reset -->
                    <div class="icon-bg" style="background-color: rgba(122, 162, 247, 0.1); width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 20px; display: inline-block; line-height: 64px; vertical-align: middle;">
                      <svg xmlns="http://www.w3.org" height="32px" viewBox="0 0 24 24" width="32px" fill="${colors.primary}" style="vertical-align: middle; margin-top: -4px;">
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/>
                      </svg>
                    </div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Passwort zurücksetzen</h1>
                    <p class="text-muted" style="margin: 20px 0; font-size: 16px; line-height: 1.5; color: #4B5563;">
                      Du hast eine Anfrage zum Zurücksetzen deines Passworts für <b style="color: ${colors.primary};">Better Auth</b> gestellt.
                    </p>
                    <a href="${resetUrl}" style="background-color: ${colors.primary}; color: #0B1020; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; margin-top: 10px; letter-spacing: 0.5px;">
                      PASSWORT ÄNDERN
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `
return await transporter.sendMail({
        from: '"Better Auth Support" <support@deinedomain.de>',
        to: user.email,
        subject: "Passwort zurücksetzen",
        text: `Passwort zurücksetzen: ${resetUrl}`,
        html: htmlLayout,
    });
};


export default sendVerificationEmail;
