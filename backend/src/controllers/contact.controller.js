import { supabase } from '../services/supabase.service.js';
import { sendConfirmationEmail } from '../services/email.service.js';

export const submitContactForm = async (req, res) => {
  try {
    const data = req.body;

    // Validação básica dos campos obrigatórios
    if (
      !data.fullName ||
      !data.email ||
      !data.address ||
      !data.mobile ||
      !data.budget ||
      !data.service ||
      !data.installationDate ||
      !data.subject ||
      !data.message
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

const payload = {
  full_name: data.fullName,
  email: data.email,
  address: data.address,
  mobile: data.mobile,
  budget: data.budget,
  service: data.service,
  installation_date: data.installationDate,
  found_us: data.foundUs || null,
  subject: data.subject || null,
  message: data.message || null,
  status: 'new'
};


    console.log('📩 Contact payload:', payload);

    const { data: result, error } = await supabase
      .from('contact_forms')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    try {
      await sendConfirmationEmail(data);
    } catch (emailErr) {
      console.warn('⚠️ Email send failed:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      result
    });

  } catch (err) {
    console.error('🔥 Unexpected error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

