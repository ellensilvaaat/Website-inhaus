import { supabase } from '../services/supabase.service.js';
import { sendConfirmationEmail } from '../services/email.service.js';

export const submitContactForm = async (req, res) => {
  try {
    const data = req.body;

    // Mapeia os campos do front (camelCase) → formato da tabela (snake_case)
    const payload = {
      full_name: data.fullName,
      email: data.email,
      address: data.address,
      mobile: data.mobile,
      budget: data.budget,
      service: data.service,
      installation_date: data.installationDate || null,
      found_us: data.foundUs,
      subject: data.subject,
      message: data.message,
      status: 'new'
    };

    // Inserir no Supabase e retornar o registro criado
    const { data: result, error } = await supabase
      .from('contact_forms')
      .insert([payload])
      .select();

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Envia e-mail para o time + confirmação para o usuário
    try {
      await sendConfirmationEmail(data);
    } catch {
      // Continua mesmo se o envio de e-mail falhar
    }

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      result
    });

  } catch {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

