/**
* name 
*/
module td.utils {
	export class Point extends Laya.Point {
		static TEMP0 = new Point
		static TEMP1 = new Point
		static TEMP2 = new Point

		add(v: Point): void {
			this.x += v.x;
			this.y += v.y;
		}

		sub(v: Point): void {
			this.x -= v.x;
			this.y -= v.y;
		}

		multiply(v: number): void {
			this.x *= v;
			this.y *= v;
		}

		dotProduct(v: Point): number {
			return this.x * v.x + this.y * v.y
		}

		length(): number {
			return this.distance(0, 0);
		}

		/**
		 * a和b是线段的两个端点 Point.TEMP0，TEMP1不可使用
		 * @param a 
		 * @param b  
		 */
		distanceLine(a: Point, b: Point): number {
			let ap = Point.TEMP0;
			ap.setTo(this.x, this.y);
			ap.sub(a);
			let ab = Point.TEMP1;
			ab.setTo(b.x, b.y);
			ab.sub(a);
			let abdic = ab.length();
			let dot = ap.dotProduct(ab) / (abdic * abdic);

			if (dot < 0) {
				//距离为AP 
				return ap.length();
			}
			else if (dot > 1) {
				//距离为BP
				let bp = Point.TEMP2;
				bp.setTo(this.x, this.y);
				bp.sub(b);
				return bp.length();
			} else {
				//距离为PC
				let ac = ab;
				ac.multiply(dot);
				let c = ac
				c.add(a);
				let pc = Point.TEMP2;
				pc.setTo(this.x, this.y);
				pc.sub(b);
				return pc.length();
			}
		}

		/**
		 * 获取线段内的投影点 Point.TEMP0，TEMP1不可使用
		 * @param a 
		 * @param b 
		 * @param c 
		 */
		projectionPoint(a: Point, b: Point, c?:Point):Point{
			let ap = Point.TEMP0;
			ap.setTo(this.x, this.y);
			ap.sub(a);
			let ab = Point.TEMP1;
			ab.setTo(b.x, b.y);
			ab.sub(a);
			let abdic = ab.length();
			let dot = ap.dotProduct(ab) / (abdic * abdic);
			if (dot < 0) {
				//距离为AP 
				return null;
			}
			else if (dot > 1) {
				//距离为BP
				return null;
			} else {
				//距离为PC
				let ac = ab;
				ac.multiply(dot);
				if(!c){
					c = new Point();
				}
				c.setTo(ac.x, ac.y)
				c.add(a);
				return c;
			}
		}

		// static Test():void{
		// 	let p = new Point(1, 1);
		// 	let a = new Point(0, 0);
		// 	let b = new Point(0, 2);
		// 	logd(p.projectionPoint(a, b));
		// }
	}
}