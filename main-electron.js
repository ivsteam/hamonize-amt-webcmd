/** 
* @description MeshCommander
* @author Ylian Saint-Hilaire
* @copyright Intel Corporation 2018
* @license Apache-2.0
* @version v0.0.3
*/

const { app, BrowserWindow } = require('electron')

function CreateMeshCommanderServer(args) {
    var obj = {};
    obj.args = require('minimist')(process.argv.slice(2));

    // Start the Meshcommander server
    obj.Start = function () { obj.webserver = require('./webserver.js').CreateWebServer(obj.args); }
    
    // Stop the Meshcommander server
    obj.Stop = function () { if (obj.webserver) { delete obj.webserver; } }
    
    return obj;
}

function InstallModules(modules, func) {
    if (modules.length == 0) { func(); return; }
    InstallModule(modules.shift(), InstallModules, modules, func)
}

function InstallModule(modulename, func, tag1, tag2) {
    try {
        var module = require(modulename);
        delete module;
        func(tag1, tag2);
    } catch (e) {
        console.log('Installing ' + modulename + '...');
        var child_process = require('child_process');
        child_process.exec('npm install --save ' + modulename, function (error, stdout, stderr) { func(tag1, tag2); return; });
    }
}

function createWindow () {
  // 브라우저 창을 생성합니다.
  let win = new BrowserWindow({
    width: 1280,
    height: 720,
    //backgroundColor: '#2e2c29'.	  
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  })

  // Connect AMT Console
  win.loadURL('http://127.0.0.1:3000')

  // 창이 닫힐 때 발생합니다
  win.on('closed', () => {
    // window 객체에 대한 참조해제. 여러 개의 창을 지원하는 앱이라면 
    // 창을 배열에 저장할 수 있습니다. 이곳은 관련 요소를 삭제하기에 좋은 장소입니다.
    win = null
  })	

}

InstallModules(['minimist', 'express', 'express-ws'], function () { CreateMeshCommanderServer().Start(); });

// 이 메서드는 Electron이 초기화를 마치고 
// 브라우저 창을 생성할 준비가 되었을 때  호출될 것입니다.
// 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
app.on('ready', createWindow)

// 모든 창이 닫혔을 때 종료.
app.on('window-all-closed', () => {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
  if (win === null) {
    createWindow()
  }
})
