const {doGet} = require('../lib/http-helper')
const xml2json = require('xml-js')
const mapData = require('../lib/mapData.json')

const mapKeyData = {}
mapData.forEach((item) => {
	mapKeyData[item.name] = item
})

const areaNameMap = {
    '杜蒙': '杜尔伯特蒙古族自治县',
    '呼兰县': '呼兰区',
    '阿城市': '阿城区',
    '喀左': '喀喇沁左翼蒙古族自治县',
    '阜新县': '阜新蒙古族自治县',
    '岫岩县': '岫岩满族自治县',
    '清原县': '清原满族自治县',
    '新宾县': '新宾满族自治县',
    '桓仁县': '桓仁满族自治县',
    '本溪县': '本溪满族自治县',
    '宽甸县': '宽甸满族自治县',
    '阿右旗': '阿拉善右旗',
    '阿左旗': '阿拉善左旗',
    '乌中旗': '乌拉特中旗',
    '乌前旗': '乌拉特前旗',
    '乌后旗': '乌拉特后旗',
    '鄂前旗': '鄂托克前旗',
    '达茂旗': '达尔罕茂明安联合旗',
    '白云鄂博': '白云鄂博矿区',
    '土右旗': '土默特右旗',
    '土左旗': '土默特左旗',
    '察右后旗': '察哈尔右翼后旗',
    '察右中旗': '察哈尔右翼中旗',
    '察右前旗': '察哈尔右翼前旗',
    '东乌旗': '东乌珠穆沁旗',
    '西乌旗': '西乌珠穆沁旗',
    '苏左旗': '苏尼特左旗',
    '苏右旗': '苏尼特右旗',
    '阿鲁旗': '阿鲁科尔沁旗',
    '克什旗': '克什克腾旗',
    '科左中旗': '科尔沁左翼中旗',
    '科左后旗': '科尔沁左翼后旗',
    '科右前旗': '科尔沁右翼前旗',
    '科右中旗': '科尔沁右翼中旗',
    '鄂伦春旗': '鄂伦春自治旗',
    '莫力达瓦': '莫力达瓦达斡尔族自治旗',
    '鄂温克旗': '鄂温克族自治旗',
    '新左旗': '新巴尔虎左旗',
    '新右旗': '新巴尔虎右旗',
    '和布克赛尔': '和布克赛尔蒙古自治县',
    '察布查尔': '察布查尔锡伯自治县',
    '米泉市': '米东区',
    '木垒县': '木垒哈萨克自治县',
    '巴里坤县': '巴里坤哈萨克自治县',
    '塔什库尔干': '塔什库尔干塔吉克自治县',
    '焉耆县': '焉耆回族自治县',
    '楠木林县': '南木林县',
    '札囊县': '西藏自治区山南市扎囊县',
    '冷湖': '冷湖行政区',
    '玉树县': '玉树藏族自治州',
    '门源县': '门源回族自治县',
    '大通县': '大通回族土族自治县',
    '互助县': '互助土族自治县',
    '乐都县': '乐都区',
    '化隆县': '化隆回族自治县',
    '民和县': '民和回族土族自治县',
    '循化县': '循化撒拉族自治县',
    '河南县': '河南蒙古族自治县',
    '肃北县': '肃北蒙古族自治县',
    '阿克塞': '阿克塞哈萨克族自治县',
    '肃南县': '肃南裕固族自治县',
    '天祝县': '天祝藏族自治县',
    '积石山县': '积石山保安族东乡族撒拉族自治县',
    '张家川县': '张家川回族自治县',
    '青龙县': '青龙满族自治县',
    '大厂县': '大厂回族自治县',
    '孟村县': '孟村回族自治县',
    '安平市': '安平县',
    '望城县': '望城区',
    '麻阳县': '麻阳苗族自治县',
    '芷江县': '芷江侗族自治县',
    '新晃县': '新晃侗族自治县',
    '靖州县': '靖州苗族侗族自治县',
    '通道县': '通道侗族自治县',
    '城步县': '城步苗族自治县',
    '江华县': '江华瑶族自治县',
    '离石市': '离石区',
    '名山县': '名山区',
    '木里县': '木里藏族自治县',
    '北川县': '北川羌族自治县',
    '峨边县': '峨边彝族自治县隶',
    '马边县': '马边彝族自治县',
    '南溪县': '南溪区',
    '维西县': '维西傈僳族自治县',
    '贡山县': '贡山独龙族怒族自治县',
    '兰坪县': '兰坪白族普米族自治县',
    '宁蒗县': '宁蒗彝族自治县',
    '玉龙县': '玉龙纳西族自治县',
    '漾濞县': '漾濞彝族自治县',
    '巍山县': '巍山彝族回族自治县',
    '南涧县': '南涧彝族自治县',
    '耿马县': '耿马傣族佤族自治县',
    '双江县': '双江拉祜族佤族布朗族傣族自治县',
    '沧源县': '沧源佤族自治县',
    '景东县': '景东彝族自治县',
    '镇沅县': '镇沅彝族哈尼族拉祜族自治县',
    '景谷县': '景谷傣族彝族自治县',
    '墨江县': '墨江哈尼族自治县',
    '宁洱县': '宁洱哈尼族彝族自治县',
    '西盟县': '西盟佤族自治县',
    '澜沧县': '澜沧拉祜族自治县',
    '孟连县': '孟连傣族拉祜族佤族自治县',
    '江城县': '江城哈尼族彝族自治县',
    '禄劝县': '禄劝彝族苗族自治县',
    '寻甸县': '寻甸回族彝族自治县',
    '安宁县': '安宁市',
    '呈贡县': '呈贡区',
    '石林县': '石林彝族自治县',
    '弥勒县': '弥勒市',
    '金平县': '金平苗族瑶族傣族自治县',
    '蒙自县': '蒙自市',
    '屏边县': '屏边苗族自治县',
    '河口县': '河口瑶族自治县',
    '文山县': '文山市',
    '道真县': '道真仡佬族苗族自治县',
    '务川县': '务川仡佬族苗族自治县',
    '沿河县': '沿河土家族自治县',
    '印江县': '印江土家族苗族自治县',
    '松桃县': '松桃苗族自治县',
    '万山特': '万山区',
    '玉屏县': '玉屏侗族自治县',
    '威宁县': '威宁彝族回族苗族自治县',
    '关岭县': '关岭布依族苗族自治县',
    '镇宁县': '镇宁布依族苗族自治县',
    '紫云县': '紫云苗族布依族自治县',
    '三都县': '三都水族自治县',
    '连山县': '连山壮族瑶族自治县',
    '连南县': '连南瑶族自治县',
    '三水市': '三水区',
    '南海市': '南海区',
    '顺德市': '顺德区',
    '高明市': '高明区',
    '乳源县': '乳源瑶族自治县',
    '揭东县': '揭东区',
    '潮安县': '潮安区',
    '隆林县': '隆林各族自治县',
    '环江县': '环江毛南族自治县',
    '罗城县': '罗城仫佬族自治县',
    '巴马县': '巴马瑶族自治县',
    '大化县': '大化瑶族自治县',
    '都安县': '都安瑶族自治县',
    '融水县': '融水苗族自治县',
    '三江县': '三江侗族自治县',
    '龙胜县': '龙胜各族自治县',
    '临桂县': '临桂区',
    '恭城县': '恭城瑶族自治县',
    '邕宁县': '邕宁区',
    '金秀县': '金秀瑶族自治县',
    '富川县': '富川瑶族自治县',
    '石柱': '石柱土家族自治县',
    '彭水': '彭水苗族土家族自治县',
    '酉阳': '酉阳土家族苗族自治县',
    '秀山': '秀山土家族苗族自治县',
    '香港岛': '香港特别行政区',
    '澳门': '澳门特别行政区',
    '伊通县': '伊通满族自治县',
    '长白县': '长白朝鲜族自治县',
    '江源县': '江源区',
    '札囊县': '札达县',
    '围场县': '围场满族蒙古族自治县',
    '丰宁县': '丰宁满族自治县',
    '宽城县': '宽城满族自治县',
    '曹妃甸': '曹妃甸工业区',
    '长阳县': '长阳土家族自治县',
    '五峰县': '五峰土家族自治县',
    '宿豫县': '宿豫区',
    '盐都县': '盐都区',
    '江都市': '江都区',
    '姜堰市': '姜堰区',
    '通州市': '通州区',
    '武进市': '武进区',
    '吴江市': '吴江区',
    '安州': '安县',
    '峨边县': '峨边彝族自治县',
    '南溪县': '南溪区',
    '峨山县': '峨山彝族自治县',
    '新平县': '新平彝族傣族自治县',
    '元江县': '元江哈尼族彝族傣族自治县',
    '景宁县': '景宁畲族自治县',
    '惠阳市': '惠阳区',
    '扶余县': '扶余市',
    '前郭县': '前郭尔罗斯蒙古族自治县',
}

