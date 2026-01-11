import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// 🔍 Debug de ambiente (remova depois)
console.log('📨 EMAIL_USER:', process.env.EMAIL_USER ? 'OK' : 'MISSING');
console.log('📨 EMAIL_PASS:', process.env.EMAIL_PASS ? 'OK' : 'MISSING');

// 🚀 Transporter SMTP Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // senha de app
  },
});

// 🧪 Testa conexão SMTP ao subir o servidor
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error);
  } else {
    console.log('✅ SMTP server ready to send emails');
  }
});

// 📨 Função para enviar e-mails
export const sendConfirmationEmail = async (formData) => {
  console.log('📧 Iniciando envio de emails para:', formData.email);

  const {
    fullName,
    email,
    address,
    mobile,
    budget,
    service,
    installationDate,
    subject,
    message
   } = formData;

  // 📩 Email para o time Inhaus
  const adminMail = {
    from: `"Inhaus Living Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `📬 New Contact Submission: ${fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Installation Date:</strong> ${installationDate || 'Not specified'}</p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
      <br/>
      <hr/>
      <p style="color:#555;font-size:14px;">This message was automatically generated from the Inhaus Living contact form.</p>
    `,
  };

  // 💌 Email de confirmação ao usuário
  const confirmationMail = {
    from: `"Inhaus Living" <info@inhausliving.com.au>`,
    to: email,
    subject: 'We received your request!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #d37a3f;">Welcome to Inhaus Living, ${fullName.split(' ')[0]}!</h2>

        <p>
          Thank you for contacting <strong>Inhaus Living</strong>. We're delighted to have you here! 
          Our team has received your request and will reach out very soon to discuss your project in more detail.
        </p>

        <h3 style="color: #d37a3f;">📋 Here’s a summary of your request:</h3>
        <ul style="list-style: none; padding-left: 0;">
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Budget:</strong> ${budget}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Preferred Installation Date:</strong> ${installationDate || 'Not specified'}</li>
          ${subject ? `<li><strong>Subject:</strong> ${subject}</li>` : ''}
        </ul>

        ${message ? `
        <p><strong>Your message:</strong></p>
        <blockquote style="border-left: 4px solid #d37a3f; padding-left: 1em; color: #555;">
          ${message}
        </blockquote>
        ` : ''}

        <p>
          One of our specialists will get in touch with you shortly to help plan and bring your ideas to life. 
          We’re excited to make your home transformation experience smooth and inspiring.
        </p>

        <p style="margin-top: 2em;">
          Warm regards,<br/>
          <strong>The Inhaus Living Team</strong><br/>
          <a href="https://inhausliving.com.au" style="color:#d37a3f;text-decoration:none;">www.inhausliving.com.au</a>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(confirmationMail);
    console.log('📧 Polished Gmail emails sent successfully!');
  } catch (error) {
    console.error('⚠️ Erro ao enviar emails:', error);
  }
};
