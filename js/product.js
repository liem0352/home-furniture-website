function time(){
    //结束时间
    var endDate = new Date('2025-1-31 12:00:00').getTime();
    // console.log(endDate);

    //现在时间
    var now = new Date().getTime();
    // console.log(now);

    var second = Math.floor((endDate - now)/1000);
    // console.log(second);

    var day = Math.floor(second / 60 / 60 / 24);

    second = second % (60 * 60 * 24);
    var hour = Math.floor(second / 60 / 60);

    second = second %(60 * 60);
    var mins = Math.floor(second / 60);

    second %= 60;

    var str = day + "天" + hour + "小时" + mins + "分钟" + second + "秒";
    // console.log(str);
    document.querySelector(".dieline").innerHTML = str;
}

let timer = setInterval(time, 1000);


//图片放大
var pics = document.querySelectorAll(".right-item>img");
var boxImg = document.querySelector(".showProduct img");
var showProduct = document.querySelector(".showProduct");
console.log(pics);

//给图片都绑定点击事件
for (var i = 0; i < pics.length; i++) {
    pics[i].addEventListener("click", function (){
        //显示模块
        showProduct.style.transform = "scale(1)";
        boxImg.src = this.src;


        //有遮置层的时候，不让滚动条滚动
        // if (showProduct.style.transform = "scale(1)") {
        //     document.body.style.overflow == "hidden";
        // }
    })
    
}

//点击非图片区域，取消显示
showProduct.addEventListener("click", function(e){
    if (e.target.tagName == "DIV") {
        this.style.transform = "scale(0)";
        document.body.style.overflow = "auto";
    }
})

