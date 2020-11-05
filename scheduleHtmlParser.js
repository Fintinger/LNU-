function scheduleHtmlParser(html) {
    /**
     * v2.0
     * 返回的对象中添加teacher
     * 添加每节课时间sectionTimes数据
     * 优化代码结构以及注释，方便更新修改
     */

    /*方法*/
    /**
     * 解析weeks内容,传入'1-2','1-10-single','1-10-double'
     * @param{String}str
     * @returns{Array}{[]}
     */
    function getWeek(str) {
        let beArr = str.split("-"), res = [];
        for (let i = beArr[0] * 1; i <= beArr[1] * 1; i++) {
            if (beArr[2] === 'single') {
                i % 2 !== 0 && res.push(i)
            } else if (beArr[2] === 'double') {
                i % 2 === 0 && res.push(i)
            } else res.push(i)
        }
        return res
    }

    /**
     * 找到td子节点中的p，并获取其去&nbsp;后的内容
     * @returns {jQuery}
     */
    function getItsContent(td) {
        return $(td).find("p").text().replace("&nbsp;", '')
    }

    /*课程与教师名匹配关系获取*/
    let teTB = $(html).find("table").eq(4)
    let teTRs = teTB.find("tr")
    let relation = [], rel, relTxt
    teTRs.each((i, tr) => {
        //第一行是标题，不符合
        if (i === 0) return
        $(tr).find("td").each((i, td) => {
            //第一列是节次，不符合
            if (i === 0) return
            //去除()中说明，以及'蒲河/崇山校区通识课程'
            rel = getItsContent(td).replace(/(\([\s\S]+?\))+/g, '').replace(/(蒲河校区|崇山校区).+/g, '')
            //以换行符分割并去掉空白数组
            relTxt = rel.split(/\s/g).filter(v => v && v.trim())
            //并列课程/单课程遍历添加到 课程名-老师 关系数组中
            relTxt.map(v => relation.push(v))
        })
    })
    //去除空白但存在于td中的课程
    relation = relation.filter(s => s && s.trim())


    /*变量*/
    const timeArr = ['08:30-09:10', '09:20-10:00', '10:30-11:10', '11:20-12:00', '13:30-14:10', '14:20-15:00', '15:30-16:10', '16:30-17:00']
    let result = []
    let tb = $(html).find("table").eq(7)
    let trs = tb.find("tr")
    let lesson = {}

    /*遍历每个tr，得到需要的数据，存到lesson中，并最终push到result*/
    trs.each((i, tr) => {
        //第一个tr为表头，不需要
        if (i === 0) return
        //find找到td，排除br等
        $(tr).find("td").each((i, td) => {
            switch (i) {
                //每一个case对应每一列 列数-1
                case 0:
                    lesson.name = getItsContent(td)
                    //利用上面得到的 课程名-老师 关系匹配对应老师
                    let thisVal = relation.filter(val => {
                        return val.split("/")[0] === getItsContent(td).trim()
                    })
                    lesson.teacher = thisVal[0].split("/")[1]
                    break;
                case 6:
                    lesson.position = getItsContent(td)
                    break;
                case 7:
                    //表中上课时间分割，[0]为周,[1]为节
                    let wad = getItsContent(td).split("-");
                    /**
                     * 本节课开始的节次
                     * 表中按照1天四节课，这里需要转换为1天8节课
                     * 1=>1&2; 2=>3&4; 3=>5&6;4=>7&8
                     * @type {number}
                     */
                    let BeginSec = wad[1] * 2 - 1
                    lesson.day = wad[0]
                    lesson.sections = [
                        {
                            section: BeginSec,
                            startTime: timeArr[BeginSec - 1].split("-")[0],
                            endTime: timeArr[BeginSec - 1].split("-")[1],
                        }
                        ,
                        {
                            section: BeginSec + 1,
                            startTime: timeArr[BeginSec].split("-")[0],
                            endTime: timeArr[BeginSec].split("-")[1],
                        }
                    ]
                    break;
                case 8:
                    //这里的内容就4种形式,'全周上课','单周上课','双周上课','4-16周上'
                    let txt = getItsContent(td)
                    if (txt === '全周上课') lesson.weeks = getWeek("1-20")
                    else if (txt === '单周上课') lesson.weeks = getWeek("1-20-single")
                    else if (txt === '双周上课') lesson.weeks = getWeek("1-20-double")
                    else lesson.weeks = getWeek(txt.split("周")[0])
                    break;
                default:
                    break;
            }
        })
        result.push(lesson)
        lesson = {}
    })

    /*关于每节课信息*/
    let sectionTimes = [
        {
            "section": 1,
            "startTime": "08:30",
            "endTime": "09:10"
        },
        {
            "section": 2,
            "startTime": "09:20",
            "endTime": "10:00"
        },
        {
            "section": 3,
            "startTime": "10:30",
            "endTime": "11:10"
        },
        {
            "section": 4,
            "startTime": "11:20",
            "endTime": "12:00"
        },
        {
            "section": 5,
            "startTime": "13:30",
            "endTime": "14:10"
        },
        {
            "section": 6,
            "startTime": "14:20",
            "endTime": "15:00"
        },
        {
            "section": 7,
            "startTime": "15:10",
            "endTime": "16:10"
        },
        {
            "section": 8,
            "startTime": "16:20",
            "endTime": "17:00"
        }
    ]
    return {courseInfos: result, sectionTimes}
}