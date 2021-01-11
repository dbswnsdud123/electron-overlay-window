import { app, BrowserWindow } from "electron";
import { overlayWindow } from "../";

let window: BrowserWindow;
let gwindow: BrowserWindow;

function createWindow(ddd: boolean) {
  const _window = new BrowserWindow({
    width: 400,
    height: 300,
    ...overlayWindow.WINDOW_OPTS,
  });

  _window.loadURL(`data:text/html;charset=utf-8,
    <head>
      <title>overlay-demo</title>
    </head>
    <body style="padding: 0; margin: 0;">
      <div style="position: absolute; width: 100%; height: 100%; border: 4px solid red; background: rgba(255,255,255,0.1); box-sizing: border-box;"></div>
      <div style="padding-top: 50vh; text-align: center;">
        <span style="padding: 16px; border-radius: 8px; background: rgb(255,255,255); border: 4px solid red;">Overlay Window</span>
      </div>
    </body>
  `);

  if (ddd) {
    _window.setIgnoreMouseEvents(true);
    _window.on("close", () => {});
    overlayWindow.attachTo(_window, "Untitled - Notepad");
    overlayWindow.show();
  }
  return _window;
}

function restart() {
  // overlayWindow.hide();
  overlayWindow.stop();
  window?.close();
  setTimeout(() => { window = createWindow(true) }, 1000);
   setTimeout(restart, 20000);
}

app.on("ready", () => {
  setTimeout(() =>  { gwindow = createWindow(false) }, 0);
  setTimeout(() =>  { window = createWindow(true) }, 0);

  setTimeout(restart, 2000);
});

process.stdin.resume();
