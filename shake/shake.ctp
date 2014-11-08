<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>HTML5</title>
<script type="text/javascript">
if(window.DeviceMotionEvent) {
	var speed = 10;
	var x = y = lastX = lastY = 0;
	window.addEventListener('devicemotion', function(e){
		var acceleration = e.accelerationIncludingGravity;
		x = parseInt(acceleration.x);
		y = parseInt(acceleration.y);
		if(Math.abs(x-lastX) > speed && Math.abs(y-lastY) > speed) {
			document.getElementById('show').innerHTML = parseInt(document.getElementById('show').innerHTML) + 1;
			lastX = lastY = 0;
		}
	});
}
</script>
</head>

<body>
<div id="id">HTML5</div>
<div id="show">0</div>

</body>
</html>