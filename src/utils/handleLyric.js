export function handleLyric() {
    let arr
    if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
            let min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
            let sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
            let mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
            let lrc = item.slice(item.indexOf(']') + 1, item.length).trim()
            let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
            return { min, sec, mill, lrc, time }
        })
        arr.forEach((item, i) => {
            if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                item.after = 10000000000
            } else {
                item.after = arr[i + 1].time
            }
        })
    }
    // console.log(arr)
    return arr
}
