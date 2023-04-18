import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const ip = require("ip")
const os = require("os")
const net = require("net")
const fs = require("fs")
const path = require('path')

// Custom APIs for renderer
const api = {
  ipAddress: () => ip.address(),
  hostname: () => os.hostname(),
  fileDialog: () => ipcRenderer.invoke('dialog:open'),
  createServer: () => net.createServer(),
  createReadStream: (path) => fs.createReadStream(path),
  createConnection: (option) => net.connect(option),
  fs:fs,
  path:path,
  statSync: (path) => fs.statSync(path)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
