/*
 * @Author: liuchengzhi
 * github: https://github.com/123beijixingxing
 * qq/email: 2964271341
 * @Begin: 2020-12-01 10:00:35
 * @Update: 2020-12-08 19:36:02
 * @Update log: 更新日志
*/
/*
 *微信小程序，wx.request发起 HTTPS 网络请求，完整的异步方法封装
*/
/*
 *使用方法，在对应组件页面的js文件下，引入api路径，
 *例如在index.js文件里引入const fetch = require("../../utils/request/request.js"); // 引入请求api
 *Promise，接口调用api时，要用 .then() .catch()接收或者 async await 来修饰即可，只是承接数据，并非最外层异步函数等待操作
 *异步阻塞（Promise、resolve，await，then）
 *https://blog.csdn.net/weixin_42575806/article/details/82849301
 *await fetch.Get({
 *       host: 'http://music.eleuu.com/'
 *       url: "top/playlist",
 *       method: 'GET',
 *       token: "123456happy",
 *       data: {
 *          limit: that.data.playlist.limit,
 *          offset: that.data.playlist.offset,
 *          type: that.data.catelist.checked.name
 *       }
 *   });
*/
const env = require('../../utils/request/dev.env.js'); // 引入的环境变量
const commonUrl = require('../../utils/musicurl/musicurl.js'); // 引入的接口域名
const async = require("../../utils/async/async.js"); // 引入异步同步请求封装，https://github.com/caolan/async
const notification = require("../../utils/notification/notification.js"); // 引入通知广播，https://github.com/icindy/WxNotificationCenter

var app = getApp(); // 获取到小程序全局唯一的 App 实例

// 请求方式
const OPTIONS = 'OPTIONS';
const HEAD = 'HEAD';
const TRACE = 'TRACE';
const CONNECT = 'CONNECT';
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FROM = 'FROM';
const DELETE = 'DELETE';

// 编译打包环境
const testdev = 'test';
const betadev = 'beta';
const proddev = 'production';

// 接口域名，一般beta和线上url都是有一个固定前缀(域名)，只是后面不同，本地调试可以根据情况改变
// 本地线下，本地数据库，本地数据库接口调试
const testHOST = 'http://music.eleuu.com/'
// beta环境，同步线上所有模拟数据
const betaHOST = 'https://test-gato.com/';
// production，线上正式投放使用
const prodHOST = 'https://www.gato.com/';
console.log('请求url环境:', env);

const baseHOST = env.NODE_ENV === testdev ? testHOST : (env === betadev ? betaHOST : prodHOST); // 三元表达式（多条件）简洁判断赋值

// 请求头
const getheader = "'content-type': 'application/json'";
const postheader = "'Cache-Control': 'no-cache','Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'";

// Token或者cookies，封装进接口
// 需要与后端定义好，哪些请求类型的接口需要
// 也可以支持传参自定义传值
var cookie = wx.getStorageSync('cookie') || ''; // 数据缓存中获取cookies
var gb = wx.getStorageSync("globalData"); // 数据缓存中获取globalData
gb && (app.globalData = gb);
app.globalData.cookie = cookie;


// wx.request(Object object)，发起 HTTPS 网络请求
const request = (host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache) => {
    // 异步阻塞（Promise、resolve，await，then）
    // https://blog.csdn.net/weixin_42575806/article/details/82849301
    // Promise，接口调用api时，要用 .then() .catch()接收或者 async await 来修饰即可，只是承接数据，并非最外层异步函数等待操作
    return new Promise((resolve, reject) => {
        wx.request({
            // url: `${app.globalData.host}${url}`,
            url: `${host}${url}`, // 接口，通用域名加接口字段，拼装的接口地址
            method: method, // HTTP 请求方法类型
            data: method === 'GET' ? data : JSON.stringify(data), // 请求的参数，包含有（string/object/ArrayBuffer）各种类型
            params: params, // 额外参数
            header: { // 请求头设置，设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
                header,
                'wx-token': token  // 看自己是否需要Token或者cookies
            },
            timeout: timeout, // 超时时间，单位为毫秒，默认超时时间，单位为5000毫秒
            dataType: dataType, // json--返回的数据为JSON，返回后会对返回的数据进行一次JSON.parse，其他--不对返回的内容进行JSON.parse
            responseType: responseType, // text--响应的数据为文本，arraybuffer	响应的数据为 ArrayBuffer
            enableCache: enableCache, // 开启请求页cache缓存，默认值false
            success(request) { // 接口调用成功的回调函数
                if (request.data.code === 200) {
                    // resolve(request.data); // 封装返回，接口请求状态码部分，完整数据
                    resolve(request); // 封装返回，object.success 回调函数，完整数据
                } else {
                    // resolve(request.data); // 封装返回，接口请求状态码部分，完整数据
                    resolve(request); // 封装返回，object.success 回调函数，完整数据
                }
            },
            complete(request) { // 接口调用失败的回调函数
                // resolve(request.data); // 封装返回，接口请求状态码部分，完整数据
                resolve(request); // 封装返回，object.success 回调函数，完整数据
            },
            fail(error) { // 接口调用结束的回调函数（调用成功、失败都会执行）
                // resolve(request.data); // 封装返回，接口请求状态码部分，完整数据
                resolve(request); // 封装返回，object.success 回调函数，完整数据
            }
        })
    })
}

// 通用api处理函数
const commonData = (options) => {
    const host = options.host ? options.host : baseHOST;
    const url = options.url ? options.url : undefined;
    const method = options.method ? options.method : 'GET';
    const data = options.data ? options.data : undefined;
    const params = options.params ? options.params : undefined;
    const token = options.token ? options.token : undefined;
    const header = options.header ? (options.header === 'GET' ? getheader : postheader) :  getheader;
    const timeout = options.timeout ? (options.timeout < 10000 ? options.timeout : 5000) : 5000; // 默认超时时间，单位为5000毫秒
    const dataType = options.dataType ? options.dataType : 'json'; // 返回的数据格式
    const responseType = options.responseType ? (options.responseType === 'arraybuffer' ? options.responseType : 'text') : 'text'; // 响应的数据格式，默认响应的数据为文本
    const enableCache = options.enableCache ? (options.enableCache === true ? options.enableCache : false) : false; // 开启请求页cache缓存，默认值false
    return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}
// OPTIONS请求
const Options = (options = {}) => {
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// HEAD请求
const Head = (options = {}) => {
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// TRACE请求
const Trace = (options = {}) => {
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// CONNECT请求
const Connect = (options = {}) => {
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// GET请求
const Get = (options = {}) => {
    console.log("请求api:", options);
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// POST请求
const Post = (options = {}) => {
    console.log("请求api:", options);
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// PUT请求
const Put = (options = {}) => {
    console.log("请求api:", options);
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// FROM请求
const From = (options = {}) => {
    console.log("请求api:", options);
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

// DELETE请求，不能声明DELETE（关键字）
const Delete = (options = {}) => {
    console.log("请求api:", options);
    return commonData(options);
    // return request(host, url, method, data, params, token, header, timeout, dataType, responseType, enableCache);
}

module.exports = {
    Options,
    Head,
    Trace,
    Connect,
    Get,
    Post,
    Put,
    From,
    Delete
}