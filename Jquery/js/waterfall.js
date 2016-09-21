$( window ).on( "load", function(){
    // 调用waterfall函数
    waterfall();
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        // 拖动滚动条时
        if(checkscrollside()){
            $.each(dataInt.data, function(index, item){

                var $oPin = $('<div>').addClass('pin').appendTo($("#main"));
                var $oBox = $('<div>').addClass('box').appendTo($oPin);
                $('<img>').attr('src', 'images/'+$(item).attr('src')).appendTo($oBox);
            });
            waterfall();
        }
    }
});
function waterfall(){
    // 计算及定位数据块显示分散效果
    var boxes=$(".pin");
    var parent=$("#main");
    var boxesW=boxes.eq(0).outerWidth();
    var windowW=$(window).width();
    var cols=Math.floor(windowW/boxesW);
    parent.css({
        "width":cols*boxesW+"px",
        "margin":"0 auto"
    });

    var boxH=[];
    boxes.each(function(index,item){
        if(index<cols){
            boxH[index]=boxes.eq(index).outerHeight();
        }else{
            var minH=Math.min.apply(null,boxH);
            var minIndex=$.inArray(minH,boxH);
            $(item).css({
                "position":"absolute",
                "top":minH+"px",
                "left":minIndex*boxesW+"px",
            });
            boxH[minIndex]+=boxes.eq(index).outerHeight();
        }
    })
}


function checkscrollside(){
    // 检测是否具备了加载数据块的条件
    var parent=$("#main");
    var boxes=$(".pin");
    var lastH=boxes.last().offset().top+Math.floor(boxes.last().outerHeight()/2);
    var scrollH=$(window).scrollTop()+$(window).height();
    return (lastH<scrollH)?true:false;
}