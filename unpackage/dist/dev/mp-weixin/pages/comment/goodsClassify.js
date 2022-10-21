"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "goodsClassify",
  props: {
    data: Object
  },
  setup(__props) {
    const getGoodsLsit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/goodsList/goodsList"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.data.type_name),
        b: __props.data.child == ""
      }, __props.data.child == "" ? {} : {
        c: common_vendor.f(__props.data.child, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.type_name)
          };
        }),
        d: common_vendor.o(getGoodsLsit)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/student/HBuilderProjects/xjd/pages/comment/goodsClassify.vue"]]);
wx.createComponent(Component);
