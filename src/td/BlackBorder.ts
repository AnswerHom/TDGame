/**
* name 
*/
module td {
	export class BlackBorder extends td.gui.base.Container {
		// private 
		constructor(app: GameApp) {
			super(app);
		}

		update(diff: number): void {

		}

		resize(w: number, h: number): void {
			super.resize(w, h);
			let borderWidth = (w - Launch.widthDesginPixelw) / 2;
			let borderHeight = (h - Launch.heightDesginPixelw) / 2;
			this.graphics.clear();
			this.graphics.drawRect(0, 0, borderWidth, Launch.heightDesginPixelw, "#000000");
			this.graphics.drawRect(w - borderWidth, 0, w, h, "#000000");
			this.graphics.drawRect(0, 0, w, borderHeight, "#000000");
			this.graphics.drawRect(0, h - borderHeight, w, h, "#000000");
		}
	}
}