const express = require('express')
const app = express()
const compress = require('compression')
const port = 3000
const routeWeather = require('./routes/weather')

app.use(compress())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

/*
  跨域配置：响应头允许跨域
*/
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    if(req.method=="OPTIONS") res.sendStatus(200);
    else next();
})

app.use('/proxy-api', routeWeather)

app.get('/proxy-api', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`运行端口为 ${port}!`))