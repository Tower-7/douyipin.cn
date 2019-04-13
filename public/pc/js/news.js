$(document).ready(function(){
	init()
})
function init() {
    let id = $('body').attr('data-id')
    $.ajax({
		url: '/getNews/'+ id,
		type: 'get',
		success: function(data){
			news = data.news
			details(news)
		}
    })
    let details = async () => {
      let content =news[0].content
      arr = content.split(';')
			arr.forEach(element => {
				if(element.indexOf("pic") === 0){
          let src = element.replace('pic','')
          editPic(src)
				}
				else if(element.indexOf("text") === 0){
          let text = element.replace('text','')
          editText(text)
				}
				else{
					return
				}
			})
    }

    let editPic = async(src)=>{
      pic = `<div class="pic"><img src="`+ src +`" alt=""></div>`
      if($(".content>div").length){
        $('.content>div:last-child').after(pic)
      }
      else {
        $('.content').append(pic)
      }
    }
    let editText = async(text)=>{
      text = `<div class="text"><p>`+ text +`</p></div>`
      if($(".content>div").length){
        $('.content>div:last-child').after(text)
      }
      else {
        $('.content').append(text)
      }
    }
	
}