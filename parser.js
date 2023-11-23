const fs = require('fs');
const {JSDOM} = require('jsdom');

module.exports = class parser {
  #theme

  constructor(theme) {
    this.#theme = theme
  }

  getArticles(res) {
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
        "cookie": "_ga=GA1.2.1373216610.1698813748; _gid=GA1.2.776421329.1698813748; _ym_uid=1698813748685163160; _ym_d=1698813748; _ym_isad=1; _cl_notification=ca20bb5c2f69639ad47faf119b0a9d1f; _gat=1; _ga_4GZ9YCR2VB=GS1.2.1698848396.4.1.1698848407.49.0.0",
        "Referer": "https://cyberleninka.ru/search?q=xss&page=1",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "referrer": "https://cyberleninka.ru/search?q=xss&page=1",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"mode\":\"articles\",\"q\":\"${this.#theme}\",\"size\":10,\"from\":0}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })
      .then(res => res.json())
      .then(data => {
        const countArt = data.found
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
            "cookie": "_ga=GA1.2.1373216610.1698813748; _gid=GA1.2.776421329.1698813748; _ym_uid=1698813748685163160; _ym_d=1698813748; _ym_isad=1; _cl_notification=ca20bb5c2f69639ad47faf119b0a9d1f; _gat=1; _ga_4GZ9YCR2VB=GS1.2.1698848396.4.1.1698848407.49.0.0",
            "Referer": "https://cyberleninka.ru/search?q=xss&page=1",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          "referrer": "https://cyberleninka.ru/search?q=xss&page=1",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `{\"mode\":\"articles\",\"q\":\"${this.#theme}\",\"size\":${countArt},\"from\":0}`,
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        })
          .then(res => res.json())
          .then(data => {
            let keyWordsHTML = [];
            let links = [];
            data.articles.forEach((item) => {
              links.push(`https://cyberleninka.ru${item['link']}`)
            })


            links.forEach((item) => {
              fetch(item, {
                "headers": {
                  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                  "accept-language": "ru,en;q=0.9",
                  "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"YaBrowser\";v=\"23\"",
                  "sec-ch-ua-mobile": "?1",
                  "sec-ch-ua-platform": "\"Android\"",
                  "sec-fetch-dest": "document",
                  "sec-fetch-mode": "navigate",
                  "sec-fetch-site": "same-origin",
                  "sec-fetch-user": "?1",
                  "upgrade-insecure-requests": "1"
                },
                "referrer": "https://cyberleninka.ru/search?q=XSS&page=1",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
              }).then(res => res.text()).then(data => {
                keyWordsHTML.push(data)
              })
            })

            setTimeout(() => {
              console.log(keyWordsHTML)
              if (data.articles) {
                data.keyWordsHTML = keyWordsHTML
                let test = JSON.stringify(data)
                res.send(test)
                fs.writeFile('articles.json', test, (err) => {
                  if (err) {
                    console.error(err)
                  }
                })
              }
            }, 3000)


          })
      })
  }
}