const superagent = require('superagent');
const userAgents = require('./userAgent')

async function doGet (url, cookies = null) {
    let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
    try {
        return await superagent
        .get(url)
        .set({
            'User-Agent': userAgent,
            'Referer': url,
            'Connection': 'keep-alive',
            'Cookie': cookies
        })
    } catch (e) {
        return Promise.reject(e)
    }
}

exports = module.exports = {
    doGet
}