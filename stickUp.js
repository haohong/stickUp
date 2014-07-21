
(function($) {
    $.fn.stickUp = function( options ) {
        // adding a class to users div
        $(this).addClass('stuckMenu');



        var contentTop = [];
        var content = [];
        var lastScrollTop = 0;
        var scrollDir = '';
        var itemClass = '';
        var itemHover = '';
        var menuSize = null;
        var stickyHeight = 0;
        var stickyMarginB = 0;
        var currentMarginT = 0;
        var topMargin = 0;
        var vartop = 0;


        //getting options
        var objn = 0;
        if(options != null) {
            for(var o in options.parts) {
                if (options.parts.hasOwnProperty(o)){
                    content[objn] = options.parts[objn];
                    objn++;
                }
            }
            if(objn == 0) {
                console.log('error:needs arguments');
            }

            itemClass = options.itemClass;
            itemHover = options.itemHover;
            if(options.topMargin != null) {
                if(options.topMargin == 'auto') {
                    topMargin = parseInt($('.stuckMenu').css('margin-top'));
                } else {
                    if(isNaN(options.topMargin) && options.topMargin.search("px") > 0){
                        topMargin = parseInt(options.topMargin.replace("px",""));
                    } else if(!isNaN(parseInt(options.topMargin))) {
                        topMargin = parseInt(options.topMargin);
                    } else {
                        console.log("incorrect argument, ignored.");
                        topMargin = 0;
                    }
                }
            } else {
                topMargin = 0;
            }
            menuSize = $('.'+itemClass).size();
        }
        stickyHeight = parseInt($(this).height());
        stickyMarginB = parseInt($(this).css('margin-bottom'));
        currentMarginT = parseInt($(this).next().closest('div').css('margin-top'));
        vartop = parseInt($(this).offset().top);



        $(document).on('scroll', function() {
            var varscroll = parseInt($(document).scrollTop());

            if (varscroll > lastScrollTop){
                scrollDir = 'down';
            } else {
                scrollDir = 'up';
            }
            lastScrollTop = varscroll;

            if(menuSize != null){
                for(var i=0;i < menuSize;i++)
                {
                    contentTop[i] = $('#'+content[i]+'').offset().top;
                    function bottomView(i) {
                        var contentView = $('#'+content[i]+'').height()*.4;
                        var testView = contentTop[i] - contentView;
                        //console.log(varscroll);
                        if(varscroll > testView){
                            $('.'+itemClass).removeClass(itemHover);
                            $('.'+itemClass+':eq('+i+')').addClass(itemHover);
                        } else if(varscroll < 50){
                            $('.'+itemClass).removeClass(itemHover);
                            $('.'+itemClass+':eq(0)').addClass(itemHover);
                        }
                    }
                    if(scrollDir == 'down' && varscroll > contentTop[i]-50 && varscroll < contentTop[i]+50) {
                        $('.'+itemClass).removeClass(itemHover);
                        $('.'+itemClass+':eq('+i+')').addClass(itemHover);
                    }
                    if(scrollDir == 'up') {
                        bottomView(i);
                    }
                }
            }



            if(vartop < varscroll + topMargin){
                $('.stuckMenu').addClass('isStuck');
                $('.stuckMenu').next().closest('div').css({
                    'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
                }, 10);
                $('.stuckMenu').css("position","fixed");
                $('.isStuck').css({
                    top: '0px'
                }, 10, function(){

                });
            };

            if(varscroll + topMargin < vartop){
                $('.stuckMenu').removeClass('isStuck');
                $('.stuckMenu').next().closest('div').css({
                    'margin-top': currentMarginT + 'px'
                }, 10);
                $('.stuckMenu').css("position","relative");
            };

        });
    }

}(jQuery));
