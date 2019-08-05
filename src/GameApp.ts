/*
* name
*/
// 是否iphoneX
var onIPhoneX: boolean = false;
class GameApp {
    isNoLogin: boolean = false;
    mutedMusic: boolean = false;
    mutedSound: boolean = false;
    delayTime: number = 0;

    pageVisibility: string = '';
    //开放域纹理
    private _openZoneTexture: Texture;
    //下次更新开放域
    private _nextUpdateOpenZoneTime: number = 0;

    private _clientX: number = 0;
    public get clientX(): number {
        return this._clientX;
    }
    private _clientY: number = 0;
    public get clientY(): number {
        return this._clientY;
    }


    //微信信息
    public wxUserInfo: any;
    private _wxCanvas: laya.resource.HTMLCanvas;
    // ui
    protected _uiRoot: UIRoot;
    get uiRoot(): UIRoot {
        return this._uiRoot;
    }
    // ui
    protected _sceneRoot: SceneRoot;
    get sceneRoot(): SceneRoot {
        return this._sceneRoot;
    }


    private _blackBorder: BlackBorder;


    private _date: Date;

    constructor() {
        let url = location.href;
        this.isNoLogin = true;

        // 初始化场景
        this._sceneRoot = new SceneRoot(this);
        Laya.stage.addChild(this._sceneRoot);
        // 初始化ui
        this._uiRoot = new UIRoot(this);
        Laya.stage.addChild(this._uiRoot);
        // 黑色边框
        this._blackBorder = new BlackBorder(this);
        Laya.stage.addChild(this._blackBorder);


        Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_OUT, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseHandler);

        //通过消息透传通知开发数据域sharedCanvas的尺寸大小，以及缩放比例信息
        //正式环境
        this._date = new Date();
    }

    private onMouseHandler(e: LEvent): void {
    }


    // 心跳更新
    onUpdate(diff: number): void {
        this._uiRoot && this._uiRoot.update(diff);
    }


    /**
     * 根据时间戳获取本周一日期
     * @param value 时间戳毫秒
     * @return 2018419
     */
    private getWeekOneDayByTime(value: number): number {
        if (!value) return 0;
        this._date.setTime(value);
        // //当日时间毫秒
        // let dayTime:number = this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
        //获取当前星期几 0-6(星期天-星期六)
        let week: number = this._date.getDay();
        if (week == 0) week = 7;
        let time: number = value - (week - 1) * 86400000;
        if (time > 0) this._date.setTime(time);
        //获取当前年月日
        let year: number = this._date.getFullYear();
        let mounth: number = this._date.getMonth();
        let day: number = this._date.getDate();
        let str: string = year.toString() + mounth.toString() + day.toString();
        return parseInt(str);
    }

    // 浏览器可视画布像素高宽
    protected _clientWidth: number;
    protected _clientHeight: number;
    // 客户端画布缩放比
    protected _clientScale: number = 1;
    public get clientScale(): number {
        return this._clientScale;
    }
    public get clientWidth(): number {
        return this._clientWidth;
    }
    public get clientHeight(): number {
        return this._clientHeight;
    }

    set mouseLock(v: boolean) {
        this._uiRoot && (this._uiRoot.mouseLock = v);
    }

    // 游戏窗口尺寸发生变化
    onResize(width: number, height: number, clientScale: number): void {
        this._clientWidth = width;
        this._clientHeight = height;
        this._clientScale = clientScale;

        let x = 0, y = 0;
        //判断IPhoneX
        if (onIPhoneX) {
            //Iphone X 安全区域距离顶部
            const IPHONEX_TOP: number = 44 / 812;
            //Iphone X 安全区域距离底部
            const IPHONEX_BOTTOM: number = 34 / 812;
            if (Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL) {
                //正横屏 
                width = width * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                // x偏移
                x = width * IPHONEX_TOP * clientScale;
            }
            else if (Laya.stage.screenMode == Stage.SCREEN_VERTICAL) {
                // 竖屏
                height = height * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                // y偏移
                y = height * IPHONEX_TOP * clientScale;
            } else {
                if (window.orientation == 0) {
                    // 竖屏
                    height = height * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                    // y偏移
                    y = height * IPHONEX_TOP * clientScale;
                } else if (window.orientation == 90) {
                    //正横屏 
                    width = width * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                    // x偏移
                    x = width * IPHONEX_TOP * clientScale;
                } else if (window.orientation == -90) {
                    //反横屏
                    width = width * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                    // x偏移
                    x = width * IPHONEX_BOTTOM * clientScale;
                }
            }
        }

        if (this._uiRoot) {
            this._uiRoot.x = x;
            this._uiRoot.y = y;
            this._uiRoot.scale(clientScale, clientScale);
            this._uiRoot.resize(width, height);
            this._uiRoot.graphics.clear();
            x = x / clientScale;
            y = y / clientScale;
            this._uiRoot.graphics.drawRect(- x, - y, this._clientWidth, y, '#00000');
            this._uiRoot.graphics.drawRect(- x, height, this._clientWidth, this._clientHeight - y - height, '#00000');

            this._uiRoot.graphics.drawRect(- x, 0, x, height, '#00000');
            this._uiRoot.graphics.drawRect(width, 0, this._clientWidth - x - width, height, '#00000');
        }

        this._blackBorder && this._blackBorder.scale(clientScale, clientScale);
        this._blackBorder && this._blackBorder.resize(width, height);
    }



}