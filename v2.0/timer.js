 async function scheduleTimer({
    providerRes,
    parserRes
  } = {}) {
    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
      totalWeek: 20, // 总周数：[1, 30]之间的整数
      startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
      startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
      showWeekend: true, // 是否显示周末
      forenoon: 4, // 上午课程节数：[1, 10]之间的整数
      afternoon: 4, // 下午课程节数：[0, 10]之间的整数
      night: 2, // 晚间课程节数：[0, 10]之间的整数
      sections: [
        {
            "section": 1,
            "startTime": "08:30",
            "endTime": "09:15"
        },
        {
            "section": 2,
            "startTime": "09:20",
            "endTime": "10:05"
        },
        {
            "section": 3,
            "startTime": "10:25",
            "endTime": "11:10"
        },
        {
            "section": 4,
            "startTime": "11:15",
            "endTime": "12:00"
        },
        {
            "section": 5,
            "startTime": "13:30",
            "endTime": "14:15"
        },
        {
            "section": 6,
            "startTime": "14:20",
            "endTime": "15:05"
        },
        {
            "section": 7,
            "startTime": "15:25",
            "endTime": "16:10"
        },
        {
            "section": 8,
            "startTime": "16:15",
            "endTime": "17:00"
        },
        {
            "section": 9,
            "startTime": "17:30",
            "endTime": "18:15"
        },
        {
            "section": 10,
            "startTime": "18:20",
            "endTime": "19:05"
        }
    ]
    }
  }