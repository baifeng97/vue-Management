//转换时间
export var getTime=utctime=>{
    var date=new Date(utctime);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}