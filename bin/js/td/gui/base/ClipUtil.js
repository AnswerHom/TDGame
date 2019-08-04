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
/**
* 位图切片生成工具
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var ClipUtil = /** @class */ (function (_super) {
                __extends(ClipUtil, _super);
                function ClipUtil(font) {
                    var _this = _super.call(this) || this;
                    _this.setFont(font);
                    _this._stopArray = [];
                    _this._clipArray = [];
                    return _this;
                }
                ClipUtil.init = function () {
                    this.GOLD_FONT = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip.png',
                        clipWidth: 0,
                        clipX: 11,
                        space: 20,
                        show: "0123456789.",
                    };
                    this.FUHUO_FONT = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_111.png',
                        clipWidth: 0,
                        clipX: 10,
                        space: 38,
                        show: "0123456789",
                    };
                    this.RESULTSTART_FONT = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_shuzi2.png',
                        clipWidth: 0,
                        clipX: 11,
                        space: 38,
                        show: "0123456789.",
                        otherStyle: "zimu2_"
                    };
                    this.NEED_ZUANSHI_ONE = {
                        source: td.Path.uiAtlas + "woyaozuanshi.atlas",
                        url: 'woyaozuanshi/clip_ls.png',
                        clipWidth: 23,
                        clipX: 10,
                        space: 0,
                        show: "0123456789" // 显示内容
                    };
                    this.PROGRESS_FONT = {
                        source: td.Path.uiAtlas + "tongyong.atlas",
                        url: 'tongyong/clip_shuzi4.png',
                        clipWidth: 0,
                        clipX: 10,
                        space: 15,
                        show: "0123456789",
                    };
                    this.HUODE_FONT = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_shuzi3.png',
                        clipWidth: 0,
                        clipX: 11,
                        space: 48,
                        show: "0123456789.",
                        otherStyle: "zimu3_"
                    };
                    this.CHANGJING_FONT = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_pz1.png',
                        clipWidth: 0,
                        clipX: 12,
                        space: 55,
                        show: "0123456789+.",
                        otherStyle: "zimu3_",
                    };
                    this.VIP_PER_ONE = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_shuz.png',
                        clipWidth: 0,
                        clipX: 10,
                        space: 15,
                        show: "0123456789",
                    };
                    this.VIP_PER_TWO = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_shuz2.png',
                        clipWidth: 0,
                        clipX: 10,
                        space: 15,
                        show: "0123456789.",
                    };
                    this.VIP_LEVEL = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_ph3.png',
                        clipWidth: 0,
                        clipX: 10,
                        space: 10,
                        show: "0123456789",
                    };
                    this.VIP_LEVEL_ONE = {
                        source: td.Path.uiAtlas + "zimu.atlas",
                        url: 'zimu/clip_shuzi1.png',
                        clipWidth: 0,
                        clipX: 10,
                        space: 40,
                        show: "0123456789",
                    };
                };
                ClipUtil.prototype.setFont = function (font) {
                    if (this._curFont == font)
                        return;
                    this._curFont = font;
                    if (font.source) {
                        var refTexture = RefAsset.Get(font.source);
                        refTexture.retain();
                    }
                    if (this._clipArray) {
                        for (var _i = 0, _a = this._clipArray; _i < _a.length; _i++) {
                            var clip = _a[_i];
                            clip.destroy(true);
                        }
                        this._clipArray = [];
                    }
                };
                //设置
                ClipUtil.prototype.setText = function (str, needZero, isTween, preSkin, postSkin) {
                    var _this = this;
                    if (needZero === void 0) { needZero = false; }
                    if (isTween === void 0) { isTween = false; }
                    if (preSkin === void 0) { preSkin = null; }
                    if (postSkin === void 0) { postSkin = null; }
                    if (!this._curFont) {
                        console.log("Font not found!");
                    }
                    var refTexture = RefAsset.Get(this._curFont.source);
                    if (!refTexture.parseComplete) {
                        refTexture.once(LEvent.COMPLETE, this, function (str, needZero, isTween, preSkin, postSkin) {
                            if (needZero === void 0) { needZero = false; }
                            if (isTween === void 0) { isTween = false; }
                            if (preSkin === void 0) { preSkin = null; }
                            if (postSkin === void 0) { postSkin = null; }
                            _this.onAssetParseComplete(str, needZero, isTween, preSkin, postSkin);
                        }, [str, needZero, isTween, preSkin, postSkin]);
                    }
                    else {
                        this.onAssetParseComplete(str, needZero, isTween, preSkin, postSkin);
                    }
                };
                ClipUtil.prototype.onAssetParseComplete = function (str, needZero, isTween, preSkin, postSkin) {
                    if (needZero === void 0) { needZero = false; }
                    if (isTween === void 0) { isTween = false; }
                    if (preSkin === void 0) { preSkin = null; }
                    if (postSkin === void 0) { postSkin = null; }
                    var posX = 0;
                    //前置图片
                    if (preSkin) {
                        if (!this._preImage) {
                            this._preImage = new LImage();
                            this.addChild(this._preImage);
                        }
                        this._preImage.skin = preSkin;
                        this._preImage.pos(posX, 0);
                        posX += this._preImage.width + this._curFont.space;
                    }
                    else {
                        if (this._preImage) {
                            this._preImage.destroy();
                            this._preImage = null;
                        }
                    }
                    //清理
                    for (var _i = 0, _a = this._clipArray; _i < _a.length; _i++) {
                        var clip = _a[_i];
                        clip.removeSelf();
                    }
                    if (str && (((!needZero && Number(str) > 0) || needZero))) {
                        // this.visible = true;
                        var index = 0;
                        for (var i = 0; i < str.length; i++) {
                            if (!this._clipArray[i]) {
                                index = this._curFont.show.indexOf(str.charAt(i));
                                var clip = this.createClip(index);
                                this.addChild(clip);
                                clip.x = posX;
                                clip.y = 0;
                                this._clipArray.push(clip);
                            }
                            else {
                                index = this._curFont.show.indexOf(str.charAt(i));
                                this._clipArray[i].index = index;
                                if (!this._clipArray[i].parent)
                                    this.addChild(this._clipArray[i]);
                                this._clipArray[i].x = posX;
                                this._clipArray[i].y = 0;
                            }
                            posX += this._curFont.clipWidth + this._curFont.space;
                        }
                    }
                    // else {
                    //     this.visible = false;
                    // }
                    //后置图片
                    this.updatePostSkin(postSkin, posX);
                    this.width = posX;
                    //需要播放滚动特效
                    if (isTween) {
                        this.playTween(str);
                    }
                };
                ClipUtil.prototype.updatePostSkin = function (postSkin, posX) {
                    if (!this._postImages && (!postSkin || !postSkin.length))
                        return;
                    if (!this._postImages)
                        this._postImages = [];
                    var len = Math.max(postSkin.length, this._postImages.length);
                    for (var i = 0; i < len; i++) {
                        if (!this._postImages[i])
                            this._postImages[i] = new LImage();
                        if (postSkin.length <= i) {
                            if (this._postImages[i]) {
                                this._postImages[i].destroy();
                                this._postImages[i] = null;
                            }
                            continue;
                        }
                        if (i > 0)
                            this._postImages[i].x = this._postImages[i - 1].x + this._postImages[i - 1].width - 10;
                        else
                            this._postImages[i].x = posX;
                        this._postImages[i].skin = postSkin[i];
                        this.addChild(this._postImages[i]);
                    }
                };
                //滚数字表现
                ClipUtil.prototype.playTween = function (numStr) {
                    var _this = this;
                    Laya.timer.frameLoop(1, this, this.showTween, [parseInt(numStr)]);
                    var _loop_1 = function (i) {
                        if (this_1._stopArray[i]) {
                            this_1._stopArray[i] = false;
                        }
                        else {
                            this_1._stopArray.push(false);
                        }
                        Laya.timer.once(500 + 500 * i, this_1, function () {
                            _this.stopTween(i);
                        });
                    };
                    var this_1 = this;
                    for (var i = 0; i < numStr.length; i++) {
                        _loop_1(i);
                    }
                };
                //停止滚数字
                ClipUtil.prototype.stopTween = function (index) {
                    this._stopArray[index] = true;
                    this.event(ClipUtil.EVENT_NUM_TWWEN_STOP);
                };
                ClipUtil.prototype.showTween = function (num) {
                    var numStr = num.toString();
                    for (var i = 0; i < numStr.length; i++) {
                        var child = this.getChildAt(i);
                        var index = child.index;
                        index++;
                        if (child) {
                            if (this._stopArray[i]) {
                                child.index = parseInt(numStr[i]);
                                if (i >= numStr.length - 1)
                                    Laya.timer.clearAll(this);
                            }
                            else {
                                child.index = index % 10;
                            }
                        }
                    }
                };
                //创建位图切片
                ClipUtil.prototype.createClip = function (index) {
                    var clip = new laya.ui.Clip(this._curFont.url);
                    clip.clipWidth = this._curFont.clipWidth;
                    clip.clipX = this._curFont.clipX;
                    clip.index = index;
                    this.addChild(clip);
                    return clip;
                };
                //释放
                ClipUtil.prototype.destroy = function (destroyChild) {
                    Laya.timer.clearAll(this);
                    if (this._curFont.source) {
                        var refTexture = RefAsset.Get(this._curFont.source);
                        refTexture.release();
                        this._curFont = null;
                    }
                    if (this._clipArray) {
                        for (var _i = 0, _a = this._clipArray; _i < _a.length; _i++) {
                            var clip = _a[_i];
                            clip.destroy(true);
                        }
                        this._clipArray = null;
                    }
                    if (this._preImage) {
                        this._preImage.destroy(true);
                        this._preImage = null;
                    }
                    if (this._postImages) {
                        for (var i = 0; i < this._postImages.length; i++) {
                            if (this._postImages[i]) {
                                this._postImages[i].destroy();
                                this._postImages[i] = null;
                            }
                        }
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                /**
                 * 封装好的初始化美术字
                 * @param uiView ui
                 * @param font 字体
                 * @param isPivot 轴心点是否变化了
                 */
                ClipUtil.initClip = function (uiView, font, isPivot) {
                    if (isPivot === void 0) { isPivot = false; }
                    if (!uiView)
                        return;
                    uiView.visible = false;
                    var clipUI = new ClipUtil(font);
                    uiView.parent.addChild(clipUI);
                    if (!isPivot) {
                        clipUI.pos(uiView.x, uiView.y);
                    }
                    else {
                        clipUI.centerX = uiView.centerX;
                        clipUI.centerY = uiView.centerY;
                    }
                    return clipUI;
                };
                //数字停止缓动事件
                ClipUtil.EVENT_NUM_TWWEN_STOP = "evnet_num_tween_stop";
                return ClipUtil;
            }(Laya.Box));
            base.ClipUtil = ClipUtil;
            ClipUtil.init();
        })(base = gui.base || (gui.base = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=ClipUtil.js.map