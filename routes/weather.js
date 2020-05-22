const router = require('express').Router()

const WeatherService = require('../service/weatherService')
const service = new WeatherService()

router.post('/weather', async (req,res,next) => {
    const {cityName} = req.body
    res.json(await service.getData(cityName))
})

const {doGet} = require('../lib/http-helper')
const mapData = require('../lib/mapData.json')
const fs = require('fs')
const path = require('path')
router.get('/getMapData', async (req,res,next) => {
    let i = 0
    for await (const mapItem of mapData) {
        console.log('\n')
        console.log(`${i}/${mapData.length}`, `剩余：${mapData.length - i}`)
        if (
            mapItem.name !== '市辖区' 
            && mapItem.name !== '市辖县' 
            && mapItem.name !== '省直辖县级行政区划' 
            && mapItem.name !== '中沙群岛的岛礁及其海域' 
            && mapItem.name !== '自治区直辖县级行政区划' ) {
                const text = (await doGet(`https://restapi.amap.com/v3/geocode/geo?address=${encodeURI(mapItem.name)}&key=00d43aade7053e2490bd7389890f4372`)).text
                if (!text) continue
                console.log('请求成功：' + mapItem.name)
                const data = JSON.parse(text)
                if (data.geocodes.length) {
                    console.log(mapItem.name, data.geocodes[0].location)
                    const positionData = data.geocodes[0].location.split(',')
                    mapItem.longitude = positionData[0]
                    mapItem.latitude = positionData[1]
                }
            }
        i ++
    }
    let fd = fs.openSync(path.resolve(__dirname, '../lib/mapData.json'),'w');
    fs.writeFileSync(
        fd,
        JSON.stringify(mapData)
    )
    fs.closeSync(fd)
    console.log('End....')
    res.json(mapData)
})

exports = module.exports = router