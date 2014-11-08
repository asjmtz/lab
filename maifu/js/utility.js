// alert("sds");
var ooo = {},
	betaRange = [-20, 50],
	gammaRange = [-20, 20];


var KeyState = {},
	Key = { Up: 38, Down: 40, Left: 37, Right: 39 },
	orientationState = {},
	orientKey = {up: 0, down: 1, left: 2, right: 3},
    ball,
    Enemy,
    imgURL = "img/",
	imgSrcArr = [
		imgURL + "off.png",
		imgURL +"plane.png",
		imgURL + "rabbit.png"
	];


//Array add a function ------> remove()
Array.prototype.remove = function(element) {
	for (var i = 0; i < this.length; i++)
	if (this[i] == element) this.splice(i,1);
};

function preload(images,loading,callback) {
	var now_percent = 0, 
		displaying_percent = 0,
		total = images.length;
	$(images).each(function(){
		var src = this;
		$('<img/>')
		.attr('src', src)
		.load(function() {
			images.remove(src);
			now_percent = Math.ceil(100 * (total - images) / total);
		});
	});

	//show progress
	var timer = window.setInterval(function() {
		if (displaying_percent >= 100) {
				window.clearInterval(timer);
				//show the main stage
				callback();
		} else {
			if (displaying_percent < now_percent) {
				displaying_percent++;
				loading.text(displaying_percent);
			}
		}
	},10);

}

//
function cookieHandler(name, value, time){
	if (name) 
	{
		if (value) 
		{
			if (time) 
			{
				var date = new Date();
				date.setTime(date.getTime() + 864e5 * time), time = date.toGMTString();
			}
			return document.cookie = name + "=" + escape(this.toStr(value)) + (time ? "; expires=" + time + (arguments[3] ? "; domain=" + arguments[3] + (arguments[4] ? "; path=" + arguments[4] + (arguments[5] ? "; secure" : "") : "") : "") : ""), !0;
		}
		return value = document.cookie.match("(?:^|;)\\s*" + name.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^;]*)"), 
			   value = value && "string" == typeof value[1] ? unescape(value[1]) : !1, (/^(\{|\[).+\}|\]$/.test(value) || /^[0-9]+$/g.test(value)) && eval("value=" + value), 
			   value;
	}
	var data = {};
	value = document.cookie.replace(/\s/g, "").split(";");
	for (var i = 0; value.length > i; i++) name = value[i].split("="), name[1] && (data[name[0]] = unescape(name[1]));
	return data;
}


//
function toStr(obj){
	if ( typeof obj == 'object' ) {
		return JSON.stringify(obj);
	} else {
		return obj;
	}
	return '';
}


function isDesktop(){
	return navigator['userAgent'].match(/(ipad|iphone|ipod|android|windows phone)/i) ? false : true;
}