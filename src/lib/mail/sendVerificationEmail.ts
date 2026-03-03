import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
});

const sendVerificationEmail = async ({ user, token }: { user: { email: string }, token: string }) => {
    const verificationUrl = `http://localhost:3000/auth?view=verification&token=${token}`;

    const colors = {
        primary: "#7AA2F7",
        background: "#121212",
        surface: "#212121",
        textPrimary: "#E5E7EB",
        textSecondary: "#9CA3AF",
    };

    const htmlLayout = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <!-- Roboto Font Import -->
        <style>
            @import url('https://fonts.googleapis.com');
            body, table, td { font-family: 'Roboto', Arial, sans-serif !important; }
        </style>
    </head>
    <body style="background-color: ${colors.surface}; margin: 0; padding: 40px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: ${colors.background}; border-radius: 16px;">
            <tr>
                <td style="padding: 40px; text-align: center;">
                    <!-- Material Icon Ersatz: Da Webfonts für Icons unzuverlässig sind, 
                         nutzen wir ein gehostetes Icon oder ein SVG-Pfad-Bild -->
                    <div style="background-color: rgba(122, 162, 247, 0.1); width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 20px; display: table;">
                        <span style="display: table-cell; vertical-align: middle; font-size: 32px; color: ${colors.primary};">
                            <!-- Hier kann alternativ ein <img> mit einem Icon-Link stehen -->
                            🔐
                        </span>
                    </div>
                    
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: ${colors.textPrimary};">
                        E-Mail bestätigen
                    </h1>
                    
                    <p style="margin: 20px 0; font-size: 16px; color: ${colors.textSecondary}; line-height: 1.5;">
                        Tippe auf den Button, um deine Registrierung für <b style="color: ${colors.primary};">Better Auth</b> abzuschließen.
                    </p>

                    <a href="${verificationUrl}" 
                       style="background-color: ${colors.primary}; 
                              color: #0B1020; 
                              padding: 16px 32px; 
                              text-decoration: none; 
                              border-radius: 12px; 
                              font-weight: bold; 
                              display: inline-block; 
                              margin-top: 10px;
                              letter-spacing: 0.5px;">
                        JETZT VERIFIZIEREN
                    </a>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    // Versand via nodemailer...
};


export default sendVerificationEmail;
