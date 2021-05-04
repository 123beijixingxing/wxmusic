/*
 * @Author: liuchengzhi
 * github: https://github.com/123beijixingxing
 * qq/email: 2964271341
 * @Begin: 2020-12-01 10:00:35
 * @Update: 2020-12-10 19:36:02
 * @Update log: 更新日志
*/
/*
 *微信小程序，wx.showToast(Object object)，显示消息提示框方法封装
*/
const WxShowToast = (title, icon, image, duration, mask, success, fail, complete) => {
    // console.log("提示弹窗:", title, icon, image, duration, mask, success, fail, complete);
    wx.showToast({
        title: title,
        icon: icon,
        image: image,
        duration: duration ? duration : 1500,
        mask: mask ? mask : false,
        success: success ? success : undefined,
        fail: fail ? fail : undefined,
        complete: complete ? complete : undefined,
    })
}

const WxHideToast = (title, icon, image, duration, mask, success, fail, complete) => {
    // console.log("提示弹窗:", title, icon, image, duration, mask, success, fail, complete);
    wx.hideToast({
        success: success ? success : undefined,
        fail: fail ? fail : undefined,
        complete: complete ? complete : undefined,
    })
}

// 通用提示传参处理函数
const commonShowData = (options) => {
    const title = options.title ? options.title : ""; // 提示的内容
    // 图标，默认值"success"--显示成功图标，此时 title 文本最多显示 7 个汉字长度
    // "loading"--显示加载图标，此时 title 文本最多显示 7 个汉字长度
    // "none"--不显示图标，此时 title 文本最多可显示两行，1.9.0及以上版本支持
    const icon = options.icon ? options.icon : "none";
    const image = options.image ? options.image : undefined; // 自定义图标的本地路径，image 的优先级高于 icon
    const duration = options.duration ? options.duration : 1500; // 提示的延迟时间，默认值1500
    const mask = options.mask ? options.mask : false; // 是否显示透明蒙层，防止触摸穿透，默认值false
    const success = options.success ? options.success : undefined; // 接口调用成功的回调函数
    const fail = options.fail ? options.fail : undefined; // 接口调用失败的回调函数
    const complete = options.complete ? options.complete : undefined; // 接口调用结束的回调函数（调用成功、失败都会执行）
    return WxShowToast(title, icon, image, duration, mask, success, fail, complete);
}

// 通用隐藏传参处理函数
const commonHideData = (options) => {
    const success = options.success ? options.success : undefined; // 接口调用成功的回调函数
    const fail = options.fail ? options.fail : undefined; // 接口调用失败的回调函数
    const complete = options.complete ? options.complete : undefined; // 接口调用结束的回调函数（调用成功、失败都会执行）
    return WxHideToast(success, fail, complete);
}


// 显示消息提示框
const ShowToast= (options = {}) => {
    console.log("显示提示弹窗:", options);
    return commonShowData(options);
    // return WxHideToast(title, icon, image, duration, mask, success, fail, complete);
}

// 隐藏消息提示框
const HideToast= (options = {}) => {
    console.log("隐藏提示弹窗:", options);
    return commonHideData(options);
    // return WxHideToast(success, fail, complete);
}


module.exports = {
    ShowToast,
    HideToast,
}