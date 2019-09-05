// 动作
const ACTION_MOVE = 1;
const ACTION_ATTACK = 2;
const ACTION_DEAD = 3;
//方向
const TOWARD_TOP = 1;
const TOWARD_BOTTOM = 2;
const TOWARD_LEFT = 3;
const TOWARD_RIGHT = 4;

module td.scene {
    const ACTION = {
        1: 'move',
        2: 'attack',
        3: 'dead',
    }
    const TOWARD = {
        1: 'top',
        2: 'bottom',
        3: 'left',
        4: 'right'
    }

    //视图对象
    export class AvatarObject {
        private _object: BaseObject;
        get object(): BaseObject {
            return this._object;
        }
        // 素材 {key: {top: ,bttom: ,left: , right: }}
        private _assets: { [key: number]: any } = null;
        /*帧率*/
        private _frameRate: number = 24;
        /**动画当前帧 */
        private _frameCurIdx: number = 0;
        /*帧时间 帧/ms*/
        private _frameTime: number = 0;
        /**帧数 */
        private _frameCount: number = 0;
        /**最后一帧 */
        private _frameLastIdx: number = 0;
        /**总时间 */
        private _totalTime: number = 0;
        /**运行时间 */
        private _runTime: number = 0;
        /**当前动作 */
        private _action: number = ACTION_MOVE;
        /**当前方向 */
        private _toward: number = TOWARD_RIGHT;
        // 速度
        protected _animationSpeed: number = 1.0;
        get animationSpeed(): number {
            return this._animationSpeed;
        }
        set animationSpeed(value: number) {
            this._animationSpeed = value;
            this._frameTime = 1000 / (this._frameRate * value);
            this._totalTime = this._frameCount * this._frameTime;
        }
        /**是否重新计算 */
        private _isCalDrawInfo: boolean = true;
        private _loop: boolean = true;

        constructor(obj: BaseObject) {
            this._object = obj;
            this._runTime = 0;
            this.loadTexture();
        }

        // 加载贴图
        private loadTexture() {
            let urlArr = [];
            for (let keyA in ACTION) {
                let keyANum = parseInt(keyA);
                switch (keyANum) {
                    case ACTION_MOVE:
                    case ACTION_ATTACK:
                        for (let keyT in TOWARD) {
                            let keyTNum = parseInt(keyT);
                            urlArr.push(StringU.substitute(Path.atlas_wj + "shuguo/guanyu/{0}/{1}.atlas", ACTION[keyANum], TOWARD[keyTNum]));
                        }
                        break;
                    case ACTION_DEAD:
                        urlArr.push(StringU.substitute(Path.atlas_wj + "shuguo/guanyu/{0}.atlas", ACTION[keyANum]));
                        break;
                }
            }
            Laya.loader.load(urlArr, new Handler(this, this.onLoadTexture));
        }

        private onLoadTexture() {
            this._assets = {};
            for (let key in ACTION) {
                let keyANum = parseInt(key);
                switch (keyANum) {
                    case ACTION_MOVE:
                    case ACTION_ATTACK:
                        for (let keyT in TOWARD) {
                            let keyTNum = parseInt(keyT);
                            if (!this._assets[keyANum]) this._assets[keyANum] = {};
                            this._assets[keyANum][keyTNum] = this.cacheTexures(this.getPreUrl(ACTION[keyANum], TOWARD[keyTNum]));
                        }
                        break;
                    case ACTION_DEAD:
                        this._assets[keyANum] = this.cacheTexures(this.getPreUrl(ACTION[keyANum]));
                        break;
                }
            }
        }

        private getPreUrl(action: string, toward?: string): string {
            let preUrl = Path.scene_wj + "shuguo/guanyu/";
            if (action) {
                preUrl += action;
            }
            if (toward) {
                preUrl += "/" + toward;
            }
            return preUrl + "/";
        }

        //缓存纹理
        private cacheTexures(preUrl: string): any[] {
            // 获取贴图
            let textures: Array<Texture> = [];
            let texture: Texture;
            let idx = 1;
            do {
                let url = preUrl + idx + '.png';
                texture = Loader.getRes(url);
                if (texture) {
                    textures[idx - 1] = texture;
                    idx++;
                }
                else {
                    break;
                }
            }
            while (true);

            if (!textures.length) {
                return textures;
            }
            return textures;
        }

        onDraw(diff: number, g: Graphics) {
            if (!this._object || !this._assets || this._object.isDied) return;
            this._runTime += diff;
            this._object.update(diff);
            //判断动作变化
            if (this._action != this._object.action || this._toward != this._object.toward) {
                this._isCalDrawInfo = true;
            }
            if (this._isCalDrawInfo)
                this.drawInfoCalculate();
            else
                this._frameCurIdx = this.getCurrentIdx();
            let texture = this._textures[this._frameCurIdx];
            if (texture) {
                g.drawTexture(texture, this._object.x, this._object.y, texture.width, texture.height);
            }
        }

        private _textures: Texture[];//当前纹理集合
        private drawInfoCalculate(): void {
            this._isCalDrawInfo = false;
            this._textures = [];
            this._action = this._object.action;
            this._toward = this._object.toward;
            switch (this._action) {
                case ACTION_MOVE:
                case ACTION_ATTACK:
                    this._textures = this._assets[this._action][this._toward];
                    break;
                case ACTION_DEAD:
                    this._textures = this._assets[this._action];
                    break;
            }
            this._runTime = 0;
            this._frameCount = this._textures.length;
            this._frameLastIdx = this._textures.length - 1;
            this.animationSpeed = 0.5;
            this._frameCurIdx = 0;
            this._loop = this._action == ACTION_MOVE || this._action == ACTION_ATTACK;
        }

        private getCurrentIdx(): number {
            if (this._loop || this._runTime < this._totalTime) {
                //获得无限完整动画循环之后剩余的时间
                var frameYu: number = this._runTime % this._totalTime;
                //定位到帧位置
                var idx: number = Math.floor(frameYu / this._frameTime);
                if (idx >= this._frameCount)
                    return this._frameLastIdx;
                return idx;
            }
            // 最后一帧
            return this._frameLastIdx;
        }
    }
}