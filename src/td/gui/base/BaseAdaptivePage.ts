module td.gui.base {

    export class BaseAdaptivePage extends Page {

        protected onLoaded(): void {
            super.onLoaded();
            this.layout();
        }

        // 重新布局
        protected layout(): void {
            super.layout();
            if (!this._view) return;
            if (this._view.box_bottom) {
                if (onIPhoneX) {
                    this._view.box_bottom.y = this._clientHeight - this._view.box_bottom.height + 5;
                } else {
                    this._view.box_bottom.y = this._clientHeight - this._view.box_bottom.height
                }
            }
            if(this._view.box_top){
                if(onIPhoneX){
                    this._view.box_top.y = -75;
                }else{
                    this._view.box_top.y = 0;
                }
            }
            // if(this._view.box_title){
            //     if(onIPhoneX){
            //         this._view.box_title.y = 26 * (Laya.Browser.clientHeight / this._view.parent.height);
            //     }
            // }
        }
    }
}