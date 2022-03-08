import Cookie from 'js-cookie'

export default {
    state: {
        token: ''
    },
    mutations: {
        //建立token
        setToken(state ,val){
            state.token = val
            Cookie.set('token',val)
        },
        //清楚已有的token
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        //获取到建立的token
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }
    }
}