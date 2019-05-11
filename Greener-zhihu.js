// ==UserScript==
// @name         (持续更新)Greener系列：知乎主页与问题浏览缓存自动清除|全面优化广告过滤(浏览文章回答过多内存优化|去侧栏广告|浏览知乎再也不会卡顿了|不登录浏览)
var name = "Greener系列：知乎主页与问题浏览缓存自动清除|全面优化广告过滤";
var siteName = "知乎";
// @namespace    https://github.com/AdlerED
// @version      1.1.5
var version = "1.1.5";
// @description  轻量级TamperMonkey插件：你有没有遇到过浏览知乎过多过长导致页面崩溃/占用内存过多的情况? 本插件对其进行全面优化, 不用再刷新页面释放内存了! By Adler
// @author       Adler
// @connect      zhihu.com
// @include      *://*.zhihu.com/*
// @require      https://code.jquery.com/jquery-1.11.0.min.js
// @note         19-03-03 1.1.0 重要更新：优化了缓存清除流程，更加无缝的体验
// @note         19-03-02 1.0.1 优化了主页的浏览体验
// @note         19-03-02 1.0.0 初版发布
// ==/UserScript==

//如果你不希望脚本会将知乎主页的内容由于需要节约内存而删除, 请将此项改为false, 反之改为true;
var memSaveMode = true;
//如果你不希望脚本会将知乎问题浏览的页面由于需要节约内存而删除, 请将此项改为false, 反之改为true;
var memSaveModeArticle = true;

(function() {
    var currentURL = window.location.href;
    console.log("你正在访问 " + currentURL + " , 正在为你匹配过滤规则......");
    var signUp = /signup/;
    var question = /question/;
    if (signUp.test(currentURL)){
        $(".SignContainer-switch").append("&nbsp;&nbsp;&nbsp;&nbsp;<span><a href='https://www.zhihu.com/explore'>跳过登录, 直接浏览</a></span>");
    }
    console.log("欢迎, 正在执行" + name + "插件! Powered By Adler WeChat: 1101635162");
    var count = 0;
    if (count == 0){
        console.log("正在进行第一次Kill操作......");
        killAll();
    }

    var starting = setInterval(function(){
        count++;
        if (count > 50) {
            console.log("净化已完成! 请享受绿色的" + siteName + "~");
            clearInterval(starting);
        } else {
            if (count == 5) {
                //预留
                //进度条
                console.log("正在干掉遗漏的浮窗(不会影响性能, 请无视该消息)......");
                killAll();
            }
        }
    }, 100);
    //由于部分交互非即时打开, 所以一直循环
    setInterval(function(){
        //预留
        //删除主页卡片广告
        $(".Pc-feedAd-container").remove();
        if (question.test(currentURL)){
            if (memSaveModeArticle == true) {
                //重要：检查卡片数量并进行部分删除
                var cardsArticle = document.getElementsByClassName("List-item");
                //限制卡片数量
                var limitsArticle = 12;
                //计算应该删除多少个卡片
                var needToDelArticle = cardsArticle.length - limitsArticle;
                console.log("问题页：卡片数量：" + cardsArticle.length + " 需要删除：" + needToDelArticle);
                if (cardsArticle.length > limitsArticle) {
                    for (var iArticle = 0; iArticle < needToDelArticle; iArticle++){
                        console.log(iArticle);
                        try {
                            //cardsArticle[iArticle].parentNode.removeChild(cardsArticle[iArticle]);
                            cardsArticle[0].parentNode.removeChild(cardsArticle[0]);
                        } catch (err) { console.log("出现非致命性错误"); continue; }
                    }
                    //删除已经展开的内容
                    //$(".RichContent").remove();
                }
            }
        } else {
            if (memSaveMode == true) {
                    //重要：检查卡片数量并进行部分删除
                    var cards = document.getElementsByClassName("TopstoryItem");
                    //限制卡片数量
                    var limits = 30;
                    //计算应该删除多少个卡片
                    var needToDel = cards.length - limits;
                    console.log("主页：卡片数量：" + cards.length + " 需要删除：" + needToDel);
                    //if (cards.length > limits) {
                    if (needToDel > 0) {
                        console.log("触发");
                        //for (var del = 0; del < limits; del++) {
                        for (var del = 0; del < needToDel; del++) {
                        console.log(del);
                        try {
                            //cards[del].parentNode.removeChild(cards[del]);
                            cards[0].parentNode.removeChild(cards[0]);
                            //$(".TopstoryItem").remove();
                        } catch (err) { console.log("出现非致命性错误"); continue; }
                    }
                    //$(".TopstoryItem").remove();
                }
            }
        }
    }, 1000);
})();

function killAll() {
    //修改问题回答宽度
    //$(".Question-mainColumn").css("width", "100%");
    //$(".Question-main").css("display", "!important");
    //核心代码
    //CLASSES
    var classLists = new Array(
        "Pc-card",
        "Banner-image",
        //"Sticky",
        "Pc-word",
        //评论推荐内容
        "Recommendations-Main",
    );

    //IDS
    var idLists = new Array(

    );

    for(var i = 0; i < classLists.length; i++) {
        var tempName = classLists[i];
        $("." + tempName).remove();
    }

    for(var j = 0; j < idLists.length; j++) {
        var tempID = idLists[j];
        $("#" + tempID).remove();
    }
}
