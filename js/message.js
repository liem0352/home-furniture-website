window.onload=function(){
    //1、全选打勾，其他全选

    var allSlt = document.querySelector(".allSlt")
    var allInput = document.querySelectorAll(".radioSlt")
    var textArea = document.querySelector("#textArea")
    var tips = document.querySelector(".tips span")
    console.log(allSlt, allInput, textArea);


    allSlt.addEventListener("click",function(){
        allInput.forEach(item => {
            item.checked = this.checked
        })
    })


    //2、但凡有一个没有打上，全选不打上钩
    for (var  i = 0; i < allInput.length; i++) {
        allInput[i].addEventListener("click", function () {
            for(var j = 0; j < allInput.length; j++){
                if(allInput[j].checked == false){
                    allSlt.checked = false
                    return
                }
            }
            allSlt.checked = true
        })
        
    }


    //3、显示还有多少个字
    textArea.addEventListener("input", function(){
        // console.log(this.value)
        //
        let len = this.value.trim().length
        if(len <= 100){
            tips.innerText = 100 - len
        }else{
            this.value = this.value.slice(0, 100)
            tips.innerText = 0
        }
    })
}