class WeatherService {
    async getData (cityName) {
        try {
            let result = null
            if (cityName) {
                const subArea = await this.getWeather(cityName)
                result = {
                    name: cityName,
                    subArea: subArea
                }
            } else {
                const subArea = await this.getWeather('china')
                for await (const item of subArea) {
                    item.subArea = await this.getWeather(item.pyName)
                    if (item.quName !== item.cityname) {
                        for await (const j of item.subArea) {
                            j.subArea = await this.getWeather(j.pyName)
                        }
                    }
                }
                result = {
                    name: 'china',
                    subArea
                }
            }
            return {
                type: 0,
                data: result
            }
        } catch {
            return {
                type: -1,
                data: null
            }
        }
    }
    async getWeather (cityName) {
        try {
            const subXMLData = (await doGet(`http://flash.weather.com.cn/wmaps/xml/${cityName}.xml`)).text
            const subJsonData = JSON.parse(xml2json.xml2json(subXMLData, {compact: false, spaces: 0}))
            return subJsonData.elements[0].elements.map(item => {
                const result = {
                    type: item.name,
                    ...item.attributes,
                }
                if (result.cityname === '南沙') {
                    result.cityname = '南沙群岛'
                }
                let mapItem = mapKeyData[result.cityname]
                if (!mapItem) mapItem = mapKeyData[result.cityname + '市']
                if (!mapItem) mapItem = mapKeyData[result.cityname + '区']
                if (!mapItem) mapItem = mapKeyData[result.cityname + '县']
                if (!mapItem) mapItem = mapKeyData[result.cityname + '旗']
                if (!mapItem) mapItem = mapKeyData[areaNameMap[result.cityname]]
                if (mapItem) {
                    result.latitude = parseFloat(mapItem.latitude)
                    result.longitude = parseFloat(mapItem.longitude)
                }
                return result
            })
        } catch {
            return []
        }
    }
}

exports = module.exports = WeatherService