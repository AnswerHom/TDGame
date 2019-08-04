/**
* HUD
*/
module td.gui{
	export class HUD extends td.gui.base.PageContainer {
		constructor(app: GameApp){
			super(app);
		}		

		closeAll():void{
			for (let key in this._pages) {
				let pageid:number = Number(key);
				this.close(pageid);
			}
		}
	}
}