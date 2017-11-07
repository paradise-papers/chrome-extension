const promise = getList();

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  updateIcon(tab.url, tabId);
});

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const { url, id } = tabs[0];
    updateIcon(url, id);
  });
});

function updateIcon(url, tabId) {
  promise.then(domains => {
    const domain = getDomain(url);
    chrome.browserAction.setIcon({
      tabId,
      path: domains.includes(domain)
        ? './icons/tropics-red-39.png'
        : './icons/tropics-green-39.png'
    });
  });
}

function getList() {
  return fetch(
    'https://raw.githubusercontent.com/paradise-papers/paradise-papers/master/companies.json'
  )
    .then(response => {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      return response.json();
    })
    .catch(err => {
      console.log('Fetch Error :-S', err);
    });
}

function getDomain(url) {
  const { hostname } = new URL(url);
  return hostname.replace(/^www\./, '');
}
