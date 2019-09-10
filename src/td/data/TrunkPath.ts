/**
* 寻路
*/
module td.data {
	export class TrunkPath {
		/**
		 * 获取TrunkPoint key(坐标数值不要超过65535)
		 * @param x 
		 * @param y 
		 */
		static getPointKey(x: number, y: number): number {
			x = Math.floor(x);
			return (x << 16) + y
		}

		/**
		 * 获取获取TrunkLine key
		 * @param x 
		 * @param y 
		 */
		static getLineKey(a: TrunkPoint, b: TrunkPoint): number {
			let aid = a.id;
			let bid = b.id;
			return (Math.max(aid, bid) << 16) + Math.min(aid, bid)
		}

		/*干道点*/
		private _trunkPoints: Array<TrunkPoint>;
		// 用于快速搜索
		private _trunkPointsMap: { [key: number]: TrunkPoint };
		/*节点到其他节点的距离描述 -- 有序的*/
		private _dijkstra_map: Array<any>;
		// 线段map
		private _trunkLinesMap: { [key: number]: TrunkLine };

		constructor() {
		}

		/**	干道点 */
		set trunkPoints(v: Array<TrunkPoint>) {
			this._trunkPoints = v;
			this._trunkPointsMap = {};
			this._dijkstra_map = [];
			this._trunkLinesMap = {};
			if (!this._trunkPoints) {
				return;
			}
			// 临时干道点
			this._tempTrunkPoint = new TrunkPoint();
			this._tempTrunkPoint.id = this._trunkPoints.length;
			this._trunkPoints.push(this._tempTrunkPoint);

			let len = this._trunkPoints.length;
			for (var i: number = 0; i < len; i++) {
				let point = this._trunkPoints[i];
				this._trunkPointsMap[TrunkPath.getPointKey(point.x, point.y)] = point;
				var part: Array<number> = this.createdDistanceArr(len);
				this._dijkstra_map[this._dijkstra_map.length] = part;
				for (var j: number = 0; j < point.nextPoints.length; j++) {
					var trunkPoint: TrunkPoint = this.findTrunkPointId(point.nextPoints[j]);
					if (trunkPoint && trunkPoint != point) {
						var distance: number = MathU.getDistance(point.x, point.y, trunkPoint.x, trunkPoint.y);
						part[trunkPoint.id] = distance;
						let key = TrunkPath.getLineKey(point, trunkPoint);
						if (!this._trunkLinesMap[key]) {
							let line = new TrunkLine();
							line.a = point;
							line.b = trunkPoint;
							this._trunkLinesMap[key] = line;
						}
					}
				}
			}

			this._temppart = this._dijkstra_map[this._dijkstra_map.length - 1];
			// logd('--------------------------------------------')
			// for(let i = 0; i < this._dijkstra_map.length; i ++){
			// 	logd(this._dijkstra_map[i])
			// }
			// logd('--------------------------------------------')
			// logd('this.find(130, 250, 272, 150)')
			// logd(this.find(130, 250, 272, 150))
		}

		/**
		 * 创建dijkstra_map需要的距离数组
		 * @return 
		 */
		private createdDistanceArr(len: number): Array<number> {
			var arr: Array<number> = [];
			for (var i: number = 0; i < len; i++) {
				arr[arr.length] = utils.Dijkstra.NO_PATH;
			}
			return arr;
		}

		/**
		 * 找到关键点
		 * @param p
		 * @return 
		 */
		private findTrunkPointId(p: Point): TrunkPoint {
			for (var i: number = 0; i < this._trunkPoints.length; i++) {
				let p1 = this._trunkPoints[i];
				if (p1.x == p.x && p1.y == p.y) {
					return this._trunkPoints[i];
				}
			}
			return null;
		}

		/**
		 * 查找最近的点
		 * @param x 
		 * @param y 
		 */
		private findNearyPoint(x: number, y: number): TrunkPoint {
			let list = this._trunkPoints;
			let len = list.length;
			let p0 = list[0];
			let dist0 = p0.distance(x, y);
			//算出距离
			for (let i = 1; i < len; i++) {
				let p1 = list[i]
				let dist1 = p1.distance(x, y);
				if (dist1 < dist0) {
					p0 = p1;
					dist0 = dist1;
					if (dist0 < 2) {
						break;
					}
				}
			}
			return p0;
		}

