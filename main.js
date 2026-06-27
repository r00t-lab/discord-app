const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'YKS Ajans',
    show: false,
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  win.once('ready-to-show', () => {
    win.maximize();
    win.show();
  });

  win.loadURL('https://yksajans.com', {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  win.webContents.on('did-fail-load', () => {
    win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Bağlantı Hatası</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
            color: #333;
          }
          h2 { color: #e74c3c; }
          p { color: #666; }
          button {
            margin-top: 20px;
            padding: 12px 28px;
            font-size: 16px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }
          button:hover { background: #2980b9; }
        </style>
      </head>
      <body>
        <h2>⚠️ Bağlantı Kurulamadı</h2>
        <p>yksajans.com adresine ulaşılamıyor.<br>İnternet bağlantınızı kontrol edin.</p>
        <button onclick="location.reload()">🔄 Tekrar Dene</button>
      </body>
      </html>
    `));
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
