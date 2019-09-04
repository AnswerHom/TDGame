module td.scene {
    // 动作
    const ACTION_MOVE = 1;
    const ACTION_ATTACK = 2;
    const ACTION_DEAD = 3;

    const ACTION = {
        1: 'move',
        2: 'attack',
        3: 'dead',
    }

    //方向
    const TOWARD_TOP = 1;
    const TOWARD_BOTTOM = 2;
    const TOWARD_LEFT = 3;
    const TOWARD_RIGHT = 4;

    const TOWARD = {
        1: 'top',
        2: 'bottom',
        3: 'left',
        4: 'right'
    }

    //视图对象
    export class AvatarObject {
        private _object: BaseObject;
        // 素材 {key: {top: ,bttom: ,left: , right: }}
        private _assets: { [key: number]: any } = {};
        /*帧率*/
        private _frameRate: number = 24;
        // 动画当前帧
        private _frameCurIdx: number = 0;
        /*帧时间 帧/ms*/
        private _frameTime: number = 0;

        constructor(obj: BaseObject) {
            this._object = obj;
            this._frameTime = 1000 / this._frameRate;
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

        onDraw(g: Graphics) {
            
        }
    }
}