(function(){
	var el=document.getElementById('nav');
	var mi=function (_e){
		this.className='h_bg';
		var e=_e||window.event;
		var that=e.relatedTarget||e.fromElement;
		if(that){
			if(this.compareDocumentPosition&&this.compareDocumentPosition(that)==20||this.contains&&this.contains(that)){
				return;
			}
		}
		var ds=this.getElementsByTagName('ul');
		if(ds.length){
			ds[0].style.display='block';
		}
	};
	var mo=function (_e){
		var e=_e||window.event;
		var that=e.relatedTarget||e.toElement;
		if(that){
			if(this.compareDocumentPosition&&this.compareDocumentPosition(that)==20||this.contains&&this.contains(that)){
				return;
			}
		}
		this.className='';
		var ds=this.getElementsByTagName('ul');
		if(ds.length){
			ds[0].style.display='none';
		}
	};
	for(var i=0,cns=el.childNodes,l=cns.length;i<l;i++){
		if(cns[i].nodeType!=1||cns[i].nodeName.toLowerCase()!='li'){
			continue;
		}
		cns[i].onmouseover=mi;
		cns[i].onmouseout=mo;
	}
})();



(function($){
    $.fn.ckSlide = function(opts){
        opts = $.extend({}, $.fn.ckSlide.opts, opts);
        this.each(function(){
            var slidewrap = $(this).find('.ck-slide-wrapper');
            var slide = slidewrap.find('li');
            var count = slide.length;//计算对象长度
            var that = this;//存放对象
            var index = 0;//起始位置
            var time = null;
            $(this).data('opts', opts);//给轮播对象
            // next
            $(this).find('.ck-next').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }
                
                var old = index;
                if(index >= count - 1){
                    index = 0;
                }else{
                    index++;
                }
                change.call(that, index, old);
            });
            // prev
            $(this).find('.ck-prev').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }
                
                var old = index;
                if(index <= 0){
                    index = count - 1;
                }else{                                      
                    index--;
                }
                change.call(that, index, old);
            });
			
            $(this).find('.ck-slidebox li').each(function(cindex){
                $(this).on('click.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });
			
			$(this).find('.ck-slidebox li').each(function(cindex){
                $(this).on('mouseover.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });
           
            $(this).on('mouseover', function(){
                if(opts.autoPlay){
                    clearInterval(time);
                }
                $(this).find('.ctrl-slide').css({opacity:0.6});
            });
           
            $(this).on('mouseleave', function(){
                if(opts.autoPlay){
                    startAtuoPlay(opts.interval);
                }
                $(this).find('.ctrl-slide').css({opacity:0.1});
            });
            startAtuoPlay(opts.interval);
            
            function startAtuoPlay(inum){
                if(opts.autoPlay){
                    time  = setInterval(function(){
                        var old = index;
                        if(index >= count - 1){
                            index = 0;
                        }else{
                            index++;
                        }
                        change.call(that, index, old);
                    }, inum);//2秒
                }
            }
            // 修正box  标记居中
            var box = $(this).find('.ck-slidebox');
            box.css({
                'margin-left':-(box.width() / 2)
            })
            // dir  移动方向参数
            switch(opts.dir){
                case "x":
                    opts['width'] = $(this).width();
                    slidewrap.css({
                        'width':count * opts['width']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative',
						'margin-left':'0px'
                    });
					
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                    break;
				case "y":  //添加垂直移动参数
                    opts['height'] = $(this).height();
                    slidewrap.css({
                        'height':count * opts['height']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative',
						'margin-top':'0px'
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                break;
            }
        });
    };
    function change(show, hide){
		//获取之前设置在ckSlide对象上的参数 数据
        var opts = $(this).data('opts');
		//水平移动
        if(opts.dir == 'x'){
            var x = show * opts['width'];
			//animate() 与css()执行结果相同，但是过程不同，前者有渐变动画效果
            $(this).find('.ck-slide-wrapper').stop().animate({'margin-left':-x}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true;//图片在移动过程中设置按钮点击不可用，确保每一次轮播视觉上执行完成，
        }else if(opts.dir == 'y'){//垂直移动——自己添加
            var y = show * opts['height'];
            $(this).find('.ck-slide-wrapper').stop().animate({'margin-top':-y}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true;
        }
		else{
			//默认的淡隐淡出效果
            $(this).find('.ck-slide-wrapper li').eq(hide).stop().animate({opacity:0});
            $(this).find('.ck-slide-wrapper li').eq(show).show().css({opacity:0}).stop().animate({opacity:1});
        }
       //切换对应标记的颜色
        $(this).find('.ck-slidebox li').removeClass('current');
        $(this).find('.ck-slidebox li').eq(show).addClass('current');
    }
    $.fn.ckSlide.opts = {
		autoPlay: false,//默认不自动播放
        dir: null,//默认淡隐淡出效果
        isAnimate: false,//默认按钮可用
		interval:2000//默认自动2秒切换 
		 };
})(jQuery);


function _tplimagescroll_UpMarquee(id)
{
    try
    {
        var demo = document.getElementById(id);
        var demo1 = demo.childNodes[0].nodeType == 3?demo.childNodes[1]:demo.childNodes[0];
        var demo2 = demo.childNodes[demo.childNodes.length-1].nodeType == 3?demo.childNodes[demo.childNodes.length-2]:demo.childNodes[demo.childNodes.length-1];
        if(demo2.offsetHeight-demo.scrollTop<=0)
        {
            demo.scrollTop-=demo1.offsetHeight
        }
        else
        {
            demo.scrollTop++;
        }
    }
    catch(e)
    {
    }
}
function _tplimagescroll_UpInit(id,speed)
{
    if(speed < 1)
    {
        speed = 1;
    }
    var MyMar=setInterval("_tplimagescroll_UpMarquee('"+id+"')",speed);
    var demo = document.getElementById(id);
    var demo1 = demo.childNodes[0].nodeType == 3?demo.childNodes[1]:demo.childNodes[0];
    var demo2 = demo.childNodes[demo.childNodes.length-1].nodeType == 3?demo.childNodes[demo.childNodes.length-2]:demo.childNodes[demo.childNodes.length-1];
    demo.onmouseover = function() {clearInterval(MyMar);}
    demo.onmouseout = function() {MyMar=setInterval("_tplimagescroll_UpMarquee('"+id+"')",speed);}
    demo2.innerHTML = demo1.innerHTML;
}
function _tplimagescroll_LeftMarquee(id)
{
    try
    {
        var demo = document.getElementById(id);
        var d1 = demo.childNodes[0].nodeType == 3?demo.childNodes[1]:demo.childNodes[0];
        var d2 = d1.childNodes[0].nodeType == 3?d1.childNodes[1]:d1.childNodes[0];
        var d3 = d2.childNodes[0].nodeType == 3?d2.childNodes[1]:d2.childNodes[0];
        var demo1 = d3.childNodes[0].nodeType == 3?d3.childNodes[1]:d3.childNodes[0];
        var demo2 = d3.childNodes[d3.childNodes.length-1].nodeType == 3?d3.childNodes[d3.childNodes.length-2]:d3.childNodes[d3.childNodes.length-1];
        if(demo2.offsetWidth-demo.scrollLeft<=0)
        {
            demo.scrollLeft-=demo1.offsetWidth;
        }
        else
        {
            demo.scrollLeft++;
        }
    }
    catch(e)
    {
    }
}
function _tplimagescroll_LeftInit(id,speed)
{
    if(speed < 1)
    {
        speed = 1;
    }
    var MyMar=setInterval("_tplimagescroll_LeftMarquee('"+id+"')",speed);
    var demo = document.getElementById(id);
    var d1 = demo.childNodes[0].nodeType == 3?demo.childNodes[1]:demo.childNodes[0];
    var d2 = d1.childNodes[0].nodeType == 3?d1.childNodes[1]:d1.childNodes[0];
    var d3 = d2.childNodes[0].nodeType == 3?d2.childNodes[1]:d2.childNodes[0];
    var demo1 = d3.childNodes[0].nodeType == 3?d3.childNodes[1]:d3.childNodes[0];
    var demo2 = d3.childNodes[d3.childNodes.length-1].nodeType == 3?d3.childNodes[d3.childNodes.length-2]:d3.childNodes[d3.childNodes.length-1];
    demo.onmouseover = function() {clearInterval(MyMar);}
    demo.onmouseout = function() {MyMar=setInterval("_tplimagescroll_LeftMarquee('"+id+"')",speed);}
    demo2.innerHTML = demo1.innerHTML;
}



function getVersion()
{
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=b_version.split(";");
    var trim_Version=version[1].replace(/[ ]/g,"");
    return (browser=="Microsoft Internet Explorer" && trim_Version=="MSIE10.0");
}

function ImageChangeNews(uid, width, height, interval, duration, btitle, bsummary, zoomtype, zoomout)
{
    var _this = this; 

    _this.imgs = new Array(); //图片组
    _this.urls = new Array(); //链接组
    _this.titles = new Array(); //标题组
    _this.summarys = new Array(); //摘要组
    
    _this.nextIndex=0;   //下次显示的滚动图
    _this.currentIndex=-1;   //当前显示的滚动图
    _this.firstFlag = 0;  //标识是否为第一次开始执行
    _this.currentTimer = null;     //标识作用     
    
    //图片加载完毕事件
    _this.onimgload = function(loadIndex)
    {
        _this.imgs[loadIndex].setAttribute("loadedflag", true);
        if(loadIndex == _this.currentIndex)
        {
            _this.constrainimg(document.getElementById(uid + "pic"), _this.imgs[loadIndex], document.getElementById(uid + "imgdiv"));
        }
    }   
    
    //添加图片
    _this.addimg = function(img, url, title, summary)
    {
        var imgcount = _this.imgs.length;
        _this.imgs[imgcount] = new Image();
        
        _this.imgs[imgcount].onload = function(){_this.onimgload(imgcount)};
        
        _this.imgs[imgcount].src = img;
        
        _this.urls[imgcount] = url;
        _this.titles[imgcount] = title;
        _this.summarys[imgcount] = summary;
        
    }

    //触发图片改变
    _this.changeimg = function (n)
    {       
        if(_this.imgs.length < 1)
        {       
            return;       
        }       
        
        if(_this.currentTimer != null)
            window.clearInterval(_this.currentTimer); //清除用于循环的currentTimer  
        
        _this.currentTimer = window.setInterval(_this.onchangeimg, interval * 1000);//设置循环周期为4000
        
        _this.nextIndex = n; //要显示的ID等于传入的N值,
        _this.onchangeimg();
    }
    
    //改变图片操作
    _this.onchangeimg = function()       
    {
        try
        {
             if(_this.imgs.length < 1)
             {       
                 return;       
             }     
             if(_this.firstFlag == 0)
             {
                _this.firstFlag = 1;
             }       
             else if(document.all && !getVersion())
             {
                 var imgfilter = document.getElementById(uid + "div").filters[0];
                 imgfilter.Apply();
                 imgfilter.Play(duration);
                 imgfilter.transition=23;
             }
             //图片未加载完毕
             if(_this.imgs[_this.nextIndex].getAttribute("loadedflag") == null)
             {
                document.getElementById(uid + "pic").src = "/system/resource/images/space.gif";
             }
             else
             {
                //图片正常加载, 设置图片
                _this.constrainimg(document.getElementById(uid + "pic"), _this.imgs[_this.nextIndex], document.getElementById(uid + "imgdiv"));
             }
             //设置当前图片编号
             _this.currentIndex = _this.nextIndex;
             
             
             document.getElementById(uid + "url").href = _this.urls[_this.nextIndex];
			
			 btitle = true;
             if(btitle)
             {       
                 document.getElementById(uid + "newstitle").innerHTML = _this.titles[_this.nextIndex];
                 
                 document.getElementById(uid + "newstitle").href = _this.urls[_this.nextIndex];
                 document.getElementById(uid + "newstitle").title =_this.titles[_this.nextIndex];
             }       
             if(bsummary)
             {
                 document.getElementById(uid + "newssummary").innerHTML = _this.summarys[_this.nextIndex];
                 document.getElementById(uid + "newssummary").href = _this.urls[_this.nextIndex];
             }       
             //设置所有按钮的样式
             for(var i = 0;i < _this.imgs.length; i++)
             {       
                  if(i == _this.nextIndex)
                    document.getElementById(uid + "selectNode"+i).className='imagechangenews_fnode';
                  else
                    document.getElementById(uid + "selectNode"+i).className='imagechangenews_pnode';
             }       
             _this.nextIndex++;       
             if(_this.nextIndex >= _this.imgs.length)
             {
                //如果ID大于总图片数量。则从头开始循环       
                _this.nextIndex = 0;       
             }       
        }       
        catch(e)
        {
        }
    }
    
    //等比例设置图片
    _this.constrainimg = function(imgobj, imagevar, imgdiv)
    {
        try
        {
            var widthrate = imagevar.width / width;
            var heightrate = imagevar.height / height;
            var imgwidth = 0;
            var imgheight = 0;
            
            if(widthrate > 1 || heightrate > 1) //图片过大时
            {
                if(zoomtype)//按比例缩小
                {
                    var rate = Math.max(widthrate, heightrate);
                    imgwidth = Math.max(1, Math.min(imagevar.width/rate, width));
                    imgheight = Math.max(1, Math.min(imagevar.height/rate, height));
                }
                else//拉伸
                {
                    imgwidth = width;
                    imgheight = height;
                }
            }
            else if(widthrate < 1 || heightrate < 1) //图片小
            {
                if(zoomout)//自动放大
                {
                    if(zoomtype)//按比例放大
                    {
                        var rate = Math.max(widthrate, heightrate);
                        imgwidth = Math.max(1, Math.min(imagevar.width/rate, width));
                        imgheight = Math.max(1, Math.min(imagevar.height/rate, height));
                    }
                    else //拉伸
                    {
                        imgwidth = width;
                        imgheight = height;
                    }
                }
                else
                {
                   imgwidth = imagevar.width;
                   imgheight = imagevar.height;
                }
            }
            else //大小合适
            {
               imgwidth = width;
               imgheight = height;
            }

            imgobj.src = imagevar.src;
            imgobj.width = imgwidth;
            imgobj.height = imgheight;
            imgdiv.style.paddingTop = (height - imgheight)/2;
        }
        catch(e)
        {
        }
    }
}