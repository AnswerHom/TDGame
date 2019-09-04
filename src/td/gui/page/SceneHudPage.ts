/**
* 场景界面
*/
module tb.gui.page {
    export class SceneHudPage extends td.gui.base.Page {
        private _viewUI: ui.Scene1UI;
        private _isMouseDown: boolean = false;
        private _mousePoint: Point;

        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = false;
            this._isTweenOpen = false;
            this._asset = [
                Path.uiAtlas + "wujiang/shuguo/guanyu/move/right.atlas"
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._view = this._viewUI = new ui.Scene1UI();
            this.addChild(this._viewUI);
            this._mousePoint = new Point();
        }

        protected onOpen(): void {
            super.onOpen();
            this._viewUI.view_Wj.on(LEvent.MOUSE_DOWN, this, this.onMouseEvent);
            this._viewUI.view_Wj.on(LEvent.MOUSE_UP, this, this.onMouseEvent);
            Laya.timer.frameLoop(1, this, this.update);
        }

        private update(): void {
            if (this._mousePoint && this._isMouseDown) {
                let x = Laya.stage.mouseX - this._viewUI.view_Wj.width / 2;
                let y = Laya.stage.mouseY - this._viewUI.view_Wj.height / 2;
                this._mousePoint.x = x;
                this._mousePoint.y = y;
                this._mousePoint = this._viewUI.globalToLocal(this._mousePoint);
                let p = this.getNearPoint(this._mousePoint);
                this._viewUI.view_Wj.pos(p.x, p.y);
            }
        }

        private onMouseEvent(e: LEvent) {
            if (e.type == LEvent.MOUSE_DOWN) {
                this._isMouseDown = true;
            } else if (e.type == LEvent.MOUSE_UP) {
                this._isMouseDown = false;
            }
        }

        private getNearPoint(p: Point): Point {
            let arr = this._app.sceneRoot.gridArr;
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let point = arr[i];
                if (MathU.getDistance(p.x, p.y, point.x, point.y) <= 20) {
                    return point;
                }
            }
            return p;
        }

        close(): void {
            super.close();
        }
    }
}