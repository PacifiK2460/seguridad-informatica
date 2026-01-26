import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendMail(
    to: string,
    subject: string,
    html: string
) {
    await transporter.sendMail({
        from: `"Santiago Lara" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
}

export const THANK_YOU_TEMPLATE = (name: string, message: string) => `
<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="height:16px"></div>
              <div
                style="font-size:21px;font-weight:bold;padding:0px 24px 16px 24px"
              >
                ¡Hola ${name}! 👋,
              </div>
              <div style="font-weight:normal;padding:0px 24px 16px 24px">
                <p>
                  Gracias por contactarme — ¡eh recibido tu mensaje y aprecio
                  mucho tu tiempo por haberlo escrito!
                </p>
                <p>
                  Me pondré en contacto contigo en cuanto pueda. Te dejo una
                  copia de tu mensaje por si ocupas ocupas un poco de contexto.
                </p>
                <p>¡Ten un excelente día 😎🌞!</p>
                <p>— Santiago Lara</p>
              </div>
              <div
                style="background-color:#F5F5F5;font-weight:normal;padding:16px 24px 16px 24px"
              >
                ${message}
              </div>
              <div style="text-align:center;padding:16px 24px 24px 24px">
                <a
                  href="https://si.santiago-lara.dev/"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#e20e0e;display:block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span>Visita mi sitio</span
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;