<template>
  <div class="quillEditorBox">
    <quill-editor
      ref="newEditor"
      v-model="ruleForm.content"
      class="editor"
      :options="editorOption"
      @change="onEditorChange($event)"
    />
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Quill, quillEditor } from "vue-quill-editor";
import Video from "@/utils/video.js";
Quill.register(Video, true);

import quillConfig from "@/utils/quill-config";

//Set font size
const fontSizeStyle = Quill.import("attributors/style/size"); //After introducing this, you will write the style on style
fontSizeStyle.whitelist = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
];
Quill.register(fontSizeStyle, true);
//Set font style
const Font = Quill.import("attributors/style/font"); //After introducing this, you will write the style on style
const fonts = ["SimSun", "SimHei", "Microsoft-YaHei", "KaiTi", "FangSong"];
Font.whitelist = fonts; //Add the font to the white list
Quill.register(Font, true);

//toolbar
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], //Delete lines in thickened oblique body-['bold', 'italic', 'underline', 'Strike']
  [{ color: [] }, { background: [] }], //Font color, font background color ----- [{color: []}, {background: []}]
  [{ align: [] }], //Alignment method ----- [{align: []}]
  [{ size: fontSizeStyle.whitelist }], //Font size ----- [{size: ['small', false, 'large', 'huge']}]
  [{ font: fonts }], //Font type ----- [{font: []}]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //title
  [{ direction: "ltl" }], //Text direction ----- [{'direction': 'rtl'}]
  [{ direction: "rtl" }], //Text direction ----- [{'direction': 'rtl'}]
  [{ indent: "-1" }, { indent: "+1" }], //Endment ---- [{Indent: '-1'}, {Indent: '+1'}]
  [{ list: "ordered" }, { list: "bullet" }], //Order, sequence list ----- [{list: 'Ordered'}, {list: 'bullet'}]
  [{ script: "sub" }, { script: "super" }], //Angle/lowering ----- [{SCRIPT: 'Sub'}, {script: 'super'}]
  ["blockquote", "code-block"], //Quote code block ----- ['blockquote', 'code-block']
  ["clean"], //Clear text format ----- ['clean']
  ["link", "image", "video"], //Links, pictures, videos ----- ['link', 'Image', 'Video']
];

export default {
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editorOption: {
        ...quillConfig,
        modules: {
          toolbar: {
            container: toolbarOptions,
          },
        },
      },
      ruleForm: {
        content: "",
      },
    };
  },
  components: { quillEditor },
  watch: {
    content() {
      this.ruleForm.content = this.content;
    },
  },
  created() {
    this.ruleForm.content = this.content;
  },
  mounted() {
    const quill = this.$refs.newEditor.quill;
    quill.format("color", "#a9a4b4");
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.ruleForm.content = html;
      this.ruleForm.contentText = text;
      this.$emit("change", this.ruleForm.content, this.ruleForm.contentText);
    },
  },
};
</script>
<style lang="scss" scoped>
.mall-add {
  .el-form-item .el-upload--picture-card,
  .el-upload-list__item {
    width: 80px;
    height: 80px;
    line-height: 88px;
  }
}

.file-imgs {
  /deep/.el-tabs__header {
    display: none;
  }
}
/deep/.ql-container {
  height: 400px;
}

.price-box {
  margin: 0;
}

.ql-editor {
  padding: 0;
  >>> .ql-container {
    height: calc(100% - 83px);
  }
}

// .el-form-item:nth-child(4) {
//   margin-top: 100px;
// }
.el-textarea__inner {
  min-height: 100px !important;
}
.ql-editor-container {
  padding-left: 20px;
}
.el-row:nth-child(2) {
  text-align: center;
}
</style>
<style>
.ql-editor {
  min-height: 200px;
}
.ql-snow .ql-picker-label {
  display: flex;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "默认";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.ql-snow .ql-stroke,
.ql-snow .ql-picker {
  color: #999;
  stroke: #999;
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
  fill: #999;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
}

.ql-container {
  font-size: 14px;
}
</style>
