$(document).ready(function(){
	init()
	switchPic()
	switchs()
	add()
	upload()
	updateLogo()
	updatBanner()
	updateproductType()
	updateAbout()
	updateScope()
	updateService()
	delproductType()
	delService()
})

function init() {
	$('.program:eq(0)').css('display','block')
	$('.sidebar li:eq(0)').css({'background-color':'#d83b44','color':'#fff'})
	$('.header .nav li:eq(0)').css({'background-color':'#555'})
	$('.header .nav li a:eq(0)').css({'color':'#fff'})
}
function switchPic() {
	$('.about .upload_form').css('display','none')
    $('.scope .upload_form').css('display','none')
    $('.service .upload_form').css('display','none')
}

function switchs() {
	$('.sidebar li').on('click',function() {
		let index = $(this).index()
		$('.sidebar li').css({'background-color':'#fff','color':'#555'})
		$(this).css({'background-color':'#d83b44','color':'#fff'})
		$('.program').css('display','none')
		$('.program:eq('+index+')').css('display','block')
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

function add() {
	let bannerBox = '<li class="list">\
			<div><b>最后更新时间：</b><span></span> </div>\
			<div> \
				<b>名称：</b> \
				<span contenteditable="true" class="title content"></span>\
			</div>\
			<div> \
				<b>排序：</b> \
				<div contenteditable="true" class="number content"></div>\
			</div>\
			<div> \
				<b>链接：</b> \
				<div contenteditable="true" class="link content"></div>\
			</div>\
			<div class="upload_form">\
				<a href="javascript:;" class="file_box">\
					<input class="selectPic" type="file">\
					<div \
					class="coverPic" style="background-image:"></div>\
					<span>点 击 更 换 图 片</span>\
				</a>\
			</div>\
			<div class="set">\
				<ul>\
					<li class="update" data_id="">发布</li>\
					<li class="del" data_id="">删除</li>\
				</ul>\
			</div>\
		</li>'
	let productTypeBox = '<li class="list">\
			<div><b>最后更新时间：</b><span></span> </div>\
			<div> \
				<b>系列名：</b> \
				<span contenteditable="true" class="title content"></span>\
			</div>\
			<div> \
				<b>型号：</b> \
				<div contenteditable="true" class="intro content"></div>\
			</div>\
			<div class="upload_form">\
				<a href="javascript:;" class="file_box">\
					<input class="selectPic" type="file">\
					<div \
					class="coverPic" style="background-image:"></div>\
					<span>点 击 更 换 图 片</span>\
				</a>\
			</div>\
			<div class="set">\
				<ul>\
					<li class="update" data_id="">发布</li>\
					<li class="del" data_id="">删除</li>\
				</ul>\
			</div>\
		</li>'
	
	let serviceBox = '<li class="list">\
        <div><b>最后更新时间：</b><span></span> </div>\
        <div> \
            <b>服务项目：</b> \
            <span contenteditable="true" class="title content"></span>\
        </div>\
        <div> \
            <b>服务简介：</b> \
            <div contenteditable="true" class="intro content"></div>\
        </div>\
        <div class="upload_form">\
            <a href="javascript:;" class="file_box">\
                <input class="selectPic" type="file">\
                <div \
                class="coverPic" style="background-image:"></div>\
                <span>点 击 更 换 图 片</span>\
            </a>\
        </div>\
        <div class="set">\
            <ul>\
                <li  class="update" data_id="">发布</li>\
				<li class="del" data_id="">删除</li>\
            </ul>\
        </div>\
    </li>'
	
	$('.banner').on('click','.add',function() {
		$(this).siblings('ul').prepend(bannerBox)
		switchPic()
	})

	$('.productType').on('click','.add',function() {
		$(this).siblings('ul').prepend(productTypeBox)
		switchPic()
	})
	
	$('.service').on('click','.add',function() {
		$(this).siblings('ul').prepend(serviceBox)
		switchPic()
	})
}
function upload() {
	$('body').on('change','.selectPic',function(){
		let _this = $(this)
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
				  _this.siblings('.coverPic')
				  .css('background-image','url('+data.imgPath+')')
				  _this.siblings('img')
				  .attr('src',data.imgPath)
			  } else {}
			},
			error: function(){
			}
		});
	})
}

//updateLogo
function updateLogo() {
	$('.logo').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let intro = $(this).parents('.list').find('.intro').text()
		let pic = $(this).parents('.list').find('img').attr('src')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			intro: intro,
			pic: pic,
		}
		$.ajax({
			url: '/admin/updateLogo',
			type: 'post',
			data: {
				data:data,
				id:id
			},
			success: function(data){
				alert(data.msg)
			}
		})
	})
}


//updatBanner
function updatBanner(){
	$('.banner').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let number = $(this).parents('.list').find('.number').text()
		let link = $(this).parents('.list').find('.link').text()
		let pic = $(this).parents('.list').find('.coverPic').css('background-image')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			number: number,
			link: link,
			pic: pic,
		}
		$.ajax({
			url: '/admin/updatBanner',
			type: 'post',
			data: {
				data:data,
				id:id
			},
			success: function(data){
				alert(data.msg)
			}
		})
	})
}

//updateproductType
function updateproductType(){
	$('.productType').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let intro = $(this).parents('.list').find('.intro').text()
		let pic = $(this).parents('.list').find('.coverPic').css('background-image')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			intro: intro,
			pic: pic,
		}
		$.ajax({
			url: '/admin/updateproductType',
			type: 'post',
			data: {
				data:data,
				id:id
			},
			success: function(data){
				alert(data.msg)
			}
		})
	})
}

//updateAbout
function updateAbout(){
	$('.about').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let intro = $(this).parents('.list').find('.intro').text()
		let pic = $(this).parents('.list').find('.coverPic').css('background-image')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			intro: intro,
			pic: pic,
		}
		console.log(data)
		$.ajax({
			url: '/admin/updateAbout',
			type: 'post',
			data: {
				data:data,
				id:id
			},
			success: function(data){
				alert(data.msg)
			}
		})
	})
}

//updateScope
function updateScope(){
	$('.scope').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let intro = $(this).parents('.list').find('.intro').text()
		let pic = $(this).parents('.list').find('.coverPic').css('background-image')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			intro: intro,
			pic: pic,
		}
		console.log(data)
		$.ajax({
			url: '/admin/updateScope',
			type: 'post',
			data: {
				data:data,
				id:id
			},
			success: function(data){
				alert(data.msg)
			}
		})
	})
}

//updateService
function updateService(){
	$('.service').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let intro = $(this).parents('.list').find('.intro').text()
		let pic = $(this).parents('.list').find('.coverPic').css('background-image')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			intro: intro,
			pic: pic,
		}
		console.log(data)
		$.ajax({
			url: '/admin/updateService',
			type: 'post',
			data: {
				data:data,
				id:id
			},
			success: function(data){
				alert(data.msg)
			}
		})
	})
}

//delproductType
function delproductType() {
	$('.productType .del').on('click',function() {
		let list =  $(this).parents('.list')
		let id = $(this).attr('data_id')
		$.ajax({
			url: '/admin/delgood',
			type: 'post',
			data: {id:id},
			success: function(data){
				list.remove()
				alert(data.msg)
			}
		})
	})
}
//delService
function delService() {
	$('.service .del').on('click',function() {
		let list =  $(this).parents('.list')
		let id = $(this).attr('data_id')
		$.ajax({
			url: '/admin/delService',
			type: 'post',
			data: {id:id},
			success: function(data){
				list.remove()
				alert(data.msg)
			}
		})
	})
}


