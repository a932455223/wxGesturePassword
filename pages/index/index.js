var app = getApp();

var config = {
    circle: {
        sizeScale: 1,
        lineWidth: 3,
        default: {
            strokeStyle: '#50A2E9'
        },
        wrong: {
            strokeStyle: '#D90106'
        },
        right: {
            strokeStyle: '#21864C'
        }
    },
    line: {
        lineWidth: 3,
        default: {
            strokeStyle: '#50A2E9'
        },
        wrong: {
            strokeStyle: '#D90106'
        },
        right: {
            strokeStyle: '#21864C'
        }
    },
    dot: {
        size: 8,
        default: {
            fillStyle: '#50A2E9'
        },
        wrong: {
            fillStyle: '#D90106'
        },
        right: {
            fillStyle: '#21864C'
        }
    }
};



const ctx = wx.createCanvasContext('myCanvas');
let sList = [];
function rect() {
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
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
                this.draw(winWidth);
            }
        })

    },
    start(e){
        if(this.data.touchId === false){
            this.setData({
                touching:true,
                touchId:e.touches[0].identifier,
                x: e.touches[0].x,
                y: e.touches[0].y
            });
        }

    },
    draw(winWidth){
        const count = [0, 1, 2];
        let cr = winWidth / 8 - config.circle.lineWidth;
        console.log('cr:' + cr);
        console.log('width:' + winWidth);
        let cm = winWidth / (4 * 6);
        count.forEach(function(row) {
            count.forEach(function(column) {
                var x = (cr + config.circle.lineWidth + cm) * (2 * column + 1);
                var y = cr + config.circle.lineWidth + cm + 2 * row * (cr + config.circle.lineWidth + cm);
                ctx.beginPath();
                ctx.moveTo(x + cr, y);
                ctx.arc(x, y, cr, 0, 2 * Math.PI);
                ctx.setLineWidth(config.circle.lineWidth);
                ctx.setStrokeStyle('#EEEEEE')
                ctx.stroke();
            });
        });
        ctx.draw()
    },
    move(e){
        let touch = e.changedTouches.filter((t)=>{
            return t.identifier === this.data.touchId;
        })

        if(touch){
            this.setData({
                x: touch.x,
                y: touch.y
            });
        }

    },
    end(e){
        let touch = e.changedTouches.filter((t)=>{
            return t.identifier === this.data.touchId;
        })

        if(touch){
            this.setData({
                touchId:false,
                touching:false,
            });
        }

    }
})
