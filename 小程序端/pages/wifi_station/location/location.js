// pages/wifi_station/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: "请求中",
    city: "请求中",
    airText: "请求中",
    temp: "0",
    weather: "请求中",
    level: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const key = '4b30f8fb44c844b89800fc4b9ef56295';
        wx.request({
          url: `https://devapi.qweather.com/v7/air/now?location=${longitude},${latitude}&key=${key}`,
          success(res) {
            //console.log(res.data.now)
            that.setData({
              airText: res.data.now.category,
            })
          }
        })
        wx.request({
          url: `https://geoapi.qweather.com/v2/city/lookup?location=${longitude},${latitude}&key=${key}`,
          success(res) {
           // console.log(res.data.location[0])
            that.setData({
              area: res.data.location[0].name,
              city: res.data.location[0].adm2
            })
          }
        })
        wx.request({
          url: `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=${key}`,
          success(res) {
          //  console.log(res.data.now)
            that.setData({
              weather: res.data.now.text,
              temp: res.data.now.temp

            })

          }
        })
        wx.request({
          url: `https://devapi.qweather.com/v7/indices/1d?type=5&location=${longitude},${latitude}&key=${key}`,
          success(res) {
           // console.log(res.data)
            that.setData({
              level: res.data.daily[0].level

            })

          }
        })
      }
    })

  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})