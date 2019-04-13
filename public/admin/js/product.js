$(document).ready(function(){
	init()
	switchPic()
	switchs()
	add()
	upload()
	updatProduct()
})

function init() {
	$('.program:eq(0)').css('display','block')
	$('.sidebar li:eq(0)').css({'background-color':'#d83b44','color':'#fff'})
	$('.header .nav li:eq(1)').css({'background-color':'#555'})
	$('.header .nav li a:eq(1)').css({'color':'#fff'})
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
	let productBox = `
										<li class="list">
											<div><b>最后更新时间：</b><span></span> </div>
											<div> 
													<b>企业：</b> 
													<span contenteditable="true" class="title content"></span>
											</div>
											<div class="upload_form">
													<a href="javascript:;" class="file_box">
															<input class="selectPic" type="file"/>
															<div class="coverPic cover" style="background-image: "></div>
															<span>点 击 更 换 图 片</span>
													</a>
											</div>
											<div> 
															<b>企业介绍：</b> 
															<span contenteditable="true" class="intro content"></span>
													</div>
											<div> 
													<b>工种：</b> 
													<span contenteditable="true" class="workType content"></span>
											</div>
											<div> 
													<b>薪资说明：</b> 
													<span contenteditable="true" class="pay content"></span>
											</div>
											<div> 
													<b>福利说明：</b> 
													<span contenteditable="true" class="benefit content"></span>
											</div>
											<div> 
													<b>用工说明：</b> 
													<span contenteditable="true" class="task content"></span>
											</div>
											<div> 
													<b>要求说明：</b> 
													<p contenteditable="true" class="require content"></p>
											</div>
											<div class="upload_form">
													<a href="javascript:;" class="file_box">
															<input class="selectPic" type="file"/>
															<div class="coverPic code" </div>
															<span>点 击 更 换 图 片</span>
													</a>
											</div>
											<div class="set">
													<ul>
															<li  class="update" data_id="">更新</li>
															<li class="del" data_id="">删除</li>
													</ul>
											</div>
											
									</li>`
	
	
	$('.product').on('click','.add',function() {
		$(this).siblings('ul').prepend(productBox)
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




//updatProduct
function updatProduct(){
	$('.product').on('click','.update',function() {
		let title = $(this).parents('.list').find('.title').text()
		let number = $(this).parents('.list').find('.number').text()
		let intro = $(this).parents('.list').find('.intro').text()
		let workType = $(this).parents('.list').find('.workType').text()
		let pay = $(this).parents('.list').find('.pay').html()
		let benefit = $(this).parents('.list').find('.benefit').html()
		let task = $(this).parents('.list').find('.task').html()
		let require = $(this).parents('.list').find('.require').html()
		let cover = $(this).parents('.list').find('.cover').css('background-image')
		let code = $(this).parents('.list').find('.code').css('background-image')
		let id = $(this).attr('data_id')
		let data = {
			title: title,
			number: number,
			intro: intro,
			workType: workType,
			pay: pay,
			benefit: benefit,
			task: task,
			require: require,
			cover: cover,
			code: code,
		}
		$.ajax({
			url: '/admin/updateProduct',
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

