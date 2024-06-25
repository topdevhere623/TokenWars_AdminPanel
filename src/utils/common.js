const funcObj = {
  /* 科学计数法转换数值 */
  toNonExponential(num) {
    if (!num) return 0;
    var m = Number(num)
      .toExponential()
      .match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return Number(num).toFixed(Math.max(0, (m[1] || "").length - m[2]));
  },
  strSlice: function(val, d = 8) {
    if (val) {
      let float = String(val).split(".");
      if (float[1] && float[1].length > d) {
        let num = float[0] + "." + float[1].slice(0, d);
        return num;
      } else {
        return val;
      }
    } else if (val == 0) {
      return 0;
    }
  },
  // 获取地址栏参数
  etUrlCode: function(name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },
};

export default funcObj;
