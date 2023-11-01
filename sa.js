fetch("https://cyberleninka.ru/api/search", {
  "headers": {
    "accept": "*/*",
    "accept-language": "ru,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"YaBrowser\";v=\"23\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://cyberleninka.ru/search?q=xss&page=1",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"mode\":\"articles\",\"q\":\"xss\",\"size\":10,\"from\":0}",
  "method": "POST"
}).then(res => res.json()).then(data => {
  console.log(data)
});