import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_123');
  try {
    const data = await request.json();
    const { nombre, telefono, email, servicio, mensaje } = data;

    if (!nombre || !telefono) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const servicioFormateado = servicio ? `Puerta ${servicio}` : 'Consulta General';

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #c8a84b;">Nueva Solicitud de Cotización</h2>
        <p>Has recibido una nueva solicitud desde la página web <strong>puertasvalencia.cl</strong>:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="https://wa.me/${telefono.replace(/\D/g,'')}" style="color: #25D366; font-weight: bold; text-decoration: none;">
                ${telefono} (Hablar por WhatsApp)
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'No proporcionado'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Servicio de interés:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <span style="background: #111; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                ${servicioFormateado}
              </span>
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #fafaf8; border-left: 4px solid #c8a84b; border-radius: 4px;">
          <h4 style="margin-top: 0; color: #333;">Mensaje adicional:</h4>
          <p style="white-space: pre-wrap; margin-bottom: 0; color: #555;">${mensaje || 'No dejó mensaje adicional.'}</p>
        </div>
      </div>
    `;

    // 1. Enviar correo interno (Lead)
    const response = await resend.emails.send({
      from: "Web Puertas Valencia <contacto@puertasvalencia.cl>",
      to: "contacto@puertasvalencia.cl",
      subject: `Nuevo Lead: ${servicioFormateado} - ${nombre}`,
      html: htmlContent,
      replyTo: email || undefined,
    });

    if (response.error) {
      console.error("Resend Error (Lead):", response.error);
      return new Response(JSON.stringify({ error: response.error }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // 2. Enviar Auto-respuesta al cliente (solo si dejó correo)
    if (email) {
      const customerHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.puertasvalencia.cl/web_images/Logo-Puertas-Valencia.webp" alt="Puertas Valencia Logo" style="height: 60px; object-fit: contain; padding: 10px;" />
          </div>
          <h2 style="color: #c8a84b; text-align: center;">¡Hemos recibido tu solicitud!</h2>
          <p style="color: #333;">Hola <strong>${nombre}</strong>,</p>
          <p style="color: #333;">Gracias por contactarnos. Hemos recibido tu solicitud para <strong>${servicioFormateado}</strong> y uno de nuestros especialistas se pondrá en contacto contigo muy pronto.</p>
          <p style="color: #333;">Si necesitas una respuesta más rápida, no dudes en escribirnos por WhatsApp haciendo clic en el siguiente enlace:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/56957290061" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Chatear por WhatsApp</a>
          </div>
          <p style="color: #333;">Atentamente,<br><strong>El equipo de Puertas Valencia</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #777; font-size: 12px; text-align: center;">Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      `;

      await resend.emails.send({
        from: "Puertas Valencia <contacto@puertasvalencia.cl>",
        to: email,
        subject: "Hemos recibido tu solicitud - Puertas Valencia",
        html: customerHtml,
      });
    }

    return new Response(JSON.stringify({ success: true, data: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Internal API Error:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
