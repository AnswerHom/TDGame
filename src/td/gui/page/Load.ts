/**
* 加载界面
*/
module tb.gui.page {
    export class Load extends td.gui.base.Page {
        private _viewUI: ui.LoadUI;

        constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(app, onOpenFunc, onCloseFunc);
            this._isModal = false;
            this._isTweenOpen = false;
            this._asset = [
                Path.uiAtlas + "load.atlas"
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._view = this._viewUI = new ui.LoadUI();
            this.addChild(this._viewUI);
        }

        protected onOpen(): void {
            super.onOpen();
            this._viewUI.progress_JD.value = 0;
            Laya.Tween.to(this._viewUI.progress_JD, { value: 1, update: Handler.create(this, this.updateJD, null, false) }, 1000, null, Handler.create(this, this.close, null, false));
        }

        private updateJD(): void {
            this._viewUI.label_JD.text = Math.floor(this._viewUI.progress_JD.value * 100) + "%";
        }

        close(): void {
            Laya.Tween.clearAll(this._viewUI.progress_JD);
            super.close();
        }
    }
}