// backend/server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/download', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('URL inválida');

  const filename = `audio-${Date.now()}.mp3`;
  const outputPath = path.join(__dirname, filename);
  const command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;

  exec(command, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al convertir');
    }

    res.download(outputPath, filename, () => {
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
