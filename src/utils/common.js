/** 获取当前日期时间 */
export function getDateTime() {
    let now   = new Date();
    let year  = now.getFullYear();  //年
    let month = now.getMonth() + 1; //月
    let day   = now.getDate();      //日
    let hour  = now.getHours();     //时
    let minu  = now.getMinutes();   //分
    let sec   = now.getSeconds();   //秒
    // 个位数时补0
    if (month < 10) { month = `0${month}` }; 
    if (day < 10) { day = `0${day}` };
    if (hour < 10) { hour = `0${hour}` };
    if (minu < 10) { minu = `0${minu}` };
    if (sec < 10) { sec = `0${sec}` };
    // 返回日期
    let time = `${year}-${month}-${day} ${hour}:${minu}:${sec}`;
    return time;
}

/** 时间戳转日期 */
export function timestampToDate(timestamp) {
    let now   = new Date(timestamp * 1000);
    let year  = now.getFullYear();  //年
    let month = now.getMonth() + 1; //月
    let day   = now.getDate();      //日
    let hour  = now.getHours();     //时
    let minu  = now.getMinutes();   //分
    let sec   = now.getSeconds();   //秒
    // 个位数时补0
    if (month < 10) { month = `0${month}` }; 
    // 返回日期
    let time = `${year}-${month}-${day} ${hour}:${minu}:${sec}`;
    return time;
}