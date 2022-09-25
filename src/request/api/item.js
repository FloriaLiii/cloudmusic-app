import service from '..'
//获取歌单数据
export function getMusicList(id) {
    return service({
        method: 'get',
        url: `/playlist/detail?id=${id}`,
    })
}
