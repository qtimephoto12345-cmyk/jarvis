const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CHS_AI_URL = process.env.CHS_AI_URL || 'https://chs-spencer-computing.onrender.com/api/ai';
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => res.json({ ok: true, app: 'JARVIS by EME' }));
app.post('/api/chat', async (req, res) => {
  const message = String(req.body?.message || '').trim();
  if (!message) return res.status(400).json({ error: 'Please enter a message.' });
  if (message.length > 6000) return res.status(413).json({ error: 'Please keep messages under 6,000 characters.' });
  try {
    const upstream = await fetch(CHS_AI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: message, message })
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return res.status(502).json({ error: data.error || `CHS AI service returned ${upstream.status}. Check that the CHS /api/ai endpoint is available.` });
    }
    const answer = data.answer || data.response || data.message || '';
    if (!answer) return res.status(502).json({ error: 'CHS responded, but did not return an answer in the expected format.' });
    res.json({ answer, sources: data.sources || [] });
  } catch (err) {
    console.error('CHS connection error:', err.message);
    res.status(502).json({ error: 'Could not reach CHS. Check the CHS website and its AI endpoint.' });
  }
});
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`JARVIS by EME running on port ${PORT}`));
