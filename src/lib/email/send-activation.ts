import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.RESEND_FROM ?? "AurumCash <noreply@aurumcash.app>";
const APP    = process.env.NEXT_PUBLIC_APP_URL ?? "https://appfinancas-nu.vercel.app";

interface SendActivationParams {
  to:    string;
  name:  string;
  token: string;
}

export async function sendActivationEmail({ to, name, token }: SendActivationParams) {
  const link = `${APP}/ativar-conta?token=${token}`;
  const firstName = name.split(" ")[0];

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sua conta está pronta — AurumCash</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#D4AF37,#B8952A);border-radius:12px;width:44px;height:44px;text-align:center;vertical-align:middle;">
                    <span style="color:#0A0A0A;font-size:20px;font-weight:700;font-family:Georgia,serif;line-height:44px;">A</span>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <span style="color:#FFFFFF;font-size:18px;letter-spacing:3px;font-family:Georgia,serif;">AURUM</span><br/>
                    <span style="color:#D4AF37;font-size:10px;letter-spacing:4px;text-transform:uppercase;">Finance</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background:#111111;border:1px solid rgba(212,175,55,0.15);border-radius:16px;padding:40px 40px 36px;">

              <!-- top gold line -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td height="2" style="background:linear-gradient(90deg,#D4AF37,#B8952A,transparent);border-radius:2px;"></td>
                </tr>
              </table>

              <!-- heading -->
              <p style="margin:0 0 8px;color:#D4AF37;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Pagamento Aprovado</p>
              <h1 style="margin:0 0 20px;color:#FFFFFF;font-size:26px;font-weight:300;font-family:Georgia,serif;line-height:1.3;">
                Olá, ${firstName}.<br/>Sua conta está pronta.
              </h1>

              <p style="margin:0 0 28px;color:#A1A1AA;font-size:14px;line-height:1.7;">
                Seu pagamento foi confirmado com sucesso. Clique no botão abaixo para criar sua senha e ativar seu acesso à plataforma.
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${link}"
                       style="display:inline-block;background:linear-gradient(135deg,#D4AF37,#B8952A);color:#0A0A0A;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;padding:14px 40px;border-radius:10px;box-shadow:0 8px 24px rgba(212,175,55,0.3);">
                      CRIAR MINHA SENHA
                    </a>
                  </td>
                </tr>
              </table>

              <!-- expiry warning -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.12);border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 16px;">
                    <p style="margin:0;color:#D4AF37;font-size:12px;">⏱ Este link expira em <strong>24 horas</strong>.</p>
                  </td>
                </tr>
              </table>

              <!-- link fallback -->
              <p style="margin:0 0 8px;color:#52525B;font-size:12px;">Se o botão não funcionar, copie e cole este link no navegador:</p>
              <p style="margin:0;word-break:break-all;">
                <a href="${link}" style="color:#D4AF37;font-size:12px;text-decoration:none;">${link}</a>
              </p>

              <!-- bottom line -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td height="1" style="background:#1E1E1E;"></td>
                </tr>
              </table>
              <p style="margin:20px 0 0;color:#3F3F46;font-size:11px;line-height:1.6;">
                Se você não reconhece esta compra, ignore este e-mail. Nenhuma ação é necessária.
              </p>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#3F3F46;font-size:11px;">© 2025 AurumCash — Todos os direitos reservados</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from:    FROM,
    to,
    subject: "Sua conta está pronta — AurumCash",
    html,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
  return data;
}
