const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const parser = require('./parser')



const app = express();

// Используем body-parser middleware для обработки данных POST-запросов
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Обработчик POST-запроса
app.get('/', (req, res) => {
  const URL = path.join(__dirname, 'index.html')
  res.sendFile(URL)
})

app.post('/', (req, res) => {
  const postData = req.body;

  console.log(postData);

  let parse = new parser(postData.theme).getArticles(res)


});


http.createServer(app).listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});