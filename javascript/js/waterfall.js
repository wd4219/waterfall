window.onload = function(){
    waterfall("main","pin");
    var dataInt = {'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll = function()
    {
        if (checkScollSide())
        {
        	//构建元素，进行动态加载
            var oParent = document.getElementById("main");
            for(var i = 0;i < dataInt.data.length;i++)
            {
                var oPin = document.createElement("div");
                oPin.className = "pin";
                oParent.appendChild(oPin);
                var oBox = document.createElement("div");
                oBox.className = "box";
                oPin.appendChild(oBox);
                var oImg = document.createElement("img");
                oImg.src = "images/" + dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall("main","pin");
        }
    }
}
//通过父元素获取一类子元素数组
function getClassObj(parent,className)
{
    var obj = parent.getElementsByTagName("*");
    var pins = [];
    for (var i = 0;i < obj.length;i++)
    {
        if(obj[i].className == className)
        {
            pins.push(obj[i]);
        }
    }
    return pins;
}
//检查是否滑动滚动条
function checkScollSide()
{
    var oParent = document.getElementById("main");//获取顶层容器
    var aPin = getClassObj(oParent,"pin");//通过类名获取每个图片的外包围盒子
    var lastPinH = aPin[aPin.length-1].offsetTop + Math.floor(aPin[aPin.length-1].offsetHeight/2);//取到最后一个图片盒子中间距离文档顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//获得滚动条滚动高度，兼容性写法
    var documentH = document.documentElement.clientHeight;//获得窗口高度可视区域高度
    return (lastPinH < scrollTop + documentH) ? true:false;//比较最后一个盒子与文档高度，判断是否动态加载
}
function getMinHeightIndex(arr,minH)//返回数组中某一个数的索引值
{
    for(var i in arr)
    {
        if (arr[i] ==minH)
        {
            return i;
        }
    }
}
function waterfall(parent,pin)
{
    var oParent = document.getElementById(parent);
    var aPin = getClassObj(oParent,pin);
    var iPinW = aPin[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth/iPinW);
    oParent.style.cssText = "width:" + iPinW*num + "px;margin:0 auto";
    //上面三行代码,使瀑布流居中显示

    var pinHArr = [];
    for (var i = 0;i < aPin.length;i++)
    {
        var pinH = aPin[i].offsetHeight;
        if(i < num)
        {
            pinHArr[i] = pinH;
        }
        else
        {
            var minH = Math.min.apply(null,pinHArr);//取出数组中的最小值
            var minHIndex = getMinHeightIndex(pinHArr,minH);//获取数组中最小值的索引
            aPin[i].style.position="absolute";//设置为绝对定位,下面两行为职位具体位置
            aPin[i].style.top = minH + "px";
            aPin[i].style.left = aPin[minHIndex].offsetLeft + "px";
            pinHArr[minHIndex] += aPin[i].offsetHeight;//修改该索引的高度
        }
    }
}
