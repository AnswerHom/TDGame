/**
* 45度场景地砖
*/
module td.data {
	export class Tiled {
		// 方向
		private static ANGLE = 45;
		// 块宽度
		private static BLOCK_WIDTH = 32;
		// 块高度
		private static BLOCK_HEIGHT = 16;

		private static _matrix: Matrix;
		/**
		 * 变换矩阵
		 */
		static get matrix(): Matrix {
			if (!this._matrix) {
				this._matrix = new Matrix();
				this._matrix.rotate(Tiled.ANGLE * Math.PI / 180);
				let scaleX = Tiled.BLOCK_WIDTH / Math.sqrt(2);
				this._matrix.scale(scaleX, scaleX * (Tiled.BLOCK_HEIGHT / Tiled.BLOCK_WIDTH));
			}
			return this._matrix;
		}

		/**
		 * 地砖坐标转像素坐标
		 * @param out 
		 */
		static blockToPx(out: Point): Point {
			return this.matrix.transformPoint(out);
		}

		/**
		 * 像素坐标转地砖坐标
		 * @param out 
		 */
		static pxToBlock(out: Point): Point {
			return this.matrix.invertTransformPoint(out);
		}


		/**
		 * 坐标x
		 */
		x: number = 0;
		/**
		 * 坐标y
		 */
		y: number = 0;

		/**
		 * 宽度
		 */
		width: number = 0;
		/**
		 * 高度
		 */
		height: number = 0;
		/**
		 * 开放块列表
		 */
		openBlock: Array<number> = [];

		constructor() {
		}

		init(v: any): void {
			if (!v) {
				return;
			}
			this.x = v.x;
			this.y = v.y;
			this.width = v.width;
			this.height = v.height;
			this.openBlock = v.open_block;
		}

		/**
		 * 获取像素坐标
		 * @param out 
		 */
		blockToPx(out: Point): Point {
			out = Tiled.blockToPx(out);
			out.x += this.x;
			out.y += this.y;
			return out;
		}

		/**
		 * 像素坐标转地砖坐标
		 * @param out 
		 */
		pxToBlock(out: Point): Point {
			out.x -= this.x;
			out.y -= this.y;
			out = Tiled.pxToBlock(out);
			return out;
		}

		// static test(): void {
		// 	let a = new game.data.SceneTiled();
		// 	let sp = new Sprite();
		// 	sp.x = 200;
		// 	sp.y = 200;
		// 	Laya.stage.addChild(sp);
		// 	sp.graphics.drawRect(0, 0, 160, 80, '#FFFFFF');
		// 	a.x = 80;
		// 	// a.y = 0;
		// 	a.width = 5;
		// 	a.height = 5;
		// 	let p = new Point();
		// 	let y = 0;
		// 	while(p.y < 6){
		// 		p = a.blockPx(p);
		// 		logd(p)
		// 		sp.graphics.drawCircle(p.x, p.y, 4, '#00000');
		// 		y ++;
		// 		p.x = 0;
		// 		p.y = y;
		// 	}

		// 	p.x = 5;
		// 	p.y = 5;
		// 	p = a.blockPx(p);
		// 	logd(p)
		// 	sp.graphics.drawCircle(p.x, p.y, 4, '#00000');
		// }
	}
}