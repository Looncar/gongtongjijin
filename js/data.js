jQuery(document).ready(function () {
    var type = getUrlParam("type_id")
    // 当类型是基金报告、新闻中心、旗下产品时
    if (type == "5f9d9e690d409d5b08831e74" || type == "5f9d9e610d409d5b08831e73" || type == "5f9ec7436b4f1a1f6c0e8b2c") {
        $(".our").toggleClass("none")
        var params = {
            type_id: type,
            _id: getUrlParam("_id")
        }
        var url = 'http://47.94.168.183:3005/api/huayin/article'
        $.ajax({
            type: 'get',
            data: {
                type_id : type
            },
            url: 'http://47.94.168.183:3005/api/huayin/article',
            dataType: 'json',
            success:function(json){
                console.log(json)
                result = json.data
                result.forEach(function(currentValue, index, arr){
                    result[index].update_at = formateDate(result[index].update_at)
                    console.log(result[index].update_at)
                })
                var data = {result: []}
                for(var i=0, len=result.length; i<len; i++){
                    result[i].a = "<a href='page.html?type_id=" + type + "&&_id=" + result[i]._id + "'>" + result[i].title + "</a>"
                    data.result.push(result[i])
                }
                var tplist = template('tplist', data);
                $('#list').html(tplist);
            }
        })
    } else {
        $(".report").toggleClass("none")
        var params = {
            type_id: getUrlParam('type_id')
        }
        var url = 'http://47.94.168.183:3005/api/huayin/article'
    }
    getDatabyId(params)
    function getDatabyId(params) {
        $.ajax({
            type: 'get',
            url: url,
            data: params,
            dataType: 'json',
            success: function (res) {
                let list ={result: res.data}
                if(list.result[0].type=="5f9d9e610d409d5b08831e73"){
                    list.result[0].typeTitle = "新闻中心"
                }
                if(list.result[0].type=="5f9d9e690d409d5b08831e74"){
                    res.result[0].typeTitle = "基金报告"
                }
                if(list.result[0].type=="5f9ec7436b4f1a1f6c0e8b2c"){
                    list.result[0].typeTitle = "旗下产品"
                }
                console.log(list)
                list.result.forEach(function(currentValue, index, arr){
                    list.result[index].update_at = formateDate(list.result[index].update_at)
                    console.log(list)
                })
                var html = template('tmplt', list);
                $('#article').html(html);
            }
        })
    }
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null){
            return unescape(r[2]);}
        return null; //返回参数值
    }
    function formateDate(date) {
        var d = new Date(date);
        return (
          d.getFullYear().toString() +
          "年" +
          (d.getMonth() + 1).toString() +
          "月" +
          d.getDate().toString() +
          "日" +
          d.getHours().toString() +
          "时" +
          d.getMinutes().toString() +
          "分" +
          d.getSeconds().toString() +
          "秒"
        );
      }
})