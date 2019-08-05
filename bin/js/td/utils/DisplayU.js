/**显示对象工具
* name 王谦
*/
var td;
(function (td) {
    var utils;
    (function (utils) {
        var DisplayU = (function () {
            function DisplayU() {
            }
            /**设置鼠标事件*/
            DisplayU.setMouseListener = function (target, isAdd, caller, funClick, funOver, funOut) {
                if (funOver === void 0) { funOver = null; }
                if (funOut === void 0) { funOut = null; }
                if (target == null) {
                    console.log("this EventDispatcher is null");
                    return;
                }
                if (caller == null || (funClick == null && funOver == null && funOut == null))
                    return;
                if (isAdd) {
                    if (funClick != null)
                        target.on(LEvent.CLICK, caller, funClick);
                    if (funOver != null)
                        target.on(LEvent.CLICK, caller, funOver);
                    if (funOut != null)
                        target.on(LEvent.CLICK, caller, funOut);
                }
                else {
                    if (funClick != null)
                        target.off(LEvent.CLICK, caller, funClick);
                    if (funOver != null)
                        target.off(LEvent.CLICK, caller, funOver);
                    if (funOut != null)
                        target.off(LEvent.CLICK, caller, funOut);
                }
            };
            /**设置显示对象事件*/
            DisplayU.setEventListener = function (target, isAdd, type, caller, listener) {
                if (target == null) {
                    console.log("this EventDispatcher is null");
                    return;
                }
                if (caller == null || listener == null)
                    return;
                if (isAdd)
                    target.on(type, caller, listener);
                else
                    target.off(type, caller, listener);
            };
            /**
             * 设置组件属性
             * @param comp 组件
             * @param props {postion:Vector2,x:0,y:0,width:0,height:0,alpha:1,scale:1,scaleX:1,scaleY:1,anchor:0,anchorX:0,anchorY:0,center:NaN,centerX:NaN,centerY:NaN,parent:null}
             */
            DisplayU.setCompAttr = function (comp, props) {
                if (!props)
                    return;
                if (props.hasOwnProperty("postion"))
                    comp.pos(props.postion.x, props.postion.y); //位置
                if (props.hasOwnProperty("x"))
                    comp.x = props.x; //位置x
                if (props.hasOwnProperty("y"))
                    comp.y = props.y; //位置y
                if (props.hasOwnProperty("width"))
                    comp.width = props.width; //宽度
                if (props.hasOwnProperty("height"))
                    comp.height = props.height; //高度
                if (props.hasOwnProperty("alpha"))
                    comp.alpha = props.alpha; //透明度
                if (props.hasOwnProperty("scale"))
                    comp.scale(props.scale, props.scale); //缩放
                if (props.hasOwnProperty("scaleX"))
                    comp.scaleX = props.scaleX; //缩放x
                if (props.hasOwnProperty("scaleY"))
                    comp.scaleY = props.scaleY; //缩放y
                if (props.hasOwnProperty("anchor"))
                    comp.anchorX = comp.anchorY = props.anchor; //锚点
                if (props.hasOwnProperty("anchorX"))
                    comp.anchorX = props.anchorX; //锚点x
                if (props.hasOwnProperty("anchorY"))
                    comp.anchorY = props.anchorY; //锚点y
                if (props.hasOwnProperty("center"))
                    comp.centerX = comp.centerY = props.center; //中心线距离
                if (props.hasOwnProperty("centerX"))
                    comp.centerX = props.centerX; //中心线距离x
                if (props.hasOwnProperty("centerY"))
                    comp.centerY = props.centerY; //中心线距离y
                if (props.hasOwnProperty("parent")) {
                    if (!props.hasOwnProperty("index"))
                        props.parent.addChild(comp); //深度
                    else
                        props.parent.addChildAt(comp, props.index);
                }
            };
            /**初始化遮罩信息*/
            DisplayU.initMask = function () {
                DisplayU.MASK_IMG_TOP = new LImage(td.Path.ui + "tongyon/image_mask_top.png");
                DisplayU.MASK_IMG_BOTTOM = new LImage(td.Path.ui + "tongyon/image_mask_bottom.png");
                DisplayU.MASK_IMG_MIDDLE = new LImage(td.Path.ui + "tongyon/image_mask_middle.png");
                DisplayU.MASK_IMG_LEFT = new LImage(td.Path.ui + "tongyon/image_mask_left.png");
                DisplayU.MASK_IMG_RIGHT = new LImage(td.Path.ui + "tongyon/image_mask_right.png");
                DisplayU.MASK_DICT = new Dictionary();
            };
            /**
             * 垂直滚动条遮罩更新
             * @param target 遮罩对象
             * @param type 操作类型：默认(DisplayU.MASK_TYPE_NORMAL)
             */
            DisplayU.onScrollChange = function (target, type) {
                if (type === void 0) { type = DisplayU.MASK_TYPE_NORMAL; }
                if (!target)
                    return;
                if (type == DisplayU.MASK_TYPE_NULL) {
                    this.drawMaskByType(target, DisplayU.MASK_KIND_NULL);
                    return;
                }
                var scroll;
                if (target instanceof List)
                    scroll = target.scrollBar;
                else if (target instanceof Laya.Panel)
                    scroll = target.vScrollBar;
                if (!scroll || !scroll.isVertical)
                    return;
                if (scroll.min == scroll.max) {
                    if (type == DisplayU.MASK_TYPE_INIT)
                        this.drawMaskByType(target, DisplayU.MASK_KIND_ALL);
                    return;
                }
                if (scroll.value <= scroll.min)
                    this.drawMaskByType(target, DisplayU.MASK_KIND_TOP); //上边
                else if (scroll.value >= scroll.max)
                    this.drawMaskByType(target, DisplayU.MASK_KIND_BOTTOM); //下边
                else
                    this.drawMaskByType(target, DisplayU.MASK_KIND_MIDDLE); //中间
            };
            /**
             * 通过类型绘制遮罩
             * @param target 遮罩对象
             * @param kind 绘制类别：默认(DisplayU.MASK_KIND_ALL)
             */
            DisplayU.drawMaskByType = function (target, kind) {
                if (kind === void 0) { kind = DisplayU.MASK_KIND_ALL; }
                if (!target)
                    return;
                var key = target.$_GID.toString();
                if (kind == DisplayU.MASK_KIND_NULL) {
                    if (target.parent && target.parent.mask)
                        target.parent.mask = null;
                    if (DisplayU.MASK_DICT[key])
                        delete DisplayU.MASK_DICT[key];
                    return;
                }
                if (DisplayU.MASK_DICT[key] && DisplayU.MASK_DICT[key].kind == kind)
                    return;
                var mask;
                if (!DisplayU.MASK_DICT[key]) {
                    mask = new Sprite();
                    mask.pos(target.x, target.y);
                    mask.size(target.width, target.height);
                    target.parent.mask = mask;
                    DisplayU.MASK_DICT[key] = { mask: mask };
                }
                else
                    mask = DisplayU.MASK_DICT[key].mask;
                var height = DisplayU.MASK_HEIGHT;
                var graphics = mask.graphics;
                graphics.clear();
                switch (kind) {
                    case DisplayU.MASK_KIND_ALL:
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, 0, 0, mask.width, mask.height, "repeat");
                        break;
                    case DisplayU.MASK_KIND_TOP:
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, 0, 0, mask.width, mask.height - height, "repeat");
                        graphics.fillTexture(DisplayU.MASK_IMG_BOTTOM.source, 0, mask.height - height, mask.width, height, "repeat-x");
                        break;
                    case DisplayU.MASK_KIND_BOTTOM:
                        graphics.fillTexture(DisplayU.MASK_IMG_TOP.source, 0, 0, mask.width, height, "repeat-x");
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, 0, height, mask.width, mask.height - height, "repeat");
                        break;
                    case DisplayU.MASK_KIND_MIDDLE:
                        graphics.fillTexture(DisplayU.MASK_IMG_TOP.source, 0, 0, mask.width, height, "repeat-x");
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, 0, height, mask.width, mask.height - 2 * height, "repeat");
                        graphics.fillTexture(DisplayU.MASK_IMG_BOTTOM.source, 0, mask.height - height, mask.width, height, "repeat-x");
                        break;
                }
                DisplayU.MASK_DICT[key].kind = kind;
            };
            /**
             * 水平滚动条遮罩更新
             * @param target 遮罩对象
             * @param type 操作类型：默认(DisplayU.MASK_TYPE_NORMAL)
             */
            DisplayU.onHScrollChange = function (target, type) {
                if (type === void 0) { type = DisplayU.MASK_TYPE_NORMAL; }
                if (!target)
                    return;
                if (type == DisplayU.MASK_TYPE_NULL) {
                    this.drawHMaskByType(target, DisplayU.MASK_KIND_NULL);
                    return;
                }
                var scroll;
                if (target instanceof List)
                    scroll = target.scrollBar;
                else if (target instanceof Laya.Panel)
                    scroll = target.hScrollBar;
                if (!scroll || scroll.isVertical)
                    return;
                if (scroll.min == scroll.max) {
                    if (type == DisplayU.MASK_TYPE_INIT)
                        this.drawHMaskByType(target, DisplayU.MASK_KIND_ALL);
                    return;
                }
                if (scroll.value <= scroll.min)
                    this.drawHMaskByType(target, DisplayU.MASK_KIND_LEFT); //左边
                else if (scroll.value >= scroll.max)
                    this.drawHMaskByType(target, DisplayU.MASK_KIND_RIGHT); //右边
                else
                    this.drawHMaskByType(target, DisplayU.MASK_KIND_MIDDLE); //中间
            };
            /**
             * 通过类型绘制遮罩
             * @param target 遮罩对象
             * @param kind 绘制类别：默认(DisplayU.MASK_KIND_ALL)
             */
            DisplayU.drawHMaskByType = function (target, kind) {
                if (kind === void 0) { kind = DisplayU.MASK_KIND_ALL; }
                if (!target)
                    return;
                var key = target.$_GID.toString();
                if (kind == DisplayU.MASK_KIND_NULL) {
                    if (target.parent && target.parent.mask)
                        target.parent.mask = null;
                    if (DisplayU.MASK_DICT[key])
                        delete DisplayU.MASK_DICT[key];
                    return;
                }
                if (DisplayU.MASK_DICT[key] && DisplayU.MASK_DICT[key].kind == kind)
                    return;
                var mask;
                if (!DisplayU.MASK_DICT[key]) {
                    mask = new Sprite();
                    mask.pos(target.x, target.y);
                    mask.size(target.width, target.height);
                    target.parent.mask = mask;
                    DisplayU.MASK_DICT[key] = { mask: mask };
                }
                else
                    mask = DisplayU.MASK_DICT[key].mask;
                var width = DisplayU.MASK_WIDTH;
                var graphics = mask.graphics;
                graphics.clear();
                console.log("drawHMaskByType", kind);
                switch (kind) {
                    case DisplayU.MASK_KIND_ALL:
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, 0, 0, mask.width, mask.height, "repeat");
                        break;
                    case DisplayU.MASK_KIND_LEFT:
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, 0, 0, mask.width - width, mask.height, "repeat");
                        graphics.fillTexture(DisplayU.MASK_IMG_RIGHT.source, mask.width - width, 0, width, mask.height, "repeat-y");
                        break;
                    case DisplayU.MASK_KIND_RIGHT:
                        graphics.fillTexture(DisplayU.MASK_IMG_LEFT.source, 0, 0, width, mask.height, "repeat-y");
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, width, 0, mask.width - width, mask.height, "repeat");
                        break;
                    case DisplayU.MASK_KIND_MIDDLE:
                        graphics.fillTexture(DisplayU.MASK_IMG_LEFT.source, 0, 0, width, mask.height, "repeat-y");
                        graphics.fillTexture(DisplayU.MASK_IMG_MIDDLE.source, width, 0, mask.width - 2 * width, mask.height, "repeat");
                        graphics.fillTexture(DisplayU.MASK_IMG_RIGHT.source, mask.width - width, 0, width, mask.height, "repeat-y");
                        break;
                }
                DisplayU.MASK_DICT[key].kind = kind;
            };
            return DisplayU;
        }());
        /*============================垂直滚动条遮罩相关================================*/
        DisplayU.MASK_TYPE_NULL = 0; //清理遮罩
        DisplayU.MASK_TYPE_INIT = 1; //初始化遮罩
        DisplayU.MASK_TYPE_NORMAL = 2; //更新遮罩
        DisplayU.MASK_KIND_NULL = 0; //空遮罩
        DisplayU.MASK_KIND_ALL = 1; //全遮罩
        DisplayU.MASK_KIND_TOP = 2; //上遮罩
        DisplayU.MASK_KIND_BOTTOM = 3; //下遮罩
        DisplayU.MASK_KIND_MIDDLE = 4; //中遮罩
        DisplayU.MASK_KIND_LEFT = 5; //左遮罩
        DisplayU.MASK_KIND_RIGHT = 6; //右遮罩
        DisplayU.MASK_WIDTH = 56; //遮罩图片宽度
        DisplayU.MASK_HEIGHT = 56; //遮罩图片高度
        utils.DisplayU = DisplayU;
    })(utils = td.utils || (td.utils = {}));
})(td || (td = {}));
//# sourceMappingURL=DisplayU.js.map