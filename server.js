const fs = require('fs');
const express = require('express');
const cors = require('cors');
const LogPath = '../bukkit server/plugins/Epilog';
const PORT = 8080;

const app = express();
app.use(cors());

let renameTimeout = null;
const renameLog = (src, dest, times = 0) => {
  try {
    clearTimeout(renameTimeout);
    fs.accessSync(src, fs.constants.R_OK | fs.constants.W_OK);
    fs.renameSync(src, dest);
  } catch (err) {
    if (times < 10) {
      console.error('wait for access!');
      renameTimeout = setTimeout(() => renameLog(src, dest, times ++), 1000);
    } else {
      console.error('can not rename log');
    }
  }
}
if (fs.existsSync(LogPath)) {
  fs.watch(LogPath, (eventType, filename) => {
    console.log(eventType, filename);
    if (filename === 'log_cache.json') {
      const src = LogPath + '/' + filename;
      const dest = src.replace('.json', `_${new Date().getTime()}.json`);
      if (fs.existsSync(src)) {
        renameLog(src, dest);
      }
    }
  });
}

app.get('/read/:filename', (req, res) => {
  // console.log(req.params.filename);
  const filepath = LogPath + '/' + req.params.filename;
  if (fs.existsSync(filepath)) {
    const data = fs.readFileSync(filepath, {encoding: 'utf8'}).split('\n').map((x, i) => x ? JSON.parse(x) : {});
    res.send(data);
  } else {
    res.status(404).send('Sorry cant find that!');
  }
});

app.get('/', (req, res) => {
  res.redirect(301, `http://${req.hostname}:3000`);
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
