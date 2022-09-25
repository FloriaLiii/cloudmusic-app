function remSize() {
    //获取设备宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth

    deviceWidth = deviceWidth >= 750 ? 750 : deviceWidth
    deviceWidth = deviceWidth <= 320 ? 320 : deviceWidth

    //750px ==> 1rem = 100px
    document.documentElement.style.fontSize = deviceWidth / 7.5 + "px"
    //设置字体大小
    document.querySelector("body").style.fontSize = 0.3 + "rem"
}

remSize()

//当窗口侦测到变化时，重新适配
window.onresize = function () {
    remSize()
}
