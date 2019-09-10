import Browser = Laya.Browser;
import Stage = Laya.Stage;
import LEvent = Laya.Event;
import EventDispatcher = Laya.EventDispatcher;
import LImage = Laya.Image;
import Box = Laya.Box;
import Dictionary = Laya.Dictionary;
import Sprite = Laya.Sprite;
import Point = Laya.Point;
import Texture = Laya.Texture;
import List = Laya.List;
import Graphics = Laya.Graphics;
import Loader = Laya.Loader;
import Handler = Laya.Handler;
import Label = Laya.Label;
import Matrix = Laya.Matrix;

import Page = td.gui.base.Page;

import Path = td.Path;
import UIRoot = td.UIRoot;
import SceneRoot = td.SceneRoot;
import PageDef = tb.gui.page.PageDef;
import BlackBorder = td.BlackBorder;
import StringU = td.utils.StringU;
import MathU = td.utils.MathU;
import ObjectPools = td.utils.ObjectPools;
import Vector2 = td.utils.Vector2;
import Sync = td.utils.Sync;

import BaseObject = td.object.BaseObject;
import Map = td.object.Map;
import MapMain = td.object.MapMain;
import Unit = td.object.Unit;
import Player = td.object.Player;

import AvatarObject = td.scene.AvatarObject;
import AvatarBase = td.scene.AvatarBase;
import SceneRes = td.scene.SceneRes;
import Shock = td.scene.Shock;
import Camera = td.scene.Camera;

import EventManager = td.managers.EventManager;
import ActionManager = td.managers.ActionManager;
import ActionBase = td.managers.actions.ActionBase;
import MapManager = td.managers.MapManager;

import IMapConf = td.data.IMapConf;
import IKeyPointData = td.data.IKeyPointData;
import TrunkPoint = td.data.TrunkPoint;
import TrunkPath = td.data.TrunkPath;
import Tiled = td.data.Tiled;

var onIPhoneX: boolean = false;
var isDebug: boolean = true;
class Launch {
    // 美术设计画布像素高宽
    static widthDesginPixelw: number = 1280;
    static heightDesginPixelw: number = 720;
    // 浏览器可视画布像素高宽
    private _clientWidth: number;
    private _clientHeight: number;
    // 浏览器可视高宽（在设备上的像素高宽）
    private _designWidth: number = 0;
    private _designHeight: number = 0;
    // 客户端画布缩放比
    private _clientScale: number = 1;

    private _showStat: boolean = false;
    get showStat(): boolean {
        return this._showStat;
    }
    set showStat(v: boolean) {
        this._showStat = v;
        this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
    }
    // 程序集合
    private _apps: Array<GameApp> = [];

    constructor() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        // 初始化舞台
        Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);

        // 是否IPhoneX
        if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
            onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
        }

        // 抗锯齿
        Config.isAntialias = true;
        //开启使用WorkerLoader来加载解码图片的功能
        Laya.WorkerLoader.enable = true;
        //调试面板
        this.showStat = true;

        Laya.loader.maxLoader = 3;
        Laya.loader.retryNum = 3;
        Laya.loader.retryDelay = 3000;
        Loader.maxTimeOut = 15000;
        Loader.typeMap["data"] = Loader.BUFFER;
        Loader.typeMap["bin"] = Loader.BUFFER;

        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置横竖屏
        Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
        // 监听窗口大小变化
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);
        //主心跳
        Laya.stage.frameLoop(1, this, this.onUpdate);
        this.initGame();
    }

    private _prevUpdateTimer: number;
    // 心跳更新
    private onUpdate(): void {
        let timer = Laya.timer.currTimer;
        let diff = timer - this._prevUpdateTimer;
        // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
        this._prevUpdateTimer = timer;
        if (!diff) {
            return;
        }
        // 这样做才能防止白边
        this.checkClientSize();

        // 更新设计分辨率
        // Laya.stage.designWidth = this._designWidth;
        if (Laya.stage.width != this._designWidth)
            Laya.stage.width = this._designWidth;
        // Laya.stage.designHeight = this._designHeight;
        if (Laya.stage.height != this._designHeight)
            Laya.stage.height = this._designHeight;
        // 心跳
        for (let app of this._apps) {
            app.onUpdate(diff);
        }
        // 对象池
        ObjectPools.update(diff);
    }

    private initGame(): void {
        let app = new GameApp();
        app.pageVisibility = "***";
        //打开加载界面
        app.uiRoot.general.open(PageDef.LOAD, null, () => {
            app.uiRoot.HUD.open(PageDef.HUD);
        });
        this._apps.push(app);
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);
        this.onResize();
    }

    // 游戏窗口尺寸发生变化
    onResize(): void {
        console.log('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio)
        console.log('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio)
        console.log('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.deviceXDPI, screen.deviceYDPI, screen.pixelDepth)
        console.log('onIPhoneX', onIPhoneX)
        this.checkClientSize();
        let clientScale = this._clientScale;
        let clientWidth = this._clientWidth;
        let clientHeight = this._clientHeight;
        for (let app of this._apps) {
            app.onResize(clientWidth, clientHeight, clientScale);
        }
    }

    // 浏览器可视原始高宽
    private _browserClientWidth: number = 0;
    private _browserClientHeight: number = 0;
    private _prevBrowserClientWidth: number;
    private _prevBrowserClientHeight: number;

    // 校验浏览器可视屏幕像素
    private checkClientSize(): void {
        let browser_clientWidth = Browser.clientWidth;
        let browser_clientHeight = Browser.clientHeight;
        if (!Browser.onPC && this._prevBrowserClientWidth) {
            if ((browser_clientWidth == this._prevBrowserClientWidth
                && browser_clientHeight != this._prevBrowserClientHeight)
                || (browser_clientHeight == this._prevBrowserClientHeight
                    && browser_clientWidth != this._prevBrowserClientWidth)) {
                return;
            }
        }

        let __width = browser_clientWidth;
        let __height = browser_clientHeight;
        switch (Laya.stage.screenMode) {
            case Stage.SCREEN_VERTICAL:
                browser_clientHeight = Math.max(__width, __height);
                browser_clientWidth = Math.min(__width, __height);
                break;
            case Stage.SCREEN_HORIZONTAL:
                browser_clientHeight = Math.min(__width, __height);
                browser_clientWidth = Math.max(__width, __height);
                break;
        }

        if (this._browserClientWidth == browser_clientWidth && this._browserClientHeight == browser_clientHeight) {
            return;
        }

        this._browserClientWidth = browser_clientWidth;
        this._browserClientHeight = browser_clientHeight;
        this._prevBrowserClientWidth = browser_clientWidth;
        this._prevBrowserClientHeight = browser_clientHeight;

        this._designWidth = this._browserClientWidth * Browser.pixelRatio;
        this._designHeight = this._browserClientHeight * Browser.pixelRatio;

        let wScale = this._designWidth / Launch.widthDesginPixelw;
        let hScale = this._designHeight / Launch.heightDesginPixelw;

        this._clientScale = Math.min(wScale, hScale);

        if (wScale > hScale) {
            this._clientWidth = Launch.heightDesginPixelw * (this._designWidth / this._designHeight);
            this._clientHeight = Launch.heightDesginPixelw;
        }
        else {
            this._clientWidth = Launch.widthDesginPixelw;
            this._clientHeight = Launch.widthDesginPixelw * (this._designHeight / this._designWidth);
        }
    }
}

new Launch();