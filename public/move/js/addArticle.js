$(document).ready(function() {
    title()
	updateCoverPic() 
    submit()
    type()
    conmmon()
    qiniu()
})
let qiniu = async ()=>{
    $('#qiniu').change(function() {
        //显示被上传图片
        let $file = $(this);  
        let fileObj = $file[0];  
        let windowURL = window.URL || window.webkitURL;  
        let dataURL; 
        dataURL = windowURL.createObjectURL(fileObj.files[0]); 
        console.log(dataURL)
        $.ajax({
            url: '/m/qiniu',
            type: 'post',
            data: {
                filePath: dataURL,
            },
            success:async() =>{

            }
        })
    })
}
function conmmon() {
    $('.nav .back a').on('click',function() {
        let path = $('#coverImg').attr('src')
        $.ajax({
            url: '/m/removeContentPic',
            type: 'post',
            data: {
                path: path,
            },
            success:function(){
            }
        })
    })
}
function title() {
    let title = $('.title p').text()
    if(title != '') {
        $('.title .tips').css('display','none')
    }
    else {
        $('.title .tips').css('display','block')
    }
    $('.title .tips').on('click',function() {
        $('.title p').focus()
    })
    $('.title p').keyup(function() {
        title = $(this).text()
        if(title != '') {
            $('.title .tips').css('display','none')
        }
        else {
            $('.title .tips').css('display','block')
        }
    })
}
function submit() {
	$('.submit').on('click',function() {
        let id = $(this).attr('data_id')
        let content = $(this).attr('data_content')
        let title = $('.title p').text()
        let coverPic = $('#coverImg').attr('src')
        let type = $('.choosetype i').attr('class')
        let public = true
		$.ajax({
			url: '/m/saveArticle',
			type: 'post',
			data:{
                id: id,
				coverPic: coverPic,
				title: title,
                content: content,
                type: type,
                public: public,
			},
			success: function() {
                alert('发布成功！')
                window.location.href = '/m/#read'
			}
		})
	})
    $('body').on('click','.nav .save',function() {
        let id = $('.submit').attr('data_id')
        let author = $('.submit').attr('data_name')
        let title = $('.title p').text()
        let coverPic = $('#coverImg').attr('src')
        let type = $('.choosetype i').attr('class')
        let content = $('.articleContent').text()
        let public = false
        $.ajax({
            url: '/m/saveArticle',
            type: 'post',
            data:{
                id: id,
                author: author,
                title: title,
                coverPic: coverPic,
                content: content,
                type: type,
                public: public,
            },
            success: function(data) {
                window.location.href = '/m/myArticle/' + data.author
            }
        })
    })
    $('body').on('click','.submitTitle',function() {
        let id = $('.submit').attr('data_id')
        let author = $('.submit').attr('data_name')
        let title = $('.title p').text()
        let coverPic = $('#coverImg').attr('src')
        let type = $('.choosetype i').attr('class')
        let content = $('.submit').attr('data_content')
        let public = $('.submit').attr('data_public')
        $.ajax({
            url: '/m/saveArticle',
            type: 'post',
            data:{
                id: id,
                author: author,
                title: title,
                coverPic: coverPic,
                content: content,
                type: type,
                public: public,
            },
            success: function(data) {
                window.location.href = '/m/addArticleContent/' + data.id
            }
        })
    })
}

function updateCoverPic() {
    $('#selectPic').change(function() {
        //显示被上传图片
        let $file = $(this);  
        let fileObj = $file[0];  
  
        let windowURL = window.URL || window.webkitURL;  
        let dataURL;  
        let $img = $("#coverImg");  

        if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL); 
            $('.file_box').css('background','transparent')
        } else {  
            dataURL = $file.val();  
            let imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
  
        }
    })
    let uploada = document.getElementById('selectPic');
    uploada.addEventListener("change",function () {
        coverPicUploadFile();
    },false);
   
}

//上传
function coverPicUploadFile(){
  let file = document.getElementById("selectPic")
  let formData = new FormData();
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
            $('#coverImg').attr('src',data.imgPath);
          } else {
            $('#readCreateResult').html("上传失败！");
            $('.readCreateFile_box span').css('display','block')
          }
    },
    error: function(){
      
    }
  });
}

let type = function() {
    $('.choosetype').click(function() {
        $('.type').toggle()
    })
    $('.type li').click(function() {
        $('.choosetype i').text($(this).text())
        $('.choosetype i').removeClass() 
        $('.choosetype i').addClass($(this).attr('class')) 
        $('.type').toggle()
    })
    $('.title').focus(function() {
        if($(this).val() == 'Title'){
            $(this).val('').css('color','#555')
        }
    })
    $('.title').blur(function() {
        if($(this).val() ==''){
            $(this).val('Title').css('color','')
        }
    })
    $(document).scroll(function() {
         let top = $('.froala-element').offset().top - $(window).scrollTop()
         if(top<130) {
            $(".froala-editor.f-basic").css({'position':'fixed','top':'50px'})
            $('.froala-element').css('margin-top','70px')
         }
         else{
            $(".froala-editor.f-basic").css({'position':'static','top':'100px'})
            $('.froala-element').css('margin-top','0')
         }
    })
    $('.submit').click(function() {
        let title = $('.title').val()
        let type = $('.choosetype i').attr('class')
        let content = $('.froala-element').html()
        let articles 
        if(title == 'Title') {
            alert('记得写一下标题哦~')
        }
        else if(type == 'null') {
            alert('选择一下投稿类型吧~')
        }
        else if(content == '<p><br></p>') {
            alert('~不要淘气哦，必须写正文oooo！')
        }
        else{
        }
            
    })
}