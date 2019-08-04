
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class LoadUI extends View {
		public progress_JD:Laya.ProgressBar;
		public label_JD:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":720,"fillColor":"#ffffff"}},{"type":"ProgressBar","props":{"y":635,"width":827,"var":"progress_JD","value":0,"skin":"load/progress_02.png","sizeGrid":"7,16,8,16","height":20,"centerX":0},"child":[{"type":"Label","props":{"y":-30,"width":134,"var":"label_JD","text":"5%","height":31,"fontSize":30,"font":"SimHei","color":"#000000","centerX":0,"bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoadUI.uiView);

        }

    }
}
