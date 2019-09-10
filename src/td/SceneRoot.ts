/**
* 场景
*/
module td {
    export class SceneRoot extends Laya.Sprite {
        public static STATE_NONE: number = 0;//无
        public static STATE_START: number = 1;//开始
        public static STATE_OVER: number = 2;//结束
        /*摄像机*/
        public camera: Camera;
        // 摄像机焦点对象
        cameraFocus: Vector2;

        private _gameState: number = 0;
        get gameState() {
            return this._gameState;
        }
        set gameState(v: number) {
            this._gameState = v;
        }
        private _app: GameApp;
        //绘制对象
        private _avatars: AvatarObject[];
        get avatars() {
            return this._avatars;
        }
        //层
        private _avatarLayer: Sprite;

        constructor(app: GameApp) {
            super();
            this._app = app;
            this._avatars = [];
            this._avatarLayer = new Sprite();
            this.addChild(this._avatarLayer);
        }

        update(diff: number) {
            if (this._gameState != SceneRoot.STATE_START) return;
            this._avatarLayer.graphics.clear();
            let len = this._avatars.length;
            for (let i = 0; i < len; i++) {
                let avatar = this._avatars[i];
                avatar.onDraw(diff, this._avatarLayer.graphics);
            }
        }
    }
}