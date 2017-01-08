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
      let winWidth = res.windowWidth*2;
    that.setData({
      canvasHeight:winWidth
    });

    

  }
})
    
  }
})