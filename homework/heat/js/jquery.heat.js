/*
 * jquery.heat 0.1
 * Copyright (c) 2014 asjmtZhang
 * Date: 2014-03-22
 * 使用heat插件，将多行文本数据映射到图片中，并提供鼠标跟随显示
 */


(function($){
    $.fn.heat = function(options){
        //各种属性、参数
        var defaults = {
        	data:""
        }
    
    	var options = $.extend(defaults, options);
    	
    	var dataHandler = function(data){

			var jstr = function(fun){
			    var lines = new String(fun);
			    lines = lines.substring(lines.indexOf("/*") + 4, lines.lastIndexOf("*/")).split(/\r\n/);
			    lines.pop();
			   return lines;
			}

			var dataArr = jstr(data);

			for(var i in dataArr){
				dataArr[i] = dataArr[i].split(",");
			}

			return dataArr;
			//console.log(dataArr);    		
    	}

    	this.each(function(){
        	//img 
        	var thisImg = $(this);
        	
        	//get a array of data
        	var dataArr = dataHandler(options.data);
        	var arrAttr = {
        		arrRow : dataArr.length,
        		arrCol : dataArr[0].length
        	}

        	//msg box for showing data
			var showMSG = $("<div id='showMSG'></div>");
			thisImg.after(showMSG);        	

			//mouse event
			thisImg.mousemove(function(event){
				
				var mouPos = {
					curX : event.pageX - $(this).offset().left,
					curY : event.pageY - $(this).offset().top
				}

				var arrX = mouPos.curX && Math.ceil(mouPos.curX / ($(this).width() / arrAttr.arrCol)) - 1 ;//arr starts from 0
				var arrY = mouPos.curY && Math.ceil(mouPos.curY / ($(this).height()/ arrAttr.arrRow)) - 1 ;//arr starts from 0

				showMSG.html(dataArr[arrY][arrX]);
				showMSG.css({
					"marginTop" : "-"+showMSG.outerHeight()/2+"px",
					"marginLeft":"30px",
					"left" : mouPos.curX,
					"top" : mouPos.curY
				});
				
				//console.log(arrY +" : "+arrX);
			}).mouseleave(function(){
				showMSG.css("display","none");
				//console.log("out");
			}).mouseenter(function(){
				showMSG.css("display","block");
				//console.log("in");
			});

    	});
    };

})(jQuery);