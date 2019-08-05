/**
* 场景
*/
module td {
    export class SceneRoot extends Laya.Sprite {
        public static STATE_NONE: number = 0;//无
        public static STATE_START: number = 1;//开始
        public static STATE_OVER: number = 2;//结束
        private _gameState: number = 0;
        get gameState() {
            return this._gameState;
        }
        private _app: GameApp;
        //网格位置数组
        private _gridArr: Point[];
        get gridArr() {
            return this._gridArr;
        }
        //网格宽度
        private _gridWidth: number = 0;
        //网格高度
        private _gridHeight: number = 0;
        get gridWidth() {
            return this._gridWidth;
        }
        get gridHeight() {
            return this._gridHeight;
        }

        constructor(app: GameApp) {
            super();
            this._app = app;
            this._gridArr = [];
        }

        /**
         * 初始化场景网格
         * @param startX 起始X
         * @param startY 起始Y
         * @param endX 结束Y
         * @param endY 结束Y
         * @param row 多少行
         * @param col 多少列
         */
        initScene(startX: number, startY: number, endX: number, endY: number, row: number, col: number) {
            this._gridArr = [];
            this._gridWidth = (endX - startX) / col;
            this._gridHeight = (endY - startY) / row;
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    let x = startX + this._gridWidth * j;
                    let y = startY + this._gridHeight * i;
                    let p = new Point(x, y);
                    this._gridArr.push(p);
                }
            }
        }

        addCat(index: number, cat: BaseCat) {

        }
    }
}