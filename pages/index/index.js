var app = getApp()
Page({
  data: {
    canvasHeight:0
  },
  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
    success: function(res) {
    console.dir(res);
    that.setData({
      canvasHeight:res.windowWidth*2
    });
    
  }
})
    
  }
})