		private __tempP1 = new utils.Point();
		private __tempP2 = new utils.Point();
		private __tempP3 = new utils.Point();
		private _temppart: Array<number>;
		private _tempTrunkPoint: TrunkPoint;

		private findNearyProjectionPoint(x: number, y: number): Array<any> {
			let line: TrunkLine;
			let c: Point;
			let dist: number = 999999;
			let p = this.__tempP1;
			p.setTo(x, y);
			let temp = this.__tempP2;
			for (let key in this._trunkLinesMap) {
				let __line = this._trunkLinesMap[key];
				if (__line) {
					let __c = p.projectionPoint(__line.a, __line.b, temp);
					if (__c) {
						let __dist = __c.distance(x, y);
						if (__dist < dist) {
							line = __line;
							if (!c) {
								c = new Point();
							}
							c.setTo(__c.x, __c.y);
							dist = __dist;
						}
					}
				}
			}
			return [line, c, dist];
		}
		/**
		 * 寻路
		 * @param startX 
		 * @param startY 
		 * @param endX 
		 * @param endY 
		 * @param distPoint 目标干道点（可选）
		 */
		find(startX: number, startY: number, endX: number, endY: number): Array<number> {
			if (!this._trunkPoints.length) {
				return [];
			}
			let startid: number = null;
			let p1 = this.findNearyPoint(startX, startY);
			let p1dst = p1.distance(startX, startY);
			if (p1dst < 10) {
				startid = p1.id;
			}
			else {

				let r = this.findNearyProjectionPoint(startX, startY);
				if (r && r[2] < p1dst) {
					// 插入临时干道点
					let line: TrunkLine = r[0];
					let p: Point = r[1];
					this._tempTrunkPoint.x = p.x;
					this._tempTrunkPoint.y = p.y;
					let len = this._trunkPoints.length;
					for (var i: number = 0; i < len; i++) {
						this._temppart[i] = utils.Dijkstra.NO_PATH;
					}
					this._temppart[line.a.id] = line.a.distance(p.x, p.y);
					this._temppart[line.b.id] = line.b.distance(p.x, p.y);
					startid = this._tempTrunkPoint.id;
				}
				else {
					startid = p1.id;
				}
			}

			let p2 = this.findNearyPoint(endX, endY);
			let dijkResult: Object = utils.Dijkstra.getShortedPath(this._dijkstra_map, startid, p2.id);//地图数组,起点,终点
			let dijkPath: Array<number> = dijkResult["path"];
			let drltLen: number = dijkPath.length;
			// if (drltLen > 1) {
			// 	let p1 = this._trunkPoints[dijkPath[0]];
			// 	let p2 = this._trunkPoints[dijkPath[1]];
			// 	Vector2.temp.x = startX;
			// 	Vector2.temp.y = startY;
			// 	let v1 = new Vector2(p1.x, p1.y);
			// 	let v2 = new Vector2(p2.x, p2.y);
			// 	v2.sub(Vector2.temp);
			// 	if (v2.angle(Vector2.temp.sub(v1)) < Math.PI / 10) {
			// 		dijkPath.shift();
			// 	}
			// 	drltLen = dijkPath.length;
			// }
			let path: Array<number> = []
			for (var i: number = 0; i < drltLen; i++) {
				let id = dijkPath[i];
				path.push(this._trunkPoints[id].x, this._trunkPoints[id].y);
			}
			let len = path.length;
			if (len >= 2) {
				let lastx = path[dijkPath.length - 2];
				let lasty = path[dijkPath.length - 1];
				if (lastx != endX || lasty != endY) {
					if (len >= 4) {
						let lastx1 = path[dijkPath.length - 4];
						let lasty1 = path[dijkPath.length - 3];
						let d1 = MathU.getDistance(endX, endY, lastx, lasty);
						let d2 = MathU.getDistance(lastx, lasty, lastx1, lasty1);
						let d3 = MathU.getDistance(endX, endY, lastx1, lasty1);
						if (d3 < d1 + d2) {
							path.length = len - 2;
						}
					}
					// 补最后一点
					path.push(endX, endY);
				}
			}
			return path;
		}
	}

	/**
	 * 干道线段
	 */
	class TrunkLine {
		a: TrunkPoint;
		b: TrunkPoint;
	}
}
