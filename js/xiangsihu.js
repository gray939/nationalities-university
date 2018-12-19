window.onload = function(){
	
	var Hh = $("#pic > ul > li").height();
	$("#pic").css({"height":Hh + "px"})
	$("#prev").css({"top":Hh/2-29 + "px"})
	$("#next").css({"top":Hh/2-29 + "px"})
	window.onresize = function () {
		var Hh = $("#pic > ul > li").height();
		$("#pic").css({"height":Hh + "px"})
		$("#prev").css({"top":Hh/2-29 + "px"})
		$("#next").css({"top":Hh/2-29 + "px"})
	}
	
	function ss(){
		if($("#u8_api")){
			$("#u8_api").css({"width":"280px","height":"155px"});
		}
	}
	var timeSS = setInterval(ss,10);
}
		var k = 0;

		var aLi = $("#pic ul li").length;
		
		$("#next").click(function(){   //下一张
			clearInterval(timer);
			jnu();
			})
		
		$("#prev").click(function(){   //上一张
			clearInterval(timer);
			minu();
			})
		
		
		function jnu(){  
		 
		        
			k++;
			if(k>aLi-1){
			k=0;
			}
			if(k<0){
			  k=aLi-1;
			}
				
			$("#pic ul li").eq(k).siblings().animate({opacity:0},800);
			$("#pic ul li").eq(k).animate({opacity:1},800);
			$(".bannerColl_img_li").css("display","none");
			$(".bannerColl_img_li").eq(k).css("display","block");
			$(".bannerColl_img").css("display","none");
			$(".bannerColl_img").eq(k).css("display","block");
		};
		
		function minu(){   
			k--;
			if(k>aLi){
			k=0;
			}
			if(k<0){
			k=aLi-1;
			}
			$(".bannerColl_img_li").css("display","none");
			$(".bannerColl_img_li").eq(k).css("display","block");
			$(".bannerColl_img").css("display","none");
			$(".bannerColl_img").eq(k).css("display","block");
			$("#pic ul li").eq(k).siblings().animate({opacity:0},800);
			$("#pic ul li").eq(k).animate({opacity:1},800);
				
		};
		
		
		
		timer = setInterval("jnu()",4000);   
		
		$("#pic").mouseover(function(){
			clearInterval(timer);
		})
		$("#pic").mouseout(function(){
			clearInterval(timer);
			timer = setInterval("jnu()",4000);
		})

		$("#picroll .picroll_pic").mouseover(function(){
			$(this).animate({ paddingTop:'35px'},{ queue: false, duration: 300 });
		});
		$("#picroll .picroll_pic").mouseout(function(){	
			$(this).animate({ paddingTop:'20px'},{ queue: false, duration: 300 });
		});
		
		$(".content_l_cont div").eq(0).bind("mousemove",function(){
			   $("#cb_tzgg_rA").css("display","block");
			   $("#cb_tzgg_rB").css("display","none");
			   $(this).css("background","#e3a616").siblings().css("background","#FC6")
			})
		$(".content_l_cont div").eq(1).bind("mousemove",function(){   
			   $("#cb_tzgg_rA").css("display","none");
			   $("#cb_tzgg_rB").css("display","block");
			   $(this).css("background","#e3a616").siblings().css("background","#FC6")
			})
        
		