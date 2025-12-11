/**
 * Send Email API Endpoint
 * 
 * POST /api/send-email
 * Sends email notification when contact form is submitted
 */

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, service, date, message } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    // Send email notification to Nuro
    const { data, error } = await resend.emails.send({
      from: 'Nuro Photographer <noreply@resend.dev>',
      to: ['nurosousa@gmail.com'],
      subject: `📸 Nova Mensagem: ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #333); padding: 30px; border-radius: 16px; color: white; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">Nova Mensagem de Contacto</h1>
            <p style="margin: 10px 0 0; opacity: 0.8;">Recebido via website</p>
          </div>
          
          <div style="background: #f8f8f8; padding: 24px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 18px;">Detalhes do Cliente</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;">Nome</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #1a1a1a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Telefone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone || 'Não informado'}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Serviço</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 500;">${service || 'Não especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #666;">Data Preferida</td>
                <td style="padding: 12px 0; font-weight: 500;">${date || 'Não especificada'}</td>
              </tr>
            </table>
          </div>
          
          ${message ? `
          <div style="background: #f8f8f8; padding: 24px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 18px;">Mensagem</h2>
            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="display: flex; gap: 12px; margin-bottom: 20px;">
            <a href="https://wa.me/${phone?.replace(/\D/g, '')}" 
               style="display: inline-block; padding: 12px 24px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
              Responder WhatsApp
            </a>
            <a href="mailto:${email}" 
               style="display: inline-block; padding: 12px 24px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
              Responder Email
            </a>
          </div>
          
          <p style="color: #999; font-size: 12px; margin: 0;">
            Este email foi enviado automaticamente pelo site Nuro Photographer.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
