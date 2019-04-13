$(document).ready(function() {
	edit()
	close()
	updateCoverPic() 
	remove()
	submit()
	del()
	adds()
	detail()
	productType()
})
function detail() {
	$('.detail').on('click',function() {
		let title = $(this).attr('data-title')
		let id = $(this).attr('data-id')
		let content = $(this).attr('data-content')
		$('.editWrap').css('display','block')
		$('.edits .title').text(title)
		$('.editWrap .submit').attr('data-id',id)
		updateArticle(content)
	})
}
function close() {
	$('.addProduct').on('click',function(){
		$('.editWrap').css('display','block')
	})
	$('.nav .close').on('click',function() {
		$('.editWrap').css('display','none')
	})
}
function del() {
	$('.del').on('click',function() {
		let list = $(this).parents('.list')
		let id = $(this).attr('data-id')
		if(del()){
			delById(id)
			list.remove()
		}
	})
	let del = function(){
		return confirm("是否确认删除");
	}	
	let delById = function(id){
		$.ajax({
			url: '/admin/delgood',
			type: 'post',
			data: {
				id:id
			},
			success:function(data){
				alert(data.msg)
			}
		})
	}
	
}
function submit() {
	$('.editWrap .submit').on('click',function() {
		let id = $(this).attr('data-id')
		let title = $(this).parents('.editWrap').find('.title').text()
		contents(id,title)
		
	})
}
function adds() {
	let list = '<li class="list" data-id=""><a contenteditable="true" href="#"></a>\
	<i class="fa fa-check-square fa-x" aria-hidden="true"></i></li>'
	$('.addType').on('click',function() {
		$(this).siblings('.types').append(list)
	})
}

function productType() {
	$('.sidebar').on('click','.types .list i',function(){
		let _this = $(this)
		let id = $(this).parents('.list').attr('data-id')
		let type = $(this).siblings('a').text()
		let data = {
			type:type
		}
		$.ajax({
			url: '/admin/addProductType',
			type: 'post',
			data: {
				data: data,
				id: id,
			},
			success:function(data){
				console.log(data.msg)
				_this.css('display','none')
			}
		})
	})
}
function edit() {
	function displayAddBox() {
		if($(".editContent>div").length){
			$('.editBox .insertContent').css('display','block')
			$('.addContent').css('display','none')
		}
		else {
			$('.editBox .insertContent').css('display','none')
			$('.addContent').css('display','block')
		}
	}
	$('.editWrap').on('click','.contentElement .text',function() {
		$('.contentElement').css('display','none')
		$('.editWrap .submit').css('display','block')
		var textBox = '<div class="textBox">\
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
	$('.editWrap').on('click','.contentElement .pic',function() {
		$('.contentElement').css('display','none')
		$('.editWrap .submit').css('display','block')
		var picBox = '<div class="picBox">\
					<div class="picContent"><img src="" alt=""></div>\
					<div class="set">\
						<ul>\
							<li class="remove">删除</li>\
							<li class="move">上移</li>\
							<li class="insert">插入</li>\
						</ul>\
					</div>\
				</div>'
		if($(".editContent>div").length){
			$('.editContent>div:last-child').after(picBox)
		}
		else {
			$('.editContent').append(picBox);
			displayAddBox()
		}
		$('.editContent>div').removeClass('activePic')
		$('.editContent>div:last-child').addClass('activePic')
	})

	//
	$('.edit').on('click','.editContent .set .insert,.addContent,.editBox .insertContent',function() {
		$('.contentElement').css('display','block')
		$('.editBox').css('display','block')
		$('.editWrap .submit').css('display','none')
	})
}
function remove() {
	$('.edit').on('click','.editBox .picBox .remove',function() {
		var path = $(this).parents('.set').prevAll('.picContent').children('img').attr('src')
		var picBox = $(this).parents('.picBox')
		$.ajax({
			url: '/m/removeContentPic',
			type: 'post',
			data: {
				path: path,
			},
			success:function(){
				picBox.remove()
			}
		})
	})
	$('.edit').on('click','.editBox .textBox .remove',function() {
		var textBox = $(this).parents('.textBox')
		textBox.remove()
	})
}
function updateCoverPic() {
    $('#selectPic').change(function() {
        //显示被上传图片
        var $file = $(this);  
        var fileObj = $file[0];  
  
        var windowURL = window.URL || window.webkitURL;  
        var dataURL;  
        var $img = $(".activePic .picContent img");  

        if (fileObj && fileObj.files && fileObj.files[0]) {  
            // dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL); 
        } else {  
            dataURL = $file.val();  
            var imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
  
        }
    })
    var uploada = document.getElementById('selectPic');
    uploada.addEventListener("change",function () {
        coverPicUploadFile();
    },false);
   
}

//上传
function coverPicUploadFile(){
  var file = document.getElementById("selectPic")
  var formData = new FormData();
  formData.append('file',file.files[0]);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    // async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data){
         if(200 === data.code) {
            $('.activePic .picContent img').attr('src',data.imgPath);
          } else {
            $('#readCreateResult').html("上传失败！");
            $('.readCreateFile_box span').css('display','block')
          }
    },
    error: function(){
      
    }
  });
}
function updateArticle(content) {
	var edit = $('.editContent').html(content)
	if(edit) {
		$('.editContent>div').each(function() {
			var img = $(this).children('img').attr('src')
			if(img){
				var picBox = '<div class="picBox"><div class="picContent"><img src="'+img+'" alt=""></div><div class="set"><ul><li class="remove">删除</li><li class="move">上移</li><li class="insert">插入</li></ul></div></div>'
				if($(".editContent>div").length){
					$('.editContent>div:last-child').after(picBox)
				}
				else {
					$('.editContent').append(picBox);
				}
			}
			else {
				var text = $(this).html()
				var textBox = '<div class="textBox"><div class="textContent" contenteditable="true">'+text+'</div><div class="set"><ul><li class="remove">删除</li><li class="move">上移</li><li class="insert">插入</li></ul></div></div>'
				if($(".editContent>div").length){
					$('.editContent>div:last-child').after(textBox)
				}
				else {
					$('.editContent').append(textBox)
				}
			}
			$(this).remove()
		})
		displayAddBox()
	}
}

function displayAddBox() {
	if($(".editContent>div").length){
		$('.editBox .insertContent').css('display','block')
		$('.addContent').css('display','none')
	}
	else {
		$('.editBox .insertContent').css('display','none')
		$('.addContent').css('display','block')
	}
}

function contents(id,title) {
    
	let content = ''
	$(".editContent>div").each(function() {
		var text = $(this).children('.textContent').html()
		var pic = $(this).children('.picContent').html()
		if(text){
			text = '<div>'+text+'</div>'
			content += text
		}
		else {
			pic = '<div>'+pic+'</div>'
			content += pic
		}
	})
	let data = {
		title: title,
		content: content,
	}
	$.ajax({
		url: '/admin/updategood',
		type: 'post',
		data: {
			data:data,
			id:id
		},
		success: function(data){
			alert(data.msg)
			window.location.reload()
		}
	})
}
