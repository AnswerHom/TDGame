var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var HudUI = (function (_super) {
        __extends(HudUI, _super);
        function HudUI() {
            return _super.call(this) || this;
        }
        HudUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HudUI.uiView);
        };
        return HudUI;
    }(View));
    HudUI.uiView = { "type": "View", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1280, "skin": "hud/di_pfdk.png", "sizeGrid": "50,50,50,50", "height": 720 } }, { "type": "Image", "props": { "x": 0, "width": 1280, "var": "image_Top", "top": 0, "skin": "hud/tu_tk.png", "sizeGrid": "0,500,0,500" } }, { "type": "Image", "props": { "x": 0, "width": 1280, "var": "image_Bottom", "skin": "hud/tu_tbd.png", "sizeGrid": "0,63,0,201", "bottom": 0 } }, { "type": "Button", "props": { "var": "btn_Start", "stateNum": 1, "skin": "hud/btn_001.png", "labelSize": 35, "labelFont": "SimHei", "labelColors": "#6b4b35", "label": "游戏开始", "centerX": 0, "bottom": 113 } }] };
    ui.HudUI = HudUI;
})(ui || (ui = {}));
(function (ui) {
    var LoadUI = (function (_super) {
        __extends(LoadUI, _super);
        function LoadUI() {
            return _super.call(this) || this;
        }
        LoadUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadUI.uiView);
        };
        return LoadUI;
    }(View));
    LoadUI.uiView = { "type": "View", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Rect", "props": { "width": 1280, "lineWidth": 1, "height": 720, "fillColor": "#ffffff" } }, { "type": "ProgressBar", "props": { "y": 635, "width": 827, "var": "progress_JD", "value": 0, "skin": "load/progress_02.png", "sizeGrid": "7,16,8,16", "height": 20, "centerX": 0 }, "child": [{ "type": "Label", "props": { "y": -30, "width": 134, "var": "label_JD", "text": "5%", "height": 31, "fontSize": 30, "font": "SimHei", "color": "#000000", "centerX": 0, "bold": true, "align": "center" } }] }] };
    ui.LoadUI = LoadUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map