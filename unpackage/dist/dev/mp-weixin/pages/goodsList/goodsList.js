"use strict";
var common_vendor = require("../../common/vendor.js");
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
const _sfc_main = {
  __name: "goodsList",
  setup(__props) {
    common_vendor.index.request({
      url: "http://api_devs.wanxikeji.cn/api/goodList",
      method: "POST"
    }).then((res) => {
      console.log(res.data);
    });
    const backBtn = () => {
      common_vendor.index.navigateBack({});
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(backBtn),
        b: common_vendor.p({
          type: "back",
          size: "30"
        }),
        c: common_vendor.o(_ctx.search),
        d: common_vendor.p({
          radius: "100",
          placeholder: "\u4E00\u76F4\u4E0D\u663E\u793A",
          clearButton: "none",
          cancelButton: "none"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/student/HBuilderProjects/xjd/pages/goodsList/goodsList.vue"]]);
wx.createPage(MiniProgramPage);
