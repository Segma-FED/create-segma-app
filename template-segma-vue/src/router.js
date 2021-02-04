import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL, // 部署在服务器子路径上时需要
    routes: [
        {
            path: '/',
            name: 'defaultLayout',
            component: () => import('./components/layout/Default.vue'),
            redirect: { name: 'HelloWorld' },
            children: [
                {
                    path: '/hello-world',
                    name: 'HelloWorld',
                    component: () => import('./views/HelloWorld.vue')
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: () => import('./views/404.vue')
        },
        {
            path: '*',
            name: 'all',
            redirect: '/404'
        }
    ]
});

// 在工业互联网平台中定义的菜单
const getMenuConfig = () => {
    try {
        return JSON.parse(process.env.VUE_APP_MENU_CONFIG);
    } catch (error) {
        return {};
    }
};

const redirectRoute = params => {
    const config = getMenuConfig()[params.name];
    if (window.parent !== window && config) {
        const route = router.resolve(params).route;
        const target = window.parent || window.opener;
        target.postMessage(
            {
                type: 'setIframeRouterManual',
                headerCode: config.head,
                leafCode: config.leaf,
                url: encodeURIComponent(`${location.origin}/#${route.fullPath}`)
            },
            '*'
        );
    } else {
        router.push(params);
    }
};

export { redirectRoute };
