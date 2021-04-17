const fs = require('fs');
const express = require('express');
const cors = require('cors');
const Argv = process.argv.slice(2).reduce((obj, argv) => {
  const [key, value] = argv.split('=');
  return {...obj, [key]: value};
}, {});
const LogPath = Argv.path ? Argv.path : '../bukkit server/plugins/Epilog';
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

const ReadDir = (path) => {
  const files = fs.readdirSync(path);
  return files.map((file) => {
    if (fs.lstatSync(`${path}/${file}`).isDirectory()) {
      return ({
        name: file,
        files: ReadDir(`${path}/${file}`),
      })
    }
    return ({
      name: file,
      size: fs.statSync(`${path}/${file}`).size / (1024 * 1024),
    });
  });
}

app.get('/files', async (req, res) => {
  if (fs.existsSync(LogPath)) {
    res.send(ReadDir(LogPath));
  }
});

app.get('/log', (req, res) => {
  console.log(req);
});
app.get('/post', (req, res) => {
  console.log(req);
});

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
