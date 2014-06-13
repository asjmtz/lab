/*
 * jquery.comparison 0.1
 * Copyright (c) 2014 asjmtZhang
 * Date: 2014-03-22
 * 使用comparison通过鼠标控件比较两张图片
 */

(function($){
    $.fn.comparison = function(options){
        
        var defaults = {
			compFrame1 : $("#compFrame1"),
			compFrame2 : $("#compFrame2")
		}
    
    	var options = $.extend(defaults, options);
    	var controlSwitch ;
    	this.each(function(){

    		var comp = $(this);
			var compController = $("<div id='compController'></div>");
			comp.append(compController);

			//mousedrag event
			
			compController.on("mousedown",function(){
				controlSwitch = true;
				//console.log("down",controlSwitch);

			}).on("mouseup",function(){
				controlSwitch = false;
				
				//console.log("up",controlSwitch);
			});

			comp.mousemove(function(event){
				//console.log(controlSwitch)
				if(controlSwitch)
				{	
					//arrow follows mouse
					var curX = event.pageX - $(this).offset().left;
					var curY = event.pageY - $(this).offset().top;
					compController.css({
						"marginLeft" : curX+"px"
						//"marginTop" :curY+"px"　
					});
					//console.log(curX + " : " +curY);

					//compFrame1 changes his width

					options.compFrame1.width(curX);
				}


			});


    	});
    };

})(jQuery);