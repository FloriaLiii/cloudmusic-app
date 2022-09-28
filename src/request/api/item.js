import service from '..'
//获取歌单数据
export function getMusicList(id) {
    return service({
        method: 'get',
        url: `/playlist/detail?id=${id}`,
    })
}

//获取歌单歌曲
export function getSongs(id) {
    return service({
        method: 'get',
        url: `/playlist/detail?id=${id}`,
    })
}

//获取歌词
export function getMusicLyric(id) {
    return service({
        method: 'get',
        url: `/lyric?id=${id}`,
    })
}
