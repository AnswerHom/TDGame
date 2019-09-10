/**
* name 
*/
module td.data {
    export class TrunkPoint extends utils.Point {
		/**
		 * 关键点id
		 */
        id: number;
		/**
		 * 下一点的节点数据 
		 */
        nextPoints: Array<Point> = new Array<Point>();
		/**
		 * 关键点
		 */
        key_point: td.data.IKeyPointData;
    }
}