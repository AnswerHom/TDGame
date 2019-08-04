var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var LoadUI = /** @class */ (function (_super) {
        __extends(LoadUI, _super);
        function LoadUI() {
            return _super.call(this) || this;
        }
        LoadUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadUI.uiView);
        };
        LoadUI.uiView = { "type": "View", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Rect", "props": { "width": 1280, "lineWidth": 1, "height": 720, "fillColor": "#ffffff" } }, { "type": "ProgressBar", "props": { "y": 635, "width": 827, "var": "progress_JD", "value": 0, "skin": "load/progress_02.png", "sizeGrid": "7,16,8,16", "height": 20, "centerX": 0 }, "child": [{ "type": "Label", "props": { "y": -30, "width": 134, "var": "label_JD", "text": "5%", "height": 31, "fontSize": 30, "font": "SimHei", "color": "#000000", "centerX": 0, "bold": true, "align": "center" } }] }] };
        return LoadUI;
    }(View));
    ui.LoadUI = LoadUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map