import { ApiFactory, getToken, setToken, SegmaStrategy, initBuilder, QingtuiStrategy } from '@segma/api-tools';
import Vue from 'vue';

const authMap = {
    segma: SegmaStrategy,
    qingtui: QingtuiStrategy,
};
export const AuthStrategy = authMap[process.env.VUE_APP_AUTH_TYPE] || {
    onUnauthorized: () => {},
    onAuth: () => {},
};
export const $axios = ApiFactory({
    tip: (_message, _code, result) => {
        const title = result.message;
        const KEY_MAP = {
            code: '错误码',
            traceId: '追踪ID',
            possibleReason: '可能原因',
            suggestMeasure: '建议措施',
        };
        let msgString = Object.keys(KEY_MAP).reduce((accumulator, currentValue) => {
            let key = KEY_MAP[currentValue];
            let val = result[currentValue];
            return val ? `${accumulator} <p title=${val}>${key}：${val}</p>` : accumulator;
        }, '');
        let titleMessage = title ? `<p class="el-message__title" title=${title}>${title}</p>` : '';
        let message = titleMessage + msgString;
        (Vue.prototype.$message || console.warn)({
            iconClass: 'el-icon-warning-outline icon-orange',
            customClass: 'el-message',
            dangerouslyUseHTMLString: true,
            message: message,
            showClose: true,
        });
    },
    axiosConfig: {
        baseURL: process.env.VUE_APP_BASE_API,
    },
    auth: AuthStrategy,
});

const buildApi = initBuilder({
    axios: $axios,
    log: () => {},
});

export { getToken, setToken, buildApi };

export default $axios;
