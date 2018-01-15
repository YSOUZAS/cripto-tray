const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
} = require('electron');
const path = require('path');

const assets = path.join(__dirname, 'assets');


let tray;
let window;


const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
  window.focus();
};

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

const createTray = () => {
  tray = new Tray(path.join(assets, '/images/icon-16x16.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', (event) => {
    toggleWindow();
  });
};

const createWindow = () => {
  window = new BrowserWindow({
    width: 300,
    height: 230,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false,
      devTools: false,
    },
  });
  window.loadURL(`file://${path.join(__dirname, 'index.html')}`);

  window.on('blur', () => {
    window.hide();
  });
};

app.dock.hide();

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
