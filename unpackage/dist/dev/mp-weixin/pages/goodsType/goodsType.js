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
  (_easycom_uni_icons + _easycom_uni_search_bar + goodsClassify)();
}
const goodsClassify = () => "../comment/goodsClassify.js";
const _sfc_main = {
  __name: "goodsType",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    let goodsList = common_vendor.ref([]);
    let toChildData = common_vendor.ref("");
    function getGoodType() {
      common_vendor.index.request({
        url: "http://api_devs.wanxikeji.cn/api/goodType",
        method: "POST",
        data: {}
      }).then((res) => {
        res.data.data.forEach((item) => {
          if (item.parent_id == 0) {
            goodsList.value.push(item);
          }
        });
        goodsList.value.forEach((item) => {
          item.child = [];
          res.data.data.forEach((items) => {
            if (item.good_type_id == items.parent_id) {
              item.child.push(items);
            }
          });
        });
      });
    }
    getGoodType();
    const asideList = (index, e, item) => {
      toChildData.value = item;
      proxy.$refs.listRef.forEach((item2, idx) => {
        if (index == idx) {
          item2.style.backgroundColor = "#fff";
          item2.style.color = "#f00";
        } else {
          item2.style.backgroundColor = "";
          item2.style.color = "";
        }
      });
    };
    const backBtn = () => {
      proxy.$router.push({ path: "/" });
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
        }),
        e: common_vendor.f(common_vendor.unref(goodsList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.type_name),
            b: item,
            c: common_vendor.o(($event) => asideList(index, $event, item), item),
            d: "li" + index
          };
        }),
        f: common_vendor.p({
          data: common_vendor.unref(toChildData)
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/student/HBuilderProjects/xjd/pages/goodsType/goodsType.vue"]]);
wx.createPage(MiniProgramPage);
