// api-tools文档：http://npm.segma.tech/-/web/detail/@segma/api-tools
import { ApiFactory, getToken, setToken, SegmaStrategy, initBuilder, QingtuiStrategy } from '@segma/api-tools';
import Vue from 'vue';

const authMap = {
    'segma': SegmaStrategy,
    'qingtui': QingtuiStrategy,
};
export const AuthStrategy = authMap[process.env.VUE_APP_AUTH_TYPE];
export const $axios = ApiFactory({
    tip: (message, code) => {
        (Vue.prototype.$message.error || console.log)(message, code);
    },
    axiosConfig: {
        baseURL: process.env.VUE_APP_BASE_API,
    },
    auth: AuthStrategy,
});

const buildApi = initBuilder({
    axios: $axios,
    log: () => {
    },
});

const map = new Map();
export const getProject = () => map.get('project');
export const setProject = value => map.set('project', value);

export const log = process.env.NODE_ENV === 'development' ? console.log : () => {
};

export { getToken, setToken, buildApi };

export default $axios;
