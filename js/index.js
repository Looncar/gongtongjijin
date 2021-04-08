jQuery(document).ready(function(){
    getDataList()
    async function getDataList(){
        // 获取新闻中心
        let news = (await $.ajax({
            type: 'get',
            url: 'http://47.94.168.183:3005/api/huayin/article',
            data:{
                type_id : '5f9d9e610d409d5b08831e73',  //新闻中心的id为5f9d9e610d409d5b08831e73
                limit: 8
            },
            dataType: 'json',
        })).data
        console.log(news)
        // 获取基金报告
        let reports = (await $.get({
            url: 'http://47.94.168.183:3005/api/huayin/article',
            data: {
                type_id: '5f9d9e690d409d5b08831e74',  //基金报告的id为5f9d9e690d409d5b08831e74
                limit: 8
            },
            dataType: 'json'
        })).data
        let products = (await $.ajax({
            type: 'get',
            url: 'http://47.94.168.183:3005/api/huayin/article',
            data:{
                type_id : '5f9ec7436b4f1a1f6c0e8b2c',  //旗下产品的id为5f9ec7436b4f1a1f6c0e8b2c
                sort : 'location',
                limit: 8
            },
            dataType: 'json',
        })).data
        console.log(products)
        news.forEach(element => {
            element.a = "<a href='page.html?type_id=5f9d9e610d409d5b08831e73&&_id=" + element._id + "'>" + element.title + "</a>"
        });
        reports.forEach(element => {
            element.a = "<a href='page.html?type_id=5f9d9e690d409d5b08831e74&&_id=" + element._id + "'>" + element.title + "</a>"
        });
        products.forEach(element => {
            element.a = "<a href='page.html?type_id=5f9ec7436b4f1a1f6c0e8b2c&&_id=" + element._id + "'>" + element.title + "</a>"
        })
        let newsList = {result: news}
        var html1 = template('tmplt1', newsList);
        $('#news').html(html1);
        let reportsList = {result: reports}
        var html2 = template('tmplt2', reportsList);
        $('#report').html(html2);
        let productsList = {result: products}
        var html3 = template('tmplt3', productsList);
        $('#products').html(html3);
    }
    
  })