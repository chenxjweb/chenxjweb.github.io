var h=document.getElementsByTagName('h1')[0];

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var balls = [];
var number=150;

// 生成随机数
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// Ball构造函数

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

// 绘制balls

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

// 更新balls

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

// 碰撞检测

Ball.prototype.collisionDetect = function (i) {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                if(this.size<balls[j].size){
                    balls[j].size+=1;
                    balls.splice(i,1);
                    number--;
                    h.innerHTML="剩余"+number+"个小球";
                }else{
                    balls[i].size+=1;
                    balls.splice(j,1);
                    number--;
                    h.innerHTML="剩余"+number+"个小球";
                }
            }
        }
    }
};


// 循环

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < number) {
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-3, 3),
            random(-3, 3),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(10, 20)
        );
        balls.push(ball);
    }

    h.innerHTML="剩余"+number+"个小球";

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect(i);
    }

    requestAnimationFrame(loop);
}


loop();