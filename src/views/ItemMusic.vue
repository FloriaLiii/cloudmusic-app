<template>
    <div>
        <item-music-top :playList="state.playList"></item-music-top>
        <item-music-list
            :songsList="state.songsList"
            :subscribedCount="state.playList.subscribedCount"
        ></item-music-list>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getMusicList, getSongs } from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/itemMusicList.vue'
export default {
    components: {
        ItemMusicTop,
        ItemMusicList,
    },
    setup() {
        const state = reactive({
            playList: {},
            songsList: [],
        })
        onMounted(async () => {
            const id = useRoute().query.id

            //获取歌单详情页
            const res = await getMusicList(id)
            state.playList = res.data.playlist

            //获取歌单中的歌曲
            const res2 = await getSongs(id)
            // console.log(res2)
            console.log(res2.data.playlist.tracks)
            state.songsList = res2.data.playlist.tracks

            //防止页面刷新，数据丢失，将数据保存到sessionStorge中
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })

        return { state }
    },
}
</script>
