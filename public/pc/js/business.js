$(document).ready(function(){
	pic()
})
function pic() {
	$('.recommend li').each(function(){
		let cover = $(this).find('.cover').attr('data-src')
		cover = cover.replace('url(\"','')
		cover = cover.replace('\")','')
		$(this).find('.cover').attr('src',cover)

		let code = $(this).find('.code').attr('data-src')
		code = code.replace('url(\"','')
		code = code.replace('\")','')
		$(this).find('.code').attr('src',code)
	})

	$('.all li').each(function(){
		let cover = $(this).find('.cover').attr('data-src')
		cover = cover.replace('url(\"','')
		cover = cover.replace('\")','')
		$(this).find('.cover').attr('src',cover)

		let code = $(this).find('.code').attr('data-src')
		code = code.replace('url(\"','')
		code = code.replace('\")','')
		$(this).find('.code').attr('src',code)
	})
}