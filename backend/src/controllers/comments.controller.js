import { supabase } from '../services/supabase.service.js';

// 🔹 GET: comentários de um post específico
export const getComments = async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('blog_comments')
    .select('*')
    .eq('post_slug', slug)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.json({ success: true, comments: data });
};

// 🔹 POST: adicionar novo comentário
export const addComment = async (req, res) => {
  const { name, text, post_slug } = req.body;

  if (!name || !text || !post_slug) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const { data, error } = await supabase
    .from('blog_comments')
    .insert([{ name, text, post_slug }])
    .select();

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(201).json({ success: true, comment: data[0] });
};

// 🔹 GET: todos os comentários (admin/uso interno)
export const getAllComments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, comments: data });
  } catch {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// 🔹 DELETE: apenas para admin
export const deleteComment = async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (token !== process.env.ADMIN_KEY) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.params;

  const { error } = await supabase
    .from('blog_comments')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.json({ success: true, message: 'Comment deleted' });
};

