var app = getApp();

var config = {
        circle:{
            sizeScale:1,
            lineWidth:3,
            default:{
                strokeStyle:'#50A2E9'
            },
            wrong:{
                strokeStyle:'#D90106'
            },
            right:{
                strokeStyle:'#21864C'
            }
        },
        line:{
            lineWidth:3,
            default:{
                strokeStyle:'#50A2E9'
            },
            wrong:{
                strokeStyle:'#D90106'
            },
            right:{
                strokeStyle:'#21864C'
            }
        },
        dot:{
           size:8,
            default:{
                fillStyle:'#50A2E9'
            },
            wrong:{
                fillStyle:'#D90106'
            },
            right:{
                fillStyle:'#21864C'
            }
        }
 };

const ctx = wx.createCanvasContext('myCanvas');

function rect(){
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

Page({
  data: {
    canvasHeight:0
  },
  onLoad: function () {
    let that = this;

    wx.getSystemInfo({
    success: function(res) {
      let winWidth = res.windowWidth;
    that.setData({
      canvasHeight:winWidth*2
    });
    const count = [1,2,3];
    let cr = winWidth/8 - config.circle.lineWidth;
    let cm = (winWidth/8)*6;
    count.forEach(function(row) {
                count.forEach(function(column) {
                    var x = (cr + config.circle.lineWidth + cm / 6) * (2 * column + 1);
                    var y = (cr + config.circle.lineWidth) * (2 * row + 1) + 2 * row * cm / 6;
                    // this.cList.push(new Point(x, y, 3 * row + column + 1));
                    console.log("x:"+x,"y:"+y);
                    // 
                    // ctx.beginPath();
                    // ctx.moveTo(x + cr, y);
                    // ctx.arc(x, y, cr, 0, 2 * Math.PI);
                    // ctx.setFillStyle('#EEEEEE')
                    // ctx.fill();
                }.bind(this));
            }.bind(this));
    // ctx.arc(cm/6+cr+config.circle.lineWidth, 75, cr, 0, 2 * Math.PI);
    ctx.beginPath();
                    // ctx.moveTo(x + cr, y);
    ctx.arc(81.25, 34.375, cr, 0, 2 * Math.PI);
    ctx.setFillStyle('#EEEEEE')
    ctx.fill();
    ctx.draw()
      
  }
})
    
  }
})