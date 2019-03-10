var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var balls = [];
var bottomNum = 3;
var topNum = 6;
var bottomSize = 40;
var topSize = 35;
var stop = null;

//按键监听
// document.onkeydown=function(e){
//     switch(e.keyCode){
//         case 38:
//             balls[3].velY-=2;
//             balls[3].y-=2;
//             break;
//         case 40:
//             balls[3].velY+=2;
//             balls[3].y+=2;
//             break;
//         case 37:
//             balls[3].velX-=2;
//             balls[3].x-=2;
//             break;  
//         case 39:
//             balls[3].velX+=2;
//             balls[3].x+=2;
//             break;  
//     }
// }

// 生成随机数
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Ball构造函数(圆心、速度、颜色、大小)
function Ball(x, y, velX, velY, color, size, text) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.text = text;
}

//获得距离
Ball.prototype.getDistance = function (obj) {
    var dx = this.x - obj.x;
    var dy = this.y - obj.y;
    var distance = Math.sqrt(dx * dx + dy * dy) - (this.size + obj.size);
    return distance;
};

// 绘制balls
Ball.prototype.draw = function (i) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    // if(i<bottomNum){
    ctx.fillStyle = "#fff";
    ctx.font = "35px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x, this.y);

    // }
};

// 更新balls
Ball.prototype.update = function () {
    if ((this.x + this.size + 2) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size - 2) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size + 2) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size - 2) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

// 碰撞检测
Ball.prototype.detect = function (i) {
    //底部碰撞
    if (i < bottomNum) {
        for (var j = 0; j < bottomNum; j++) {
            if (this != balls[j]) {
                var distance = this.getDistance(balls[j]);
                var dir = this.velX * balls[j].velX;
                if (distance <= 0) {
                    if (dir <= 0) {
                        let temp = this.velX;
                        this.velX = balls[j].velX;
                        balls[j].velX = temp;
                    } else if (dir > 0) {
                        if (this.x < balls[j].x && this.velX > balls[j].velX || this.x > balls[j].x && this.velX < balls[j].velX) {
                            let temp = this.velX;
                            this.velX = balls[j].velX;
                            balls[j].velX = temp;
                        }
                    }

                }
            }
        }
    } else {
        //上边小球碰撞
        for (var a = 0; a < bottomNum; a++) {
            var distance = this.getDistance(balls[a]);
            if (distance <= 1) {
                this.velX = -this.velX;
                this.velY = -this.velY;
                this.color = balls[a].color;
                this.text = balls[a].text.toLowerCase();
                balls[a].velX = -balls[a].velX;
                balls[a].velY = -balls[a].velY;
            }
        }

    }

};

// 循环
function loop() {
    var grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, "#fff");
    grd.addColorStop(1, "#000");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    while (balls.length < bottomNum + topNum) {
        //底部小球
        while (balls.length < bottomNum) {
            let size = bottomSize;
            let x = [
                random(size + 1, width / 3 - size),
                random(width / 3 + size, width / 3 * 2 - size),
                random(width / 3 * 2 + size, width - size - 1)
            ];
            let y = height - size;
            let vx = random(4, 8);
            let vy = 0;
            let color = ["red", "green", "orange"];
            let text = ["W", "E", "B"];
            let ball = new Ball(x[balls.length], y, vx, vy, color[balls.length], size, text[balls.length]);
            balls.push(ball);
        }
        //上边小球
        var need = topNum + bottomNum - balls.length;
        for (let i = 0; i < need; i++) {
            let size = topSize;
            // let x=[
            //     random(size+1,width/3-size),
            //     random(width/3+size,width/3*2-size),
            //     random(width/3*2+size,width-size-1)
            // ];
            let x = random(size + 3, width - size - 3);
            let y = topSize + 3;
            let vx = random(-6, 6) || random(1, 6);
            let vy = random(1, 6);
            let text = ["#", "#", "#"];
            let ball = new Ball(x, y, vx, vy, "#55f", size, text[i % 3]);
            balls.push(ball);
        }
    }


    for (let i = 0; i < balls.length; i++) {
        balls[i].draw(i);
        balls[i].update();
        balls[i].detect(i);
    }
    stop = requestAnimationFrame(loop);
}
loop();