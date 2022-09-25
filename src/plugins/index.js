//统一管理第三方组件的引入注册
import { Button, Swipe, SwipeItem } from 'vant'

//放入数组中，挨个遍历用app.use()调用
let plugins = [Button, Swipe, SwipeItem]

export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}
