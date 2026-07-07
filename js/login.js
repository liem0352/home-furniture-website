// console.log(1);
const settings = {
    words:['家具城','美观','实惠','舒适','典雅'],
    colors:["skyblue","lightblue","lightcyan","paleturquoise","aquamarine","mediumaquamarine"],
    fontSize:[14,16,18,20,22,24]
}

function createWord(word,color,fontSize){
    const span = document.createElement('span')
    span.textContent = word;
    span.style.color =  color;
    span.style.fontSize = fontSize + 'px';
    span.className  = "word"
    return span;
}

document.querySelector('html').addEventListener('click',function(e){
    let wordText = settings.words[Math.floor(Math.random()*settings.words.length)]
    let color = settings.colors[Math.floor(Math.random()*settings.colors.length)]
    let fontSize = settings.fontSize[Math.floor(Math.random()*settings.fontSize.length)]
    const word =  createWord(wordText,color,fontSize)
    console.log('word=>',word);
    // console.log(e.pageX,e.pageY)

    word.style.left = e.pageX + 'px';
    word.style.top = e.pageY + 'px';
    //放置在页面中
    document.body.appendChild(word)
    word.offsetWidth;
    word.style.opacity = 0;
    word.style.top = e.pageY - 200 + 'px'

    setTimeout(()=>{
        word.remove()
    },1500)
})