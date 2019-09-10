module td.scene {
    export class AvatarBase extends utils.MouseEventObject implements td.object.ISortDrawObject {

        //场景位置
        pos: Vector2;

        protected _pivotX: number = 0;
        protected _pivotY: number = 0;

        protected _visible: boolean;
        get visible(): boolean {
            return this._visible;
        }
        set visible(v: boolean) {
            this._visible = v;
        }

        private _headHeight: number;
        get headHeight(): number {
            return this._headHeight;
        }

        protected _oid: number = 0;
        get oid(): number {
            return this._oid;
        }

        /**
         * 贴图
         */
        protected _texture: Texture;
        get texture() {
            return this._texture;
        }
        /**
         * 位置
         */
        protected _drawX: number;
        get drawX() {
            return this._drawX
        }
        protected _drawY: number;
        get drawY() {
            return this._drawY
        }
        /**
         * dax
         */
        protected _drawW: number;
        protected _drawH: number;
        // 透明度
        protected _alpha: number = 1;
        /**
         * 透明度
         */
        get alpha(): number {
            return this._alpha;
        }
        set alpha(v: number) {
            this._alpha = v;
        }
        // 缩放
        protected _scaleX: number = 1;
        set scaleX(v: number) {
            this._scaleX = v;
        }
        protected _scaleY: number = 1;
        set scaleY(v: number) {
            this._scaleY = v;
        }

        protected _scale: number = 1;
        set scale(v: number) {
            this._scale = v;
            this._scaleX = v;
            this._scaleY = v;
        }

        // 旋转角度
        protected _rotateAngle: number = 0;
        // 是否水平翻转
        protected _isFlipH: boolean = false;
        // 渲染矩阵
        protected _matrix = new Matrix();

        protected _sortScore: number = 0;
        /**
         * 排序评分
         */
        get sortScore(): number {
            return this._sortScore;
        }

        protected _game: GameApp;
        protected _camera: Camera;

        constructor(v: GameApp) {
            super();
            this._oid = utils.GetNewOid();
            this._game = v;
            this._camera = v.sceneRoot.camera;
            this.pos = new Vector2;
            this._visible = true;
        }

        update(diff: number): void {
            this._drawX = this._camera.getScenePxByCellX(this.pos.x);
            this._drawY = this._camera.getScenePxByCellY(this.pos.y);
        }

        onDraw(diff: number, g: Graphics, ...args): void {
            if (!this._texture) {
                return;
            }
            if (!this._drawW) {
                this._drawW = this._texture.sourceWidth;
            }
            if (!this._drawH) {
                this._drawH = this._texture.sourceHeight;
            }
            let w = this._drawW;
            let h = this._drawH;
            let halfw = w / 2;
            let halfh = h / 2;
            let matrix = this._matrix;
            matrix.identity();
            matrix.tx = - halfw;
            matrix.ty = - halfh;
            let scaleX = this._isFlipH ? -this._scaleX : this._scaleX;
            let scaleY = this._scaleY;
            matrix.scale(scaleX, scaleY);
            matrix.tx += halfw - this._pivotX;
            matrix.ty += halfh - this._pivotY;
            matrix.rotate(this._rotateAngle);
            matrix.tx += this._drawX;
            matrix.ty += this._drawY;

            g.drawTexture(this._texture, 0, 0, w, h, matrix, this._alpha);
            //this.drawHitArea(this._hitArea, args[1], this._pos.x, this._pos.y, this._drawX, this._drawY);
            //this.drawAnchor(args[1]);

        }

        // 绘制名字部分
        protected drawName(g: Graphics, x: number, y: number, ori: number, scale: number, headHeight: number): number {
            return 0;
        }

        protected drawAnchor(g: Graphics): void {
            let texture = SceneRes.ANCHOR_POINT_ICON_TEXTURE;
            let w = 6;
            g.drawTexture(texture, this._drawX - w / 2, this._drawY - w / 2, w, w);
        }

        clear(checkNow: boolean): void {
            this._texture = null;
        }
    }
}