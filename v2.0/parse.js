 function scheduleHtmlParser(html) {
    let trs = $(html).find("tbody>tr");
    let result = [];
    let tdTxt = [];
    trs.map((ind, el) => {
        tdTxt = []
        $(el).find("td").map((ind, e) => {
            if (e.firstChild.data) {//排除undefined
                tdTxt.push(e.firstChild.data.split(">>"))
            }
        })
        result.push(
            {
                name: tdTxt[1][0] + "(" + tdTxt[6][0] + ")", // 课程名称
                position: tdTxt[11].join(" "), // 上课地点
                teacher: tdTxt[7][0], // 教师名称
                weeks: transRange(tdTxt[10][0]), // 周数
                day: transChiToNum(tdTxt[10][1]), // 星期
                sections: transRange(tdTxt[10][2]), // 节次
            }
        )
    })
    /**
     *将中文星期转换为Number类型
     * @param {String} str
     * @return {Number} 
     */
    function transChiToNum(str) {
        return str == "星期日" && 7 || str == "星期六" && 6 || str == "星期五" && 5 || str == "星期四" && 4 || str == "星期三" && 3 || str == "星期二" && 2 || str == "星期一" && 1;
    }

    /**
     * 将范围匹配并转化为数组类型
     * @param {String}} str 
     * @returns 
     */
    function transRange(str) {
        let res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        let rangeReg = /^\d+-\d+/;
        if (rangeReg.test(str)) {
            res = [];
            let keyTex = rangeReg.exec(str);
            let range = keyTex[0].split("-");
            for (let i = +range[0]; i <= +range[1]; i++) {
                if (/单周/.test(str))
                    i % 2 != 0 && res.push(i);
                else if (/双周/.test(str))
                    i % 2 == 0 && res.push(i);
                else
                    res.push(i);
            }
        }
        return res;
    }

    return result;
}

