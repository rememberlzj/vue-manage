import Cookie from "js-cookie"

export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path:'/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu:[]
    },
    mutations: {
        //改变isCollapse的Boolean值
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //改变上面tabsList的数据，实现跳转
        selectMenu(state,val) {
            //判断点击的是否是首页，如果不是，就将该页面的item加入到tabsList中
            if(val.name !== 'home'){
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }
                //如果是,就返回null
            }else {
                state.currentMenu = null
            }
        },
        //在删除tag标签的同时，刷新上方面包屑功能区域模块
        closeTag(state,val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },

        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },

        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return 
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });

            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}