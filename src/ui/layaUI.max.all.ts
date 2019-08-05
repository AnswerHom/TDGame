
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class HudUI extends View {
		public image_Top:Laya.Image;
		public image_Bottom:Laya.Image;
		public btn_Start:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"hud/di_pfdk.png","sizeGrid":"50,50,50,50","height":720}},{"type":"Image","props":{"x":0,"width":1280,"var":"image_Top","top":0,"skin":"hud/tu_tk.png","sizeGrid":"0,500,0,500"}},{"type":"Image","props":{"x":0,"width":1280,"var":"image_Bottom","skin":"hud/tu_tbd.png","sizeGrid":"0,63,0,201","bottom":0}},{"type":"Button","props":{"var":"btn_Start","stateNum":1,"skin":"hud/btn_001.png","labelSize":35,"labelFont":"SimHei","labelColors":"#6b4b35","label":"游戏开始","centerX":0,"bottom":113}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HudUI.uiView);

        }

    }
}

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
