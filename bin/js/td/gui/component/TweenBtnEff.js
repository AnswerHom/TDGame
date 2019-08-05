/**
* name
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var TweenBtnEff = (function () {
                function TweenBtnEff() {
                }
                /**
                 * 按钮点击动画
                 * @param btn 按钮
                 * @param scaleX 原始缩放x
                 * @param scaleY 原始缩放y
                 */
                TweenBtnEff.BtnTween = function (btn, scaleX, scaleY) {
                    if (scaleX === void 0) { scaleX = 1; }
                    if (scaleY === void 0) { scaleY = 1; }
                    if (btn && btn != Laya.stage) {
                        if (btn.scaleX < 0 && scaleX == 1)
                            scaleX = -1;
                        if (btn.scaleY < 0 && scaleY == 1)
                            scaleY = -1;
                        var props = { scaleX: scaleX, scaleY: scaleY };
                        btn.scaleX = scaleX * 0.75;
                        btn.scaleY = scaleY * 0.75;
                        Laya.Tween.clearAll(btn);
                        Laya.Tween.to(btn, props, 500, Laya.Ease.elasticOut);
                    }
                };
                return TweenBtnEff;
            }());
            component.TweenBtnEff = TweenBtnEff;
        })(component = gui.component || (gui.component = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=TweenBtnEff.js.map