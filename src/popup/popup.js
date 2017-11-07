chrome.tabs.query({ active: true }, tabs => {
  const url = tabs[0].url;
  const domain = getDomain(url);

  getDescription(domain).then(text => {
    const html = getMarkdownAsHtml(text);
    document.querySelector('.container').innerHTML = html;
  });
});

function getDescription(domain) {
  return fetch(
    `https://rawgit.com/paradise-papers/paradise-papers/master/companies/${domain}.md`
  )
    .then(response => {
      switch (response.status) {
        case 200:
          return response.text();
        case 404:
          return `#No data about ${domain}
Please add something on [Github](https://www.github.com/paradise-papers/paradise-papers)`;
      }
    })
    .catch(err => console.log('Fetch Error :-S', err));
}

function getDomain(url) {
  const { hostname } = new URL(url);
  return hostname.replace(/^www\./, '');
}

function getMarkdownAsHtml(text) {
  const converter = new showdown.Converter({
    openLinksInNewWindow: true
  });
  return converter.makeHtml(text);
}
