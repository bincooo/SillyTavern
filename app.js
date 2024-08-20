const { app, net, protocol, BrowserWindow } = require('electron');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('node:fs');
require('./post-install.js');
const { server_port } = require('./server.js');

const apis = [
    'csrf-token',
    'version',
  ]

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 800,
    width: 1007,
    height: 800,
    icon: path.join(__dirname, 'public/favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
 
  // 加载 index.html
  // 此处跟electron官网路径不同，需要注意
  console.log(`mainWindow.loadURL('http://127.0.0.1:${server_port})`)
  mainWindow.loadURL('http://127.0.0.1:'+server_port)
  // mainWindow.loadFile('public/index.html')

  // 注册自定义协议
  // protocol.handle('app', (request) => {
  //   const url = request.url.replace('app://', '');

  //   const isApi = (url) => {
  //     for (var i = 0; i < apis.length; i++) {
  //       const api = apis[i]
  //       if (url.startsWith('public/'+api)) {
  //         return true;
  //       }
  //     }
  //     if (url.startsWith('public/api/')) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   const trimP = (url) => {
  //     return url.substr(7)
  //   }

  //   if (!isApi(url)) {
  //     const pathToServe = path.resolve(__dirname, url);
  //     const relativePath = path.relative(__dirname, pathToServe);
  //     const isSafe = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
  //     if (!isSafe) {
  //       return new Response('bad', {
  //         status: 400,
  //         headers: { 'content-type': 'text/html' }
  //       });
  //     }

  //     return net.fetch(pathToFileURL(pathToServe).toString());
  //   } else {
  //     console.log(trimP(url));
  //     return net.fetch('http://127.0.0.1:8000/' + trimP(url), request);
  //   }
  // });

  // mainWindow.loadURL('app://public/index.html');

  // 打开开发工具config
  // mainWindow.webContents.openDevTools()
}


protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, supportFetchAPI: true, secure: true } }
])

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
 
  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  app.quit()
});