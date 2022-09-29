import service from '../index'

//获取轮播图
export function getBanner() {
    return service({
        method: 'get',
        url: '/banner?type=2',
    })
}

//获取歌单
export function getMusicList() {
    return service({
        method: 'get',
        url: '/personalized?limit=10',
    })
}

//获取搜索信息
export function getSearchMusic(keywords) {
    return service({
        method: 'get',
        url: `/search?keywords=${keywords}`,
    })
}
