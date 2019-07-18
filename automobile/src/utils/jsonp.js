function jsonp({ url, data, callback }) {
    //判断 callback 是否存在 
    //存在使用设置的  
    // 没有 使用"ck_"+new Date()*1  列如：ck_1563194074476  格式的
    callback = callback ? callback : "ck_" + new Date() * 1;

    //把参数转换后的 拼接到 url地址后面
    url = url + jsonp.entries({
        ...data,
        callback
    })

    let success = null;
    let error = null;
    let res = new Promise((resolve, reject) => {
        // 把 resolve 赋值给 success
        success = resolve;
        setTimeout(() => {
            reject(new Error("网络超时了！"))
        }, 1000)
    })
    //创建 script 文件
    let script = document.createElement("script");
    //设置 scrip 的 src 路径
    script.src = url;
    // callback 默认属于 window 方法 通过 window 使用函数
    window[callback] = function (data) {
        //  抛出数据   也相等于 resolve(data)
        success(data);
        //获取数据后 删除页面中的 script document.body.removeChild(script)
    }
    //追加到页面中
    document.body.appendChild(script)
    //抛出 promise 
    return res;
}
//用来转换参数的 ?limit=10&page=1&callback=ck_1563194074476 这种格式的
jsonp.entries = (url) => {
    let queryString = Object.entries(url).map(item =>
        `${item[0]}=${item[1]}`
    ).join("&");

    return queryString ? "?" + queryString : ""

}
jsonp({
    url: "http://localhost:3000/api/script",//script 要引入的接口 进行跨域
    data: { //路径后面跟的参数
        limit: 10,
        page: 1
    }
}).then(res => { //接收到的数据
    console.log(res)
})
