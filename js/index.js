window.addEventListener('load',function () {
    var imgList=document.querySelector('.img-list');
    var prev=document.querySelector('.prev');
    var next=document.querySelector('.next');
    var banner=document.querySelector('.banner');
    var banneWidth=banner.offsetWidth;
    var pointer=document.querySelector('.pointer');
    //防止按钮连续点击
    var flag=true;

    //鼠标进入banner，停止自动播放
    banner.addEventListener('mouseenter',function () {
        clearInterval(timer);
        //清除定时器变量
        timer=null;
    })

    //鼠标离开，启动自动播放
    banner.addEventListener('mouseleave',function () {
        timer=setInterval(function () {
            next.click();
        },2000)
    })

    //动态生成小圆点
    for(var i=0;i<imgList.children.length;i++){
        //创建元素a
        var a=document.createElement('a');
        //设置当前圆点的索引号
        a.setAttribute('index',i);
        //将a标签插入到div中
        pointer.appendChild(a);
        //给圆点设置点击事件
        a.addEventListener('click',function () {
            //清除其它a标签的类名
            for(var i=0;i<pointer.children.length;i++){
                pointer.children[i].className='';
            }
            //设置当前a标签的active类名
            this.className = 'active';
            //得到当前圆点的索引
            var index=this.getAttribute('index');
            //将索引号赋值给num
            num=index;
            //将索引号赋值给circle
            circle=index;

            animate(imgList,-index * banneWidth);
        })
    }
    pointer.children[0].className='active';

    // 克隆第一张图片
    var first=imgList.children[0].cloneNode(true);
    //将克隆的图片插入到ul中
    imgList.appendChild(first);

    //图片滚动
    var num=0;
    //圆点播放
    var circle=0;
    //给下一页按钮绑定点击事件
    next.addEventListener('click',function () {
        //当上一个函数动画执行完毕后再去执行下一个
        if(flag){
            flag=false;
            //图片滚动到最后克隆的一张图片，ul快速到第一张
            if(num == imgList.children.length-1){
                imgList.style.left=0;
                num=0;
            }
            num++;
            animate(imgList,-num * banneWidth,function () {
                flag=true;
            });
            circle++;
            //circle走到最后克隆的一张图片，就复原为0
            if(circle == pointer.children.length){
                circle=0;
            }
            circleMove();
        }
        
    })

    //给上一页按钮绑定点击事件
    prev.addEventListener('click',function () {
        if(flag){
            flag=false;
            if(num==0){
                num=imgList.children.length-1;
                imgList.style.left=-num * banneWidth +'px';
            }
            num--;
            animate(imgList,-num * banneWidth,function () {
                flag=true;
            });
            circle--;
            if(circle <0){
                circle=pointer.children.length-1;
            }
    
            circleMove();
        }
        
    })

    function circleMove () {
        //清除其余小圆圈的active类名
        for(var i=0;i<pointer.children.length;i++){
            pointer.children[i].className='';
        }
        //给当前的小圆圈设置active类名
        pointer.children[circle].className='active';

    }

    //自动播放
    var timer = setInterval(function () {
        // 手动调用点击事件
        next.click();
    },2000)
})