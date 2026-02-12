import axios from 'axios';
import crypto from 'crypto';
import { supabase } from '../services/supabase.service.js';

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { name, email } = req.body;

    // ✅ Validação básica
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const normalizedEmail = email.toLowerCase();

    // ===============================
    // 1️⃣ SALVA NO SUPABASE (BACKUP)
    // ===============================
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        [{ name, email: normalizedEmail }],
        { onConflict: 'email' } // evita duplicação
      );

    if (dbError) {
      console.error('❌ Supabase error:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Database error',
      });
    }

    // ===============================
    // 2️⃣ ENVIA PARA MAILCHIMP
    // ===============================
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DC = process.env.MAILCHIMP_DC;

    const subscriberHash = crypto
      .createHash('md5')
      .update(normalizedEmail)
      .digest('hex');

    const mailchimpUrl = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

    try {
      await axios.put(
        mailchimpUrl,
        {
          email_address: normalizedEmail,
          status_if_new: 'subscribed',
          status: 'subscribed',
          merge_fields: {
            FNAME: name,
          },
        },
        {
          headers: {
            Authorization: `apikey ${MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (mailchimpError) {
      console.error(
        '⚠️ Mailchimp error:',
        mailchimpError.response?.data || mailchimpError.message
      );
      // Não bloqueia o cadastro se Mailchimp falhar
    }

    return res.status(200).json({
      success: true,
      message: 'Subscribed successfully',
    });

  } catch (err) {
    console.error('❌ Newsletter controller error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
