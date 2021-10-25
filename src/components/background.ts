import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  MenuItem,
} from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;
let iconPath: any;
let appIcon: any;
let boards;

if (process.platform === 'linux') {
  console.log('it is linux');
  iconPath = 'src/assets/gear_icon.png';
} else {
  iconPath = 'src/assets/gear_icon.png';
}

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1280, height: 720 });
  win.maximize();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // app.quit()
    win.hide();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'open',
    type: 'normal',
    click: () => {
      createWindow();
    },
  },
  { label: 'quit', type: 'normal', role: 'quit' },
]);

app.on('ready', () => {
  appIcon = new Tray(iconPath);
  appIcon.setContextMenu(contextMenu);
  installVueDevtools();
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

function openBoard(board: any) {
  if (!win) {
    createWindow();
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('openBoard', board);
      // console.log('sending board to renderer: ' + board)
    });
  }
}

ipcMain.on('boardList', (event: any, arg: any) => {
  if (arg) {
    boards = arg;
    const trayLabels = contextMenu.items.map((item) => item.label);
    try {
      const boardLabels = boards.map((board: { board: any }) => board.board);
      // need to remove boards from the list when a board gets deleted
      boardLabels.forEach((label: string) => {
        if (!trayLabels.includes(label)) {
          const trayItem = new MenuItem({
            label,
            type: 'normal',
            click: () => {
              openBoard(label);
            },
          });
          contextMenu.append(trayItem);
        }
      });
    } catch (e) {
      console.error(e);
    }
    appIcon.setContextMenu(contextMenu);
  }
});
