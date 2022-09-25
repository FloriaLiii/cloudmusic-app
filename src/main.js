import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'
const app = createApp(App)
app.use(store)
app.use(router)

//传过去app实例对象，在plugins中逐个对vant组件注册
getVant(app)

app.mount('#app')
