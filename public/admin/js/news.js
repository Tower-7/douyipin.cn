$(document).ready(function(){
	init()
	switchs()
	upload()
	edit()	
	changeImg()
	submit()
	change()
})

function init() {
	$('.program:eq(0)').css('display','block')
	$('.sidebar li:eq(0)').css({'background-color':'#d83b44','color':'#fff'})
	$('.header .nav li:eq(2)').css({'background-color':'#555'})
	$('.header .nav li a:eq(2)').css({'color':'#fff'})
}
function switchs() {
	$('.sidebar li').on('click',function() {
		$('.sidebar li').css({'background-color':'#fff','color':'#555'})
		$(this).css({'background-color':'#d83b44','color':'#fff'})
	})
	$('.sidebar li').on('mouseover',function() {
		let color = $(this).css('color')
		if(color!='rgb(255, 255, 255)'){
			$(this).css({'background-color':'#ccc'})
		}
	})
	$('.sidebar li').on('mouseout',function() {
		let color = $(this).css('color')
		if(color!='rgb(255, 255, 255)'){
			$(this).css({'background-color':'#fff'})
		}
	})

}


function table(newss) {
	$('.table tbody').html('')
	$.each(newss,function(index,news) {
		let tr = '<tr>\
			<td>'+ index +'</td>\
			<td>'+ news.title +'</td>\
			<td>'+ news.type +'</td>\
			<td class="detail" data-id="'+ news._id +'">详情</td>\
			<td class="det" data-id="'+ news._id +'">删除</td>\
		</tr>'
		$('.table tbody').html($('.table tbody').html() + tr)
	})
}

function upload() {
	$('body').on('change','.selectPic',function(){
		let file = this
		let formData = new FormData();
		formData.append('file',file.files[0]);
		$.ajax({
			url: '/upload',
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data){
			  if(200 === data.code) {
				  uploadPic(data.imgPath)
			  } else {}
			},
			error: function(){
			}
		});
	})
}


function edit() {
	//调出编辑框
	$('.wrap').on('click','.news .add',function() {
		let id = ''
		$('.submit').attr('data-id',id)
		$('.editContent').html('')
		$('.editWrap').css('display','block')
		$('html').css('overflow','hidden')
		$('.editWrap .title').focus().select()
	})
	//关闭编辑框
	$('.editWrap').on('click','.close',function() {
		$('.editWrap').css('display','none')
		$('html').css('overflow','scroll')
	})

	//添加编辑文本框
	$('.editWrap').on('click','.addController .text',function() {
		$('.editController .add,.addController').css('display','none')
		let textBox = '<div class="textBox">\
				<div class="textContent" contenteditable="true"></div>\
				<div class="set">\
					<ul>\
						<li class="remove">删除</li>\
						<li class="move">上移</li>\
						<li class="insert">插入</li>\
					</ul>\
				</div>\
			</div>'
		if($(".editContent>div").length){
			$('.editContent>div:last-child').after(textBox)
		}
		else {
			$('.editContent').append(textBox)
			displayAddBox()
		}
			
	})
	//调出编辑控制框
	$('.editWrap').on('click','.add,.insertContent',function() {
		$('.addController').css('display','block')
	})
}
//自动填入文字内容
function editText(text) {
	$('.editController .add,.addController').css('display','none')
		let textBox = `<div class="textBox">\
				<div class="textContent" contenteditable="true"> `+ text +`</div>
				<div class="set">
					<ul>
						<li class="remove">删除</li>
						<li class="move">上移</li>
						<li class="insert">插入</li>
					</ul>
				</div>
			</div>`
		if($(".editContent>div").length){
			$('.editContent>div:last-child').after(textBox)
		}
		else {
			$('.editContent').append(textBox)
			displayAddBox()
		}
}
//添加编辑图片框	
function uploadPic(imgUrl) {
	$('.editController .add,.addController').css('display', 'none')
	let picBox = `<div class="picBox">
						<a href="javascript:;" class="PicFile_box">
							<input class="selectFilePic" type="file">
							<div class="picContent"><img src="`+ imgUrl + `" alt=""></div>
						</a>
						<div class="set">
							<ul>
								<li class="remove">删除</li>
								<li class="move">上移</li>
								<li class="insert">插入</li>
							</ul>
						</div>
				   </div>`
	if ($(".editContent>div").length) {
		$('.editContent>div:last-child').after(picBox)
	}
	else {
		$('.editContent').append(picBox);
		displayAddBox()
	}
}
//图片框内图片修改
function changeImg() {
	$('.content').on('change', '.selectFilePic', function () {
		let _this = $(this)
		let file = this
		let formData = new FormData();
		formData.append('file', file.files[0]);
		$.ajax({
			url: '/upload',
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data) {
				if (200 === data.code) {
					_this.next('.picContent').find('img').attr('src', data.imgPath)
				} else { }
			},
			error: function () {
			}
		});
	})
}

//添加按钮显示隐藏
function displayAddBox() {
	if($(".editContent>div").length){
		$('.editWrap .insertContent').css('display','block')
		$('.editWrap .editController .add').css('display','none')
	}
	else {
		$('.editWrap .insertContent').css('display','none')
		$('.editWrap .editController .add').css('display','block')
	}
}

//发布产品
function submit() {
	$('.editWrap').on('click','.submit',function() {
		let id = $(this).attr('data-id')
		let title = $('.editWrap .title').val()
		let type = $('.news h4').text()
		let content = '';
		$('.editContent>div').each(function(){
			let pic = $(this).find('img').attr('src')
			if(pic){
				content += 'pic' + pic + ';'
			}
			else{
				let text = $(this).find('.textContent').text()
				content += 'text' + text + ';'
			}
		});
		let pic = $('.editContent .picContent:eq(0) img').attr('src')
		let data = {
			title: title,
			type: type,
			pic:pic,
			content: content,
        }
		$.ajax({
			url: '/admin/addNews',
			type: 'post',
			data: {
				id: id,
				data:data,
			},
			success:function(data){
				alert(data.msg)
				$('.editWrap').css('display','none')
				location.href = '/admin/news'
			},
		})
	})
}

//修改产品
function change() {
	$('.news').on('click','.detail',function() {
		$('.editWrap').css('display','block')
		$('html').css('overflow','hidden')
		let id = $(this).attr('data-id')
		$('.submit').attr('data-id',id)
		$.ajax({
			url: '/getNews/'+id,
			post: 'get',
			success: function(data) {
				content(data.news)
			}
		})
		function content(news) {
			$('.editWrap .title').val(news[0].title)
			let content = news[0].content

			$('.editWrap .title').focus().select()
			arr = content.split(';')
			arr.forEach(element => {
				if(element.indexOf("pic") === 0){
					let src = element.replace('pic','')
					uploadPic(src)
				}
				else if(element.indexOf("text") === 0){
					let text = element.replace('text','')
					editText(text)
				}
				else{
					return
				}
			})
			
			// if(content) {
			// 	$('.editWrap .add').css('display','none')
			// 	$('.editContent').html(content)
			// }

		}
	})
}
