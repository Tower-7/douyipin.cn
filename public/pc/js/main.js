$(function() {
    $(window).load(function() {

        $('.subNavBox').find('li').each(function(index, el) {
            // console.log($('.navBox').find('li').eq(index).offset().left)
            $(el).offset({ left: $('.navBox').find('li').eq(index).offset().left });
            $(el).mouseenter(function(event) {
                $(el).addClass('active');
                $('.navBox').find('li').eq(index).addClass('active');
            });
            $(el).mouseleave(function(event) {
                $(el).removeClass('active');
                $('.navBox').find('li').eq(index).removeClass('active');
            });
        });
        $('.navBox').find('li').each(function(index, el) {
            $(el).mouseenter(function(event) {
                $(el).addClass('active');
                $('.subNavBox').find('li').eq(index).addClass('active');
            });
            $(el).mouseleave(function(event) {
                $(el).removeClass('active');
                $('.subNavBox').find('li').eq(index).removeClass('active');
            });
            
        })


        //娓氀嗙珶閺嶏拷
        $('.mune,.cancel,.footMap').click(function(event) {
            $('.sitemaps').fadeToggle(500);
        });
        $('.backtop').click(function() {
            $('html, body, .content').animate({ scrollTop: 0 }, 500);
            return false;
        });
        var commonWrap=$('.commonWrap').clone().addClass("on").hide();
        $('.commonHtml').append(commonWrap);
        $(window).scroll(function() {
            var scrollValue = $(window).scrollTop();
            var winW = $(window).width();
            //console.log(scrollValue)
            // 鏂板澶撮儴js
            scrollValue > 80 ? $('.headHome ').addClass("headBg") : $('.headHome').removeClass("headBg");

            scrollValue > 100 ? $('.service,.bird,.code,.doubt,.mune').fadeIn().addClass("fadeInRight") : $('.service,.bird,.code,.doubt,.mune').removeClass("fadeInRight").fadeOut();
            scrollValue > 100 ? $('.backtop').fadeIn().addClass("fadeInUp") : $('.backtop').removeClass("fadeInUp").fadeOut();
            if (winW > 1200) {
                scrollValue > 369 ? commonWrap.show() : commonWrap.hide();
            } else {
                var temH = $('.commonHtml .bannerBox').height();
                scrollValue > temH ? commonWrap.show() : commonWrap.hide();
            }

        });

        // $('.foot').find('.vs').mouseenter(function(event) {
        //     $('.vsBox').fadeIn('400');
        // });
        // $('.foot').find('.vs').mouseleave(function(event) {
        //     $('.vsBox').fadeOut('400');
        // });
        // 鏇存柊淇敼 footer
        $('.footer').find('.vs').each(function(index, el) {
            var winW = $(window).width();
            if (winW < 480) {
                $(el).on('touchstart', function(event) {
                    event.stopPropagation();
                    var box = $('.vsBox').eq(index);
                    $('.vsBox').fadeOut('400');
                    if (box.css('display') == 'block') {
                        box.fadeOut('400');
                    } else {
                        box.fadeIn('400');
                    }
                });

            } else {
                $(el).mouseenter(function(event) {
                    $('.vsBox').eq(index).fadeIn('400');
                });
                $(el).mouseleave(function(event) {
                    $('.vsBox').eq(index).fadeOut('400');
                });
            }
        });
        $('body').on('touchstart', function() {
            $('.vsBox').fadeOut('400');
        })
            //閸濆秴绨查崘鍛淬€夌€佃壈鍩�
        function mediaSubnav() {
            var winW = $(window).width();
            var width_ = 0;
            if (winW < 760) {
                $('.commonHtml .commonWrap .container .subNav .tabBox ul').find('li').each(function(index, el) {
                    width_ += $(el).outerWidth();
                });
                $('.commonHtml .commonWrap .container .subNav .tabBox ul').width(width_ + 2)
            } else {
                $('.commonHtml .commonWrap .container .subNav .tabBox ul').width('auto')
            }
        }

        function scrollSubnav() {
            if ($(window).width() < 760) {
                if ($('.subNav .tabBox').find('.active').length != 0) {
                    $('.subNav .tabBox').animate({
                        scrollLeft: $('.subNav .tabBox').find('.active').offset().left - 20
                    }, 500);
                }

            }
        }
        // scrollSubnav();
        setTimeout(scrollSubnav, 500);
        mediaSubnav();
        //閸濆秴绨插蹇擃嚤閼革拷
        $(".mediaHeaderBar,.exit-off-canvas").click(function(event) {
            $(".mediaHeaderBar").toggleClass('is-clicked');
            if ($(".mediaNav").width() == 0) {
                $(".mediaNav,.exit-off-canvas").width($(window).width() / 2);
                $("body").css("left", $(window).width() / 2);
                $(".head").css("left", $(window).width() / 2);
                $(".footer").css("left", $(window).width() / 2);
            } else {
                $(".mediaNav,.exit-off-canvas").width(0);
                $("body").css("left", 0);
                $(".head").css("left", 0);
                $(".footer").css("left", 0);
            }
        });
        $(window).resize(function() {
            mediaBanner();
            mediaSubnav();
            if ($(window).width() < 986) {
                if ($(".mediaNav").width() > 0) {
                    $(".mediaNav,.exit-off-canvas").width($(window).width() / 2);
                    $("body").css("left", $(window).width() / 2);
                    $(".head").css("left", $(window).width() / 2);
                    $(".footer").css("left", $(window).width() / 2);
                }
            } else {
                $(".mediaNav,.exit-off-canvas").width(0);
                $("body").css("left", 0);
                $(".head").css("left", 0);
                $(".footer").css("left", 0);
            }

        });
        $(".mediaNav dt").click(function(event) {
            if ($(this).parents('dl').hasClass('openNav')) {
                $(this).parents('dl').height($(this).height());
                $(this).parents('dl').removeClass('openNav');

            } else {
                $(".openNav").height($(".openNav").find('dt').height());
                $(this).parents('dl').addClass('openNav').siblings('dl').removeClass('openNav');
                var length = $(this).parents('dl').children('dd').length;
                var height_ = $(".openNav").find('dd').eq(0).height();
                $(".openNav").height(height_ * length + $(".openNav").find('dt').height());
                //console.log($(this).parents('dl').children('dd').length);
            }
        });

        //commonhtml
        function mediaBanner() {
            var winW = $(window).width();
            if (winW < 1200) {
                $('.commonHtml .bannerBox').height(winW * 0.32);
                $('.commonHtml .bannerBox li').height(winW * 0.32);
            } else {
                $('.commonHtml .bannerBox').height(350);
                $('.commonHtml .bannerBox li').height(350);
            }
        }
        mediaBanner();

    })

});

