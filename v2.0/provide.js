
async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    let userName=dom.getElementsByClassName("user-info")[0].lastChild.data.replace(/\s*/g,"");
    await loadTool('AIScheduleTools')
    // 模拟Alert
    await AIScheduleAlert({
        titleText:"Hi" , // 标题内容，字体比较大，不传默认为提示
        contentText: `您好，${userName}同学😊

        请务必在左侧菜单栏切换到 “选课管理>>本学期课表>>本学期课表” 页面再进行导入

        有任何问题请联系：
        QQ: 2592030861 
        Email: fintinger@163.com 
        Wechat: Archai233
        
        `, // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试
        confirmText: '收到', // 确认按钮文字，可不传默认为确认
    })

    const couseTable = dom.getElementById("tab202107278153").innerHTML;
    frameContent = couseTable;
    return frameContent;
}