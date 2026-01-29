import { supabase } from '../services/supabase.service.js';

export const subscribeToNewsletter = async (req, res) => {
  try {
    console.log('🔥 BODY RECEBIDO (newsletter):', req.body);

    const { name, email } = req.body;

    // ✅ Validação igual ao contact
    if (!name || !email) {
      console.warn('⚠️ Dados incompletos newsletter:', req.body);
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // (opcional) validação simples de email
    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // ✅ Insert na tabela correta
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ name, email }]);

    if (error) {
      console.error('❌ Supabase error (newsletter):', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to subscribe to newsletter',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Subscribed successfully',
      data,
    });

  } catch (err) {
    console.error('❌ Newsletter controller error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

