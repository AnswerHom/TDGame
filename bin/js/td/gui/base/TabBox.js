/**
* 标签的子页面
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var TabBox = /** @class */ (function () {
                function TabBox(app, view, tabView, isNeedMask) {
                    if (isNeedMask === void 0) { isNeedMask = true; }
                    this.isMove = false;
                    this._isNeedMask = false;
                    this.id = 0; //活动id
                    this._app = app;
                    this._view = view;
                    this._tabView = tabView;
                    this._point = new Point(this._tabView.x, this._tabView.y);
                    this._tween = new Laya.Tween();
                    this._isNeedMask = isNeedMask;
                }
                TabBox.prototype.tabViewPos = function (x, y) {
                    if (this._point) {
                        this._point.x = x;
                        this._point.y = y;
                        this._tabView.pos(this._point.x, this._point.y);
                    }
                };
                TabBox.prototype.open = function () {
                    if (this._tabView) {
                        if (!this._mask && this._tabView.parent && this._isNeedMask) {
                            this._mask = new Box();
                            this._mask.graphics.clear();
                            this._mask.graphics.drawRect(0, -200, this._tabView.parent.width, this._tabView.parent.height + 350, "ffffff");
                            this._tabView.parent.mask = this._mask;
                        }
                        this.initMove();
                    }
                    this.isOpened = true;
                };
                //界面打开缓动
                TabBox.prototype.initMove = function () {
                    if (this._tabView && this.isMove) {
                        if (this._tween)
                            this._tween.clear();
                        this._tabView.alpha = 1;
                        this._point && this._tabView.pos(this._point.x, this._point.y);
                        this._tween.from(this._tabView, { x: this._tabView.x + this._tabView.width, alpha: 0 }, 200, Laya.Ease.cubicInOut);
                    }
                };
                TabBox.prototype.close = function () {
                    this.isMove = false;
                    if (this._tabView) {
                        if (this._tween)
                            this._tween.clear();
                        // this._tabView.alpha = 1;
                        // this._point && this._tabView.pos(this._point.x,this._point.y);
                    }
                    this.isOpened = false;
                };
                TabBox.prototype.destory = function () {
                    this.close();
                    if (this._tween)
                        this._tween.clear();
                    this._tween = null;
                    this._mask && this._mask.graphics.clear();
                    this._mask = null;
                    this._point = null;
                };
                /**显示新手引导表现
                 * @param type 类型
                 * @param step 步骤
                 */
                TabBox.prototype.showGuideEffect = function (type, step) {
                    //重载
                };
                return TabBox;
            }());
            base.TabBox = TabBox;
        })(base = gui.base || (gui.base = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=TabBox.js.map