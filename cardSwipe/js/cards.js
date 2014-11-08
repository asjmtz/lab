/*
 * @Author: asjmtz
 * @Date:   2014-08-20 14:45:13
 * @Last Modified by:   asjmtz
 * @Last Modified time: 2014-08-21 18:00:48
 */

var comments = ""
+"/**                                                                                    \n"
+" * 　　　　　　　　┏┓　　　┏┓                                                      \n"
+" * 　　　　　　　┏┛┻━━━┛┻┓                                                    \n"
+" * 　　　　　　　┃　　　　　　　┃                                                    \n"
+" * 　　　　　　　┃　　　━　　　┃                                                    \n"
+" * 　　　　　　　┃　＞　　　＜　┃                                                    \n"
+" * 　　　　　　　┃　　　　　　　┃                                                    \n"
+" * 　　　　　　　┃...　⌒　...　┃                                                    \n"
+" * 　　　　　　　┃　　　　　　　┃                                                    \n"
+" * 　　　　　　　┗━┓　　　┏━┛                                                    \n"
+" * 　　　　　　　　　┃　　　┃　Code is far away from bug with the animal protecting　\n"　　　　　　　　　
+" * 　　　　　　　　　┃　　　┃    神兽保佑,代码无bug                                  \n"
+" * 　　　　　　　　　┃　　　┃　　　　　　　　　　　                                  \n"
+" * 　　　　　　　　　┃　　　┃  　　　　　　                                          \n"
+" * 　　　　　　　　　┃　　　┃                                                        \n"
+" * 　　　　　　　　　┃　　　┃　　　　　　　　　　　                                  \n"
+" * 　　　　　　　　　┃　　　┗━━━┓                                                \n"
+" * 　　　　　　　　　┃　　　　　　　┣┓                                              \n"
+" * 　　　　　　　　　┃　　　　　　　┏┛                                              \n"
+" * 　　　　　　　　　┗┓┓┏━┳┓┏┛                                                \n"
+" * 　　　　　　　　　　┃┫┫　┃┫┫                                                  \n"
+" * 　　　　　　　　　　┗┻┛　┗┻┛                                                  \n"
+" */";


(function($) {

	$.fn.swipe = function(options) {

		//extend default options with those provided
		//if deep extend is true,the merge becomes recursive(递归)
		var opts = $.extend(true, $.fn.swipe.defaults, options);
		var press = {
			flag   : false,
			posX : 0,
			posY : 0,
			moveX: 0,
			moveY: 0
		};
		var winHeight = document.body.clientHeight;
		var that = this;

		//init style on each
		this.init = function(){
			// this.hide();
			this.eq(0).show();
		}


		//move
		this.move = function( self , other , dis ) {

			//"up" is from offsetCard to 0, "down" is from -offsetCard to 0;
			var offsetCard = winHeight;

			//from 1 to scaleRange
			var scaleRange = 0.7;


			//other card translate offset
			var offsetAllMove = winHeight / 3;
			var offsetMove = - dis + winHeight ;

			//cur card scale change
			var scale = 1 - dis / offsetCard * scaleRange ;

			console.log(self.index(),scale,other.index(),offsetMove);

			self.css({
				// 'webkitTransform': 'translateY('+ dis * 0.3 +'px)',
				'webkitTransform': 'scale('+ scale +')'
			});

			other.show().css({
				'z-index': "10",
				'webkitTransform': 'translateY('+ offsetMove +'px)',
			});
		}


		this.addEvent = function(){

		}


		this.each(function(index, el) {

			//init style
			that.init();
		});

		this.on('mousedown touchstart', function(event) {

			//mark this press point
			press.flag = true;
			press.posX = event.pageX;
			press.posY = event.pageY;

		}).on('mouseup touchend',  function(event) {
			var self = $(this);
			var next = self.next().length ? self.next() : self.siblings(':first-child');

			//judge
			var JUDGE_MAGIC = 60;

			//change press info
			press.flag = false;

			//判断吸附切换
			if(event.type == 'touchmove')
			{
				press.moveX = event.originalEvent.targetTouches[0].pageX;
				press.moveY = event.originalEvent.targetTouches[0].pageY;
			}
			else
			{
				press.moveX = event.pageX;
				press.moveY = event.pageY;
			}

			//if switch to next slide
			var isNext = Math.abs( press.moveY - event.pageY ) > JUDGE_MAGIC;

			if(next)
			{
				next.addClass('animated').css({
					'z-index':10,
					'webkitTransform': 'translateY('+ 0 +'px)',
				});
			}

			//在动画完成之后清除style
			window.setTimeout(function(){

				self.removeAttr('style').removeClass('animated')
					.siblings().removeClass('animated').removeAttr('style');
				next.show();
			},500)

		}).on('mousemove touchmove', function(event) {
			var self = $(this);
			var next = self.next().length ? self.next() : self.siblings(':first-child');

			//touchmove event doesn't include the pageX attribute
			if( press.flag )
			{
				//if mobile
				if(event.type == 'touchmove')
				{
					//this event is a jquery event,
					//event.originalEvent is original event in javascript
					press.moveX = event.originalEvent.targetTouches[0].pageX;
					press.moveY = event.originalEvent.targetTouches[0].pageY;
				}
				else
				{
					press.moveX = event.pageX;
					press.moveY = event.pageY;
				}

				//move if pressed
				var dis = ( press.posY - press.moveY );

				//decide direction of press whether up or down
				if (press.moveY < press.posY){

					// console.log("up")
					that.move(self,next,dis);
				}else{
					// console.log("down")
				}
			}
		});


	};

	//将默认的参数写在外外面，对于插件的使用者而言，更容易用较少的代码覆盖和修改插件的配置
	$.fn.swipe.defaults = {
		background: "red"
	}
	console.log(comments);
	//判断浏览器前缀
	//

})(jQuery);




//这个只需要调用一次，且不一定要在ready块中调用
// $.fn.swipe.defaults.foreground = 'blue';
// $("#swipe").swipe();