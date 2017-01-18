var app = getApp();
var config = require('../../utils/config/lightConfig.js');
const ctx = wx.createCanvasContext('myCanvas');

let cList = [];
let sList = [];
let backImg;
let cr;
let cm;
let state = 'default';
let disable = false;

function checkIn(x,y,r){
    for(let p of cList){

        if(p.checked){
            continue;
        }
        let dist = Math.sqrt(Math.pow((p.x-x),2) + Math.pow((p.y-y),2),2);
        if(dist < r){
            p.check();
            sList.push(p);
        }
    }
}

function Point(x,y,value){
    this.x = x;
    this.y = y;
    this.value = value;
    this.checked = false;
    this.check = function(){
        this.checked = true;
    }
}
function draw(winWidth){
    const count = [0, 1, 2];
    cr = winWidth / 8 - config.circle.lineWidth;
    cm = winWidth / (4 * 6);
    count.forEach(function(row) {
        count.forEach(function(column) {
            var x = (cr + config.circle.lineWidth + cm) * (2 * column + 1);
            var y = cr + config.circle.lineWidth + cm + 2 * row * (cr + config.circle.lineWidth + cm);
            cList.push(new Point(x,y,row*3 + column));
            ctx.beginPath();
            ctx.moveTo(x + cr, y);
            ctx.arc(x, y, cr, 0, 2 * Math.PI);
            ctx.setLineWidth(config.circle.lineWidth);
            ctx.setStrokeStyle(config.circle.default.strokeStyle);
            ctx.stroke();
        });
    });
    ctx.draw()
}


function drawDotAndLine(){
    cList.forEach(function(p,index){
        let row = parseInt(index / 3);
        let column = index % 3;
        var x = (cr + config.circle.lineWidth + cm) * (2 * column + 1);
        var y = cr + config.circle.lineWidth + cm + 2 * row * (cr + config.circle.lineWidth + cm);

        ctx.beginPath();


        ctx.moveTo(x + cr, y);
        if(p.checked){
            ctx.setStrokeStyle(config.circle[state].strokeStyle);
        }else{
            ctx.setStrokeStyle(config.circle.default.strokeStyle);
        }
        ctx.setLineWidth(config.circle.lineWidth);
        ctx.arc(x, y, cr, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        if(p.checked){
            ctx.beginPath();
            ctx.setFillStyle(config.dot[state].fillStyle);
            ctx.arc(x,y,config.dot.size,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    });

    if(sList.length > 1){
        ctx.setStrokeStyle(config.line[state].strokeStyle);
        ctx.setLineWidth(config.line.lineWidth);
        ctx.beginPath();
        for(let index = 1;index < sList.length;index++){
            let prePoint = sList[index - 1];
            let point = sList[index];
            ctx.moveTo(prePoint.x,prePoint.y);
            ctx.lineTo(point.x,point.y);
            ctx.stroke();
        }
        ctx.closePath();
    }

    ctx.draw();
}

Page({
    data: {
        canvasHeight: 0,
        x: 0,
        y: 0,
        touchId:false,
        touching:false
    },
    onLoad() {
        wx.getSystemInfo({
            success:(res) => {
                let winWidth = res.windowWidth;
                this.setData({
                    canvasHeight: winWidth * 2
                });
                draw(winWidth);
            }
        })
    },
    start(e){
        if(this.data.touchId === false && !disable){
            this.setData({
                touching:true,
                touchId:e.touches[0].identifier,
                x: e.touches[0].x,
                y: e.touches[0].y
            });
        }

    },
    move(e){
        let touch = e.changedTouches.filter((t)=>{
            return t.identifier === this.data.touchId;
        })[0]

        if(touch && !disable){
            this.setData({
                x: touch.x,
                y: touch.y
            });

            checkIn(touch.x,touch.y,this.data.canvasHeight/16);
            ctx.clearRect(0,0,0,0);
            drawDotAndLine();
        }

    },
    end(e){
        let touch = e.changedTouches.filter((t)=>{
            return t.identifier === this.data.touchId;
        })

        if(touch && !disable){
            this.setData({
                touchId:false,
                touching:false,
            });
            ctx.clearRect(0,0,this.data.canvasHeight,this.data.canvasHeight);

            var rests = sList.map((p) => p.value).toString();

            if(rests === '0,3,6,7,8'){
                state = 'right';
            }else{
                state = 'wrong';
            }
            drawDotAndLine();
            disable = true;

        }

    },
    reset(){
        disable = false;
        ctx.clearRect(0,0,this.data.canvasHeight,this.data.canvasHeight);
        ctx.draw();
        cList = [];
        sList = [];
        state = 'default';
        draw(this.data.canvasHeight/2);
    },
    showPwd(){
        let pwd = sList.map((p)=>p.value).toString();
        if(pwd){
            wx.showModal({
                title:'显示密码',
                content:pwd,
                showCancel:false
            });
        }else{
            wx.showModal({
                title:'提示信息',
                content:'没有手势密码',
                showCancel:false
            });
        }
    }
})
