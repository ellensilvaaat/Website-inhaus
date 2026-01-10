import { supabase } from '../services/supabase.service.js';

// 🔹 GET: todos os feedbacks
export const getFeedbacks = async (req, res) => {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.json({ success: true, feedbacks: data });
};

// 🔹 POST: criar novo feedback
export const createFeedback = async (req, res) => {
  const { name, stars, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ success: false, message: 'Name and comment required' });
  }

  const { data, error } = await supabase
    .from('feedbacks')
    .insert([{ name, stars, comment }])
    .select();

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(201).json({ success: true, feedback: data[0] });
};

// 🔹 DELETE: remover feedback (apenas admin)
export const deleteFeedback = async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (token !== process.env.ADMIN_KEY) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.params;

  const { error } = await supabase
    .from('feedbacks')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.json({ success: true, message: 'Feedback deleted' });
};
