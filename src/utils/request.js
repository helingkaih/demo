import axios from 'axios';
import { Base64 } from "js-base64";
axios.defaults.withCredentials = true;
/**
 * 请求方法
 * @param {*} fun 方法名称
 * @param {*} params 参数
 * @param {*} type 方法类型
 * @param {*} url fun 是否是个url
 * @param {*} withoutCookies 不需要 cookies
 * @returns 
 */

const req = function (fun, params, type) {
    // http://helingkai.com/api/
    // http://127.0.0.1:3000/
    return new Promise((resolve, reject) => {
        axios.request({
            url: 'http://helingkai.com/api/demo' + fun,
            method: type,
            data: Base64.encode(JSON.stringify(params)),
            timeout: 1000 * 60
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    });
}
export default req