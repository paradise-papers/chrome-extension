// var port = chrome.extension.connect({
//   name: 'Sample Communication'
// });
// port.postMessage('Hi BackGround');
// port.onMessage.addListener(function(msg) {
//   console.log('message recieved' + msg);
// });

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  const url = tabs[0].url;
  console.log(url);
});
