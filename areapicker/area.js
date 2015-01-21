/* global define */
/*
file:///Users/mo/Downloads/cities.txt
钻展 http://zuanshi.taobao.com/code/all.json?csrfID=142175445941304037227370851158592
淘宝 http://www.taobao.com/home/js/sys/districtselector.js?t=20140318.js
DMP http://dmp.taobao.com/api/tag/4?csrfId=61a1eec37e1398aaf3c6d8&t=1421758479250
国标 省（市）级行政区划码表

华北   北京市 天津市 河北省 山西省 内蒙古自治区
东北   辽宁省 吉林省 黑龙江省
华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
华南   广东省 广西壮族自治区 海南省
华中   河南省 湖北省 湖南省
西南   重庆市 四川省 贵州省 云南省 西藏自治区
西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
港澳台 香港特别行政区 澳门特别行政区 台湾省
 */
define(['underscore'], function(_) {

    var TIER = [
        { id: '一线', name: '一线' },
        { id: '二线', name: '二线' },
        { id: '三线', name: '三线' },

        { id: 110000, pid: '一线', name: '北京市' },
        { id: 120000, pid: '一线', name: '天津市' },

        { id: 130000, pid: '二线', name: '河北省' },
        { id: 140000, pid: '二线', name: '山西省' },

        { id: 150000, pid: '三线', name: '内蒙古自治区' },
        { id: 210000, pid: '三线', name: '辽宁省' },
    ]

    var REGION = [
        { id: '华北', name: '华北' },
        { id: '东北', name: '东北' },
        { id: '华东', name: '华东' },
        { id: '华南', name: '华南' },
        { id: '华中', name: '华中' },
        { id: '西南', name: '西南' },
        { id: '西北', name: '西北' },
        { id: '港澳台', name: '港澳台' },

        { id: 110000, pid: '华北', name: '北京市' },
        { id: 120000, pid: '华北', name: '天津市' },
        { id: 130000, pid: '华北', name: '河北省' },
        { id: 140000, pid: '华北', name: '山西省' },
        { id: 150000, pid: '华北', name: '内蒙古自治区' },

        { id: 210000, pid: '东北', name: '辽宁省' },
        { id: 220000, pid: '东北', name: '吉林省' },
        { id: 230000, pid: '东北', name: '黑龙江省' },

        { id: 310000, pid: '华东', name: '上海市' },
        { id: 320000, pid: '华东', name: '江苏省' },
        { id: 330000, pid: '华东', name: '浙江省' },
        { id: 340000, pid: '华东', name: '安徽省' },
        { id: 350000, pid: '华东', name: '福建省' },
        { id: 360000, pid: '华东', name: '江西省' },
        { id: 370000, pid: '华东', name: '山东省' },

        { id: 410000, pid: '华中', name: '河南省' },
        { id: 420000, pid: '华中', name: '湖北省' },
        { id: 430000, pid: '华中', name: '湖南省' },

        { id: 440000, pid: '华南', name: '广东省' },
        { id: 450000, pid: '华南', name: '广西壮族自治区' },
        { id: 460000, pid: '华南', name: '海南省' },

        { id: 500000, pid: '西南', name: '重庆市' },
        { id: 510000, pid: '西南', name: '四川省' },
        { id: 520000, pid: '西南', name: '贵州省' },
        { id: 530000, pid: '西南', name: '云南省' },
        { id: 540000, pid: '西南', name: '西藏自治区' },

        { id: 610000, pid: '西北', name: '陕西省' },
        { id: 620000, pid: '西北', name: '甘肃省' },
        { id: 630000, pid: '西北', name: '青海省' },
        { id: 640000, pid: '西北', name: '宁夏回族自治区' },
        { id: 650000, pid: '西北', name: '新疆维吾尔自治区' },

        { id: 710000, pid: '港澳台', name: '台湾省' },
        { id: 810000, pid: '港澳台', name: '香港特别行政区' },
        { id: 820000, pid: '港澳台', name: '澳门特别行政区'}
    ]

    var IPDATA = {}

    function tree(list) {
        var mapped = {}
        _.each(list, function(item /*, index*/ ) {
            mapped[item.id] = item
        })

        var result = []
        _.each(list, function(item /*, index*/ ) {
            if (item.pid === undefined) {
                result.push(item)
                return
            }
            var parent = mapped[item.pid]
            if (!parent.children) parent.children = []
            parent.children.push(item)
        })
        return result
    }

    return {
        REGION: REGION,
        TIER: TIER,
        IPDATA: IPDATA,
        tree: tree
    }
})