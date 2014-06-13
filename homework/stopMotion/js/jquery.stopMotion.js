/*
 * jquery.stopMotion 0.1
 * Copyright (c) 2014 asjmtZhang
 * Date: 2014-03-22
 * 使用stopMotion插件,将多张序列图片制作成定格动画，由鼠标移动控制时间轴
 */

(function($){
    $.fn.stopMotion = function(options){
        //各种属性、参数
        var defaults = {
			imgSum : 0
		}
    
    	var options = $.extend(defaults, options);
    	
    	var imgSrcHandler = function(imgObj){
			//eval("/" + reStr + "/gi")
    		var pattern = eval("/(\\d{" + imgObj.imgSumLength + "})(\.(jpg|png|gif))$/");
			var imgPatternMatch = imgObj.imgSrc.match(pattern);//options.imgPattern
			var imgSrcObj = {
				head : imgObj.imgSrc.substring(0,imgObj.imgSrc.length - imgPatternMatch[0].length),
				end : imgPatternMatch[2]
			}
			return imgSrcObj;
    	}


    	var getImgNum = function(seek,imgSum,imgSumLength){

			var curImgNum = Math.floor(seek * (imgSum-1)) + "";
			//console.log(curImgNum.length + " : " + imgSumLength);
			while(curImgNum.length < imgSumLength)
			{
				//curImgNum = (Array != curImgNum.constructor) ? curImgNum.split() : curImgNum;
				curImgNum = curImgNum.split();
				curImgNum.unshift(0);
				curImgNum = curImgNum.join("");
				//console.log(curImgNum);
			}

			return curImgNum;
    	}

    	var getImgAttr = function(movieImg,imgSum){

			var imgObj = {
				imgSrc : $.trim(movieImg.attr("src")),
				imgSumLength : (""+(imgSum-1)).length,
				imgWid : movieImg.width()
			}

			
			return imgObj;

    	}
    	this.show = function(){
    		alert("sdsds");
    	}
    	this.each(function(){

    		var movieImg = $(this);
			//var imgWid = movieImg.width();

			movieImg.mousemove(function(e){
				
				var imgObj = getImgAttr($(this) , options.imgSum);

				var seek = (e.pageX - Math.floor($(this).offset().left)) / imgObj.imgWid;
				//console.log(seek);
			
				var imgSrcObj = imgSrcHandler(imgObj);
				
				var curImgNum = getImgNum(seek , options.imgSum , imgObj.imgSumLength);
				//curImgNum = curImgNum.length < imgSumLength ?  10 * (imgSumLength - curImgNum.length) : curImgNum; 
				
				var imgNewSrc = imgSrcObj.head + curImgNum + imgSrcObj.end;
				//console.log(imgNewSrc);
				$(this).attr("src",imgNewSrc);

			})
        	
			//return this;

    	});
    };

})(jQuery);