console.time('electron.js');
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const url = require('url');
const path = require('path');
const Store = require('electron-store');
const is = require('electron-util');
const store = new Store();

//* Keep a global reference of the window object, if you don't, the window will
//* be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const createMainWindow = async () => {
    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
        });

    const win = new BrowserWindow({
        minHeight: 500,
        minWidth: 400,
        height: 600,
        width: 500,
        maxHeight: 800,
        maxWidth: 700,
        frame: false,
        resizable: true,
        transparent: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    win.on('closed', () => {
        //* Dereference the window
        //* For multiple windows store them in an array
        mainWindow = undefined;
    });

    win.on('ready-to-show', () => {
        win.show();
    });

    await win.loadURL(startUrl);

    //* Open the DevTools.
    if (process.env.ELECTRON_START_URL) {
        win.webContents.openDevTools({
            mode: 'detach',
        });
    }

    LoadSettings(win);

    return win;
};
console.log(app.requestSingleInstanceLock());
// //* Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
    Quit();
}

app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.show();
    }
});

//* Quit when all windows are closed.
//* On OS X it is common for applications and their menu bar
//* to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
    if (!is.macos) {
        Quit();
    }
});

//* On OS X it's common to re-create a window in the app when the
//* dock icon is clicked and there are no other windows open.
app.on('activate', async () => {
    if (!mainWindow) {
        mainWindow = await createMainWindow();
    }
});

ipcMain.on('context-menu-quit', async () => {
    Quit();
});

ipcMain.on('quit', async () => {
    Quit();
});

function LoadSettings(win) {
    if (store.get('Positions.X')) {
        try {
            win.setPosition(store.get('Positions.X'), store.get('Positions.Y'));
        } catch (error) {
            console.error(error);
        }
    }

    if (store.get('Size.H')) {
        try {
            win.setSize(store.get('Size.W'), store.get('Size.H'));
        } catch (error) {
            console.error(error);
        }
    }
}

function Quit() {
    try {
        // Set a var with the actual position
        var _Positions = mainWindow.getPosition();
        // Set the settings with the var
        store.set('Positions', {
            X: _Positions[0],
            Y: _Positions[1],
        });
        // Set a var with the actual size
        var _Size = mainWindow.getSize();
        // Set the settings with the var
        store.set('Size', {
            W: _Size[0],
            H: _Size[1],
        });
    } catch (error) {
        console.error(error);
    }

    app.quit();
}

(async () => {
    //* This method will be called when Electron has finished
    //* initialization and is ready to create browser windows.
    //* Some APIs can only be used after this event occurs.
    await app.whenReady();
    setTimeout(async () => {
        mainWindow = await createMainWindow();
        console.timeEnd('electron.js');
    }, 500);
})();