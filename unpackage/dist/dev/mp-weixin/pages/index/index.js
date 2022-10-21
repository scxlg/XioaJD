"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      image: ["../../static/image/8.jpg", "../../static/image/13.jpg", "../../static/image/8.jpg", "../../static/image/13.jpg"],
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500
    };
  },
  methods: {
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
    toGoodsList() {
      common_vendor.index.switchTab({
        url: "/pages/goodsType/goodsType"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "list",
      size: "30",
      color: "#fff"
    }),
    b: common_vendor.o((...args) => $options.toGoodsList && $options.toGoodsList(...args)),
    c: common_vendor.o(_ctx.search),
    d: common_vendor.p({
      radius: "100",
      placeholder: "\u4E00\u76F4\u4E0D\u663E\u793A",
      clearButton: "none",
      cancelButton: "none"
    }),
    e: common_vendor.o(() => {
    }),
    f: common_vendor.f($data.image, (item, k0, i0) => {
      return {
        a: item,
        b: item
      };
    }),
    g: $data.indicatorDots,
    h: $data.autoplay,
    i: $data.interval,
    j: $data.duration
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57280228"], ["__file", "D:/student/HBuilderProjects/xjd/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
