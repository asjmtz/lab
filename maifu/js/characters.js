//敌人类
var Enemy = function(ctx,x,y){
	this.ctx = ctx,
	this.x = x || 0,
	this.y = y || 0,
	this.oriRotate = -90 * Math.PI / 180,//原始角度90度
	this.rotate = 0,
	this.moveSpeedX = 0.2,
	this.moveSpeedY = 0.01,
	this.src = imgURL +"plane.png",
	this.img = new Image(),
	this.img.src = this.src,
	this.width = this.img.width,
	this.height = this.img.height;
	 
};
Enemy.prototype = {
	update: function(){
		var ctx = this.ctx;
		ctx.save();
		//旋转中心调整
		ctx.translate( this.x + this.width/2, this.y + this.height/2 );
		ctx.rotate( this.rotate - this.oriRotate );
		ctx.drawImage(this.img, -this.width/2 , -this.height/2);
		ctx.restore();
	}
}
//主角类
var ball = {
    x: 0,
    y: 0,
    moveSpeedX: 0.5,
    moveSpeedY: 0.5,
    color: "tomato",
    radius: 30,
    width: 64,
    height: 64,
    src: imgURL+"rabbit.png",
    offSrc : imgURL + "off.png"
};