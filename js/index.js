var lis = document.querySelectorAll('.swiper li');
var left = document.querySelector('.icon-left');
var right = document.querySelector('.icon-right');
var swiper = document.querySelector('.swiper');
var circle = document.querySelector('.circle span');

function swiperPic(){
        // console.log("index =>",index);
    
        // if(index >= lis.length - 1){
        //     index = 0;
        // }
        // index++
    
        index = index >= lis.length - 1 ? 0 : ++index;

        if(index == 0){
            lis[lis.length-1].style.opacity = 0;
        }else{
            lis[index - 1].style.opacity = 0;
        }
        lis[index].style.opacity = 1;

        document.querySelector('.circle .active').classList.remove('active');
        circle[index].className = 'active';
}


var index = 0;

// 1、自动轮播
var timer = setInterval(swiperPic,2500)

//2、鼠标悬停，轮播暂停:离开，轮播继续
swiper.addEventListener('mouseover',function(){
    clearInterval(timer);
})
swiper.addEventListener('mouseleave',function(){
    timer = setInterval(swiperPic,2500)
})


// 3、左右移动
left.addEventListener('click',function(){

        index = index <= 0 ? lis.length - 1  : --index;

    //切换图片
    for(var i = 0;i<lis.length;i++){
        lis[i].style.opacity = 0;
    }
    lis[index].style.opacity = 1;

    document.querySelector('.circle .active').classList.remove('active');
    circle[index].className = 'active';
})

right.addEventListener('click',function(){

    index = index >= lis.length - 1 ? 0 : ++index;


    if(index == 0){
        lis[lis.length-1].style.opacity = 0;
    }else{
        lis[index - 1].style.opacity = 0;
    }

    lis[index].style.opacity = 1;

    document.querySelector('.circle .active').classList.remove('active');
    circle[index].className = 'active';

})

//4.点击小圆点切换对应图片
// for(var i=0;i<circle.length;i++){}
// (1)let定义变量-let是局部作用域
// (2)var定义变量-this+自定义属性
// (3)闭包


for(let i = 0;i<circle.length;i++){
    circle[i].addEventListener('click',function(){

        index = i;
        //图片切换
        for(var j=0;j<lis.length;j++){
            lis[j].style.opacity = 0;
        }
        lis[index].style.opacity = 1;

        //圆点切换
        document.querySelector('.circle .active').classList.remove('active');
        circle[index].className = 'active';
    })
}



var date = document.querySelector(".date")
date.innerHTML = (new Date().getMonth() + 1) + "月"
    + new Date().getDate() +"日"
