/**
* 加载界面
*/
module tb.gui.page {
    export class HudPage extends td.gui.base.Page {
        private _viewUI: ui.HudUI;

        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = false;
            this._isTweenOpen = false;
            this._asset = [
                Path.uiAtlas + "hud.atlas"
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._view = this._viewUI = new ui.HudUI();
            this.addChild(this._viewUI);
        }

        protected onOpen(): void {
            super.onOpen();
        }


        close(): void {
            super.close();
        }
    }
}