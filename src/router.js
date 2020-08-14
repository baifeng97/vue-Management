import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './pages/Login'
import {checktoken} from '@/api/api'


Vue.use(VueRouter)
var router = new VueRouter({
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/mian',
            name: 'Mian',
            component: () => import('./pages/Mian'),
            children: [{
                    path: '/main/index',
                    name: '/main/index',
                    component: () => import('./pages/mian/Index'),
                    meta:{headlist:['首页']}
                },
                {
                    path: '/main/MyCenter',
                    name: '/main/MyCenter',
                    component: () => import('./pages/mian/MyCenter'),
                    meta:{headlist:['账号管理','个人中心']}
                },
                {
                    path: '/main/OrderStats',
                    name: '/main/OrderStats',
                    component: () => import('./pages/mian/OrderStats'),
                    meta:{headlist:['销售统计','订单统计']}
                },
                {
                    path: '/main/Classify',
                    name: '/main/Classify',
                    component: () => import('./pages/mian/Classify'),
                    meta:{headlist:['商品管理','商品分类']}
                },
                {
                    path: '/main/List',
                    name: '/main/List',
                    component: () => import('./pages/mian/List'),
                    meta:{headlist:['商品管理','商品列表']}
                },
                {
                    path: '/main/CommodityStat',
                    name: '/main/CommodityStat',
                    component: () => import('./pages/mian/CommodityStat'),
                    meta:{headlist:['销售统计','商品统计']}
                },
                {
                    path: '/main/Append',
                    name: '/main/Append',
                    component: () => import('./pages/mian/Append'),
                    meta:{headlist:['账号管理','添加账号']}
                },
                {
                    path: '/main/ChangePwd',
                    name: '/main/ChangePwd',
                    component: () => import('./pages/mian/ChangePwd'),
                    meta:{headlist:['账号管理','修改密码']}
                },
                {
                    path: '/main/AccountList',
                    name: '/main/AccountList',
                    component: () => import('./pages/mian/AccountList'),
                    meta:{headlist:['账号管理','账号列表']}
                },
                {
                    path: '/main/Merchandise',
                    name: '/main/Merchandise',
                    component: () => import('./pages/mian/Merchandise'),
                    meta:{headlist:['商品管理','商品添加']}
                },
                {
                    path: '/main/OrderMg',
                    name: '/main/OrderMg',
                    component: () => import('./pages/mian/OrderMg'),
                    meta:{headlist:['订单管理']}
                },
                {
                    path: '/main/ShopMg',
                    name: '/main/ShopMg',
                    component: () => import('./pages/mian/ShopMg'),
                    meta:{headlist:['店铺管理']}
                },

            ]
        }
    ]
})

router.beforeEach((to,form,next) => {
    

    if (to.path != '/') {
        checktoken(localStorage.token).then(res => {
            if (res.data.code == 0) {
                next()
            } 
            else {
                next('/')
            }
            
        });

    } else {
        next()
    }
    
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router