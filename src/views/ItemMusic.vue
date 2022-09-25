<template>
    <div>
        <item-music-top :playList="state.playList"></item-music-top>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getMusicList } from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
export default {
    components: {
        ItemMusicTop,
    },
    setup() {
        const state = reactive({
            playList: {},
        })
        onMounted(async () => {
            const id = useRoute().query.id
            const res = await getMusicList(id)
            state.playList = res.data.playlist
            // console.log(res)

            //防止页面刷新，数据丢失，将数据保存到sessionStorge中
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })

        return { state }
    },
}
</script>
