const promise = getList();

chrome.tabs.onUpdated.addListener((tabID, info, tab) => {
  updateIcon(tab.url);
});

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const url = tabs[0].url;
    updateIcon(url);
  });
});

function updateIcon(url) {
  promise.then(domains => {
    const { hostname } = new URL(url);
    const domain = hostname.replace(/^www\./, '');

    chrome.browserAction.setIcon({
      path: domains.includes(domain)
        ? './icons/criminal-39.png'
        : './icons/tropics-39.png'
    });
  });
}

function getList() {
  return fetch(
    'https://rawgit.com/paradise-papers/paradise-papers/master/companies.json'
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
