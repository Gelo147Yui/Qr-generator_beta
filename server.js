import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const historyFile = path.join(__dirname, 'history.json');

// POST /history — сохранить запись
app.post('/history', (req, res) => {
  const newEntry = req.body;

  let history = [];
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
  }

  history.push(newEntry);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
  res.json({ message: 'История обновлена' });
});

// POST /generate (заглушка, если нужно использовать API)
app.post('/generate', (req, res) => {
  res.json({ message: 'QR generation handled client-side' });
});

app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
