import axios from 'axios'
//获取首页轮播图数据
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})

export default service
