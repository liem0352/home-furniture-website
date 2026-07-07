
//失去焦点，进行验证
//要验证的元素放置对象中
const doms = {
    //获得用户名
    username: document.querySelector(".username input"),
    usernameTips: document.querySelector(".username .error-tip"),
    psd: document.querySelector('.psd input'),
    psdTips: document.querySelector('.psd .error-tip'),
    confirm: document.querySelector('.confirm input'),
    confirmTips: document.querySelector('.confirm .error-tip'),
    email:document.querySelector('.email input'),
    emailTips:document.querySelector('.email .error-tip'),
    nickname:document.querySelector('.nickname input'),
    nicknameTips:document.querySelector('.nickname .error-tip'),
    phone:document.querySelector('.phone input'),
    phoneTips:document.querySelector('.phone .error-tip'),
    birth:document.querySelector('.birth input'),
    birthTips:document.querySelector('.birth .error-tip'),
    code:document.querySelector(".code input"),
    codeTips:document.querySelector(".code .error-tip"),
    register:document.querySelector('.register'),
    sex:document.getElementsByName("sex")
}

// console.log(doms.sex)
console.log(doms)

//验证用户名
doms.username.addEventListener('blur',checkusername)
function checkusername(){
    // console.log('失去焦点');
    //匹配规则
    // const reg = /^[a-zA-Z0-9_-]{4,16}$/;
    const reg = /^\w{6,12}$/
    //验证
    // console.log(this.value);
    var flag = reg.test(doms.username.value)
    //如果是错误则显示出来
 
    if(flag == false){
        doms.usernameTips.innerText = "用户名不符合规范！"
    }else{
        doms.usernameTips.innerText = ""
    }
    
    return flag
}

//密码
doms.psd.addEventListener('blur',checkPsd)
function checkPsd(){
//确认密码
//匹配   
    const reg = /^\w{6}$/
    
    var flag = reg.test(doms.psd.value)
    if(!flag){
        doms.psdTips.innerText = "密码不符合规范！"
    }else{
        doms.psdTips.innerText = ""
    }
    return flag

}

//确认密码
doms.confirm.addEventListener('blur',checkConfirm)
    // console.log('失去焦点');
function checkConfirm(){
    
    if (doms.confirm.value !== doms.psd.value){
        doms.confirmTips.innerText = "两次密码不一致！"
        return false
    }else{
        doms.confirmTips.innerText=""
        return true 
    } 
}

//检验邮箱
doms.email.addEventListener('blur',checkemail)
function checkemail(){
    
    var reg = /^([\w-])+@([\w-])+(\.[\w-])+/
    //验证
    var flag = reg.test(doms.email.value)
        if(!flag){
        doms.emailTips.innerText = "邮箱规则不匹配！"
    }else{
        doms.emailTips.innerText = ""
    }
    return flag
}

//姓名
doms.nickname.addEventListener('blur',checknickname)
function checknickname(){
    var reg = /^[\u4e00-\u9fa5]{2,4}$/

    var flag = reg.test(doms.nickname.value)
    if(!flag){
        doms.nicknameTips.innerText = "填写2-4个汉字"
    }else{
        doms.nicknameTips.innerText = ""
    }
    return flag
}

doms.phone.addEventListener('blur',checkphone)
function checkphone(){
// var reg = /^(13[0-9]{1}|(15[0-9]{1})|(18[0-9]{1}))+\d{8}$/
    var reg = /^1[3-9]\d{9}$/
    var flag = reg.test(doms.phone.value)

    if (!flag){
        doms.phoneTips.innerText = "手机格式不正确！"
    }else{
        doms.phoneTips.innerText = ""
    }
    return flag
}

//点击注册，提交所有信息给后台（Java）前，检验是否信息收集完毕
doms.register.addEventListener('click',function(){
//     console.log("注册");
    if(doms.birth.value == ""){
        doms.birthTips.innerText = "请选择出生年月"
        return
    }else{
        doms.birthTips.innerText = ""
    }

    if(doms.code.value !="OBAN"){
        
        doms.codeTips.innerText = "验证码错误"
        return
    }else{
        doms.codeTips.innerText = ""
    }

    let sex = ""
    for(var i = 0;i<doms.sex.length;i++){
        if(doms.sex[i].checked == true){
            sex = doms.sex[i].value
        }
    }

    if(checkusername() && checkPsd() && checkConfirm() && checkemail() && checknickname() && checkphone()){
        let params = {
            username:doms.username.value,
            password:doms.psd.value,
            email:doms.email.value,
            sex:sex,
            nickname:doms.nickname.value,
            phone:doms.phone.value,
            birth:doms.birth.value
        }
        console.log(params)
        alert("注册成功")
    }else{
        alert("信息不完整")
    }
})