function slide4(className) {
    var upVil = 0;

    function resizeSlide() {
        if ($(window).width() < 650) {
            $(className + " .tempWrap").width(304);
            if (upVil != 1) {
                upVil = 1;
                jQuery("className").slide({
                    mainCell: ".bd ul",
                    prevCell: ".left",
                    nextCell: ".right",
                    effect: "left",
                    vis: 1,
                    easing: "easeOutCirc",
                    pnLoop: true,
                    scroll: 1
                });
            }
        } else if ($(window).width() < 960) {
            $(className + " .tempWrap").width(608);
            if (upVil != 2) {
                upVil = 2;
                jQuery("className").slide({
                    mainCell: ".bd ul",
                    prevCell: ".left",
                    nextCell: ".right",
                    effect: "left",
                    vis: 2,
                    easing: "easeOutCirc",
                    pnLoop: true,
                    scroll: 2
                });
            }
        } else if ($(window).width() < 1456) {
            $(className + " .tempWrap").width(912);
            if (upVil != 1) {
                upVil = 1;
                jQuery("className").slide({
                    mainCell: ".bd ul",
                    prevCell: ".left",
                    nextCell: ".right",
                    effect: "left",
                    vis: 3,
                    easing: "easeOutCirc",
                    pnLoop: true,
                    scroll: 3
                });
            }
        } else if ($(window).width() > 1456) {
            $(className + " .tempWrap").width(1216);
            if (upVil != 0) {
                upVil = 0;
                jQuery("className").slide({
                    mainCell: ".bd ul",
                    prevCell: ".left",
                    nextCell: ".right",
                    effect: "left",
                    vis: 4,
                    easing: "easeOutCirc",
                    pnLoop: true,
                    scroll: 4
                });
            }
        }
    }
    resizeSlide();
    $(window).resize(function() {
        resizeSlide();
    })
}