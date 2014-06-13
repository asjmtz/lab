    var game = new Best.Game({
        FPS: 30,
        width: $(window).width() - 15,
        height: $(window).height(),
        gameTimer: {
        	x: 100,
        	y: 100,
        	value: 0,
        	font: "Arial",
        	color: "#000",
        	size: 20
        },
	    enemiesArr: [2,3,4,10,2,15],
	    enemiesInterval: 3000,
	    gameType: 2,
        onInit: function() {
            this.canvas = document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            this.initStage();
            this.initEvent();
        },
        initEvent: function() {
			var that = this, oldGamma, oldBeta;
        	//键盘事件
			$(window).bind("keydown", function(event){
				KeyState[event.keyCode] = true;
			}).bind('keyup', function(event) {
				KeyState[event.keyCode] = false;		
			}).bind('resize', function(event) {
				// that.pause();
				// that.width = window.innerWidth;
			    // that.height = window.innerHeight;
	   			// this.initStage();
			});

			this.addOrientationEvent(that);
            this.addTouchEvent(that);
   //          if(this.gameType == 1)
   //          {
   //          }
   //          else if(this.gameType == 2)
   //          {
			// }

			// window.ondevicemotion = function(){
			// 	ball.ax = event.accelerationIncludingGravity.x * 5;
			// 	ball.ay = event.accelerationIncludingGravity.y * 5;
			// 	// $(".log").html("ax : "+ ball.ax + "<br/>  ay:  " + ball.ay);
			// }

        },
        initStage: function(){
            this.canvas.width = this.width;
            this.canvas.height = this.height;

        	ball.x = this.width / 2 - ball.width/2;
        	ball.y = this.height / 2 - ball.height/2;
        	this.enemies = [];
        	this.gameTimer.value = 0;
        	this.enemiesArrIndex = 0;
        	KeyState = {};
        	orientationState = {};


           	this.drawTimer();
        	this.drawBall();
           	this.drawEnemy();
        },
        onStart: function() {
			this.initStage();
            // this.timerStart();
            // this.drawEnemy();
        },
        onResume: function(){
            this.stop(); 
            //clear the canvas 
            // this.context.clearRect(0, 0, this.width, this.height);
            $("#console").show();

        },
        drawBall: function(flag){
        	flag = flag === undefined ? true : flag;
        	var ctx = this.context;
        	var img = new Image();
        	img.src = flag ? ball.src : ball.offSrc;
        	ball.width = img.width;
        	ball.height = img.height;
        	ctx.drawImage(img, ball.x, ball.y);
            $(".log").html("x:"+ball.x+"<br>y:"+ball.y);
        },
        drawStage: function(){

        },
        drawTimer: function(){
        	var ctx = this.context,
        		timer = this.gameTimer;
				valueStr = this.valueToTimer(timer.value);
        	ctx.fillStyle = timer.color;
        	ctx.font = timer.size + "px " + timer.font;
            ctx.fillText( valueStr ,timer.x  , timer.y);
        },
        drawEnemy: function(){

        	var ctx, enemiesNumber;
	        ctx = this.context;
        	this.enemiesTimer = 0;
        	enemiesNumber = Math.ceil( Math.random() * this.enemiesArr[this.enemiesArrIndex % this.enemiesArr.length]);
	        // console.log(enemiesNumber);

        	for(var i=0; i<enemiesNumber; i++)
        	{
	        	var rx, ry, ran, e ;
	       		e = new Enemy(ctx);
        		this.enemies.push(e);

	        	ran = this.getRandomAxis(e.width, e.height);
	        	e.x = ran.rx;
	        	e.y = ran.ry;
	        	// console.log(ran.rx, ran.ry);

        		//中心点校准，之后获得运动轨迹方程
        		var bx, by, ex, ey;
        		bx = ball.x + ball.width/2;
        		by = ball.y + ball.height/2;
        		ex = e.x + e.width/2;
        		ey = e.y + e.height/2;
	        	e.a =  ( by - ey ) / ( bx - ex ) ;
	        	e.b = ey - e.a * ex ;

	        	//根据运动轨迹旋转图片
	        	e.rotate = Math.atan2( by - ey , bx - ex );
	        	e.update();
        	}

        },
        handleInput: function(timeStep, now) {

        	if(isDesktop())
        	{
	            if (KeyState[Key.Up]) {
	                this.moveUp(timeStep, now);
	            }
	            else if (KeyState[Key.Down]) {
	                this.moveDown(timeStep, now);
	            }
	            else if (KeyState[Key.Left]) {
	                this.moveLeft(timeStep, now);
	            }
	            else if (KeyState[Key.Right]) {
	                this.moveRight(timeStep, now);
	            }        		
        	}

        },
        moveUp: function( timeStep, now ){
        	//console.log(timeStep,now);
            ball.y -= ball.moveSpeedY * timeStep;
        },
        moveDown: function( timeStep, now ){
            ball.y += ball.moveSpeedY * timeStep;
        },
        moveLeft: function( timeStep, now ){
            ball.x -= ball.moveSpeedX * timeStep;
        },
        moveRight: function( timeStep, now ){
            ball.x += ball.moveSpeedX * timeStep;
        },
        update: function(timeStep, now) {
        	this.gameTimer.value += timeStep;
        	this.enemiesTimer += timeStep;

        	//重新生成一波enemies
        	if(this.enemiesTimer >= this.enemiesInterval)
        	{
        		this.enemiesArrIndex++;
	        	this.drawEnemy();
        	}


        },
        render: function(timeStep, now) {
            this.context.clearRect(0, 0, this.width, this.height);
            //重绘
        	for (var i = 0; i < this.enemies.length; i++) {
        		var e = this.enemies[i];
     	        	e.x += Math.cos(e.rotate) * timeStep * e.moveSpeedX;
	        	e.y = e.x * e.a + e.b; 

        		e.update();
        	};
        	this.drawTimer();

        	//碰撞检测
        	if(this.collisionDetect())
        	{
        		var curScore = this.gameTimer.value,
        			bestScore = cookieHandler('maifu-score');
        		
        		if(!bestScore || curScore > bestScore)
        		{
        			bestScore = curScore;
        			cookieHandler('maifu-score', bestScore, 100);
        		}

        		curScore = this.valueToTimer(this.gameTimer.value);
        		bestScore = this.valueToTimer(bestScore);
        		// this.context.clearRect(ball.x, ball.y, ball.width, ball.height);
	        	//边界检测
        		this.resume();
                this.boundaryDetect();
                this.drawBall(false);
                alert("最高分："+ bestScore +"  ,本次得分："+ curScore);
        	}
        	else
        	{
	        	//边界检测
	        	this.boundaryDetect();
	        	this.drawBall();        		
        	}

        },
        valueToTimer: function(value){
        	var str = value + "";
        	str = str.length < 4 ? (Math.pow( 10 , 4 - str.length ) + str).slice(1) : str;
        	str = str.slice(0,str.length-3) + "'" + str.slice(-3) + "''";
        	// console.log(str,value);
        	return str;
        },
        collisionDetect: function(){
        	var res = false;
        	for (var i = 0; i < this.enemies.length; i++) {
        		var e = this.enemies[i];
        		// console.log(ball.x, e.x + e.width, ball.y, e.y + e.height, e.x, ball.x + ball.width, e.y, ball.y + ball.height);
        		if(ball.x < e.x + e.width && ball.y < e.y + e.height && e.x < ball.x + ball.width && e.y < ball.y + ball.height)
        		{
					res = true;        			
        			break;
        		}	
        	};

        	return res;
        },
        boundaryDetect: function(){
        	ball.x =  ball.x + ball.width > this.width ? (this.width - ball.width) : ( ball.x < 0 ? 0 : ball.x );
        	ball.y =  ball.y + ball.height> this.height ? (this.height - ball.height) : ( ball.y < 0 ? 0 : ball.y );	
        },
        getRandomAxis: function(offsetWidth,offsetHeight){
        	var ran = Math.floor(Math.random() * 4),
        		ranAxis,
        		ranX,
        		ranY;
        	if(ran == 0 || ran == 2)//up and down
        	{
        		ranAxis = Math.random() * this.width;
        		ranX = ranAxis;
        		ranY = ran == 0 ? -offsetHeight : this.height;
        	}
        	else if(ran == 1 || ran == 3)//left or right
        	{
        		ranAxis = Math.random() * this.height;
        		ranX = ran == 3 ? -offsetWidth : this.width;        	
        		ranY = ranAxis;
        	}	
        	return {rx: ranX, ry: ranY};
        },
		mobileBlurMoving: function(oldGamma,oldBeta,curGamma,curBeta){
			var blurNum = 1;
		    return	Math.abs( oldGamma - curGamma ) > blurNum || Math.abs( oldBeta - curBeta ) > blurNum ;
		},
		addOrientationEvent: function(that){
			var oldGamma,oldBeta;

	      	window.addEventListener("deviceorientation", function(event) {
                if(that.gameType == 1)
                {
                    var eventString = "";
                    var x, y;       

                    oldGamma = oldGamma || event.gamma;
                    oldBeta = oldBeta || event.beta;

                    if(that.mobileBlurMoving(oldGamma,oldBeta,event.gamma,event.beta))//
                    {
                        x = oldGamma = event.gamma;
                        y = oldBeta = event.beta;
                        ball.x = (x - gammaRange[0]) * that.width / (gammaRange[1] - gammaRange[0]);
                        ball.y = (y - betaRange[0]) * that.height / (betaRange[1] - betaRange[0]);
                    }

                    eventString += "value"+that.mobileBlurMoving(oldGamma,oldBeta,event.gamma,event.beta)+"<br/>oldGamma"+ oldGamma +"<br/> oldBeta"+ oldBeta +"<br/> x :  "+ ball.x +"<br/> y: "+ ball.y;
                    $(".alpha  .value").html(event.alpha);
                    $(".beta  .value").html(event.beta);
                    $(".gamma  .value").html(event.gamma);
                    $(".log").html("event: "+eventString );                 
                }

	      	}, true);

		},addTouchEvent:function(that){

            var touchFlag;
            window.ontouchstart = function(event){
                var touch = event.touches[0];
                if( touch.pageX >= ball.x && touch.pageX <= ball.x + ball.width && touch.pageY >= ball.y && touch.pageY <= ball.y + ball.height )
                {
                    touchFlag = true;                    
                }
            }

            window.ontouchmove = function(event){
                var touch = event.touches[0];
                if(touchFlag && that.gameType == 2)
                {
                    ball.x = touch.pageX;
                    ball.y = touch.pageY;
                    // $(".log").html("ball.x"+ball.x+"<br>ball.y"+ball.y);
                }
            }

            window.ontouchend = function(){
                touchFlag = false;
            }

        } 
			
    });
