export default {
  cmd: {
    uploadFile: 0,
    getFileContent: 1,
    getClipboard: 4,
    getScreenshot: 5,
    execCommand: 6,
    getProcessList: 7,
    listenKeyboard: 8
  },
  task_status: {
    initialized: 0,
    sent: 1,
    received: 2,
    wantRetrieveThroughTrans: 3,
    transConnEstablished: 4,
    finished: 5,
    errorInExecution: 6
  }
}
