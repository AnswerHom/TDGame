/**
* name 
*/
module td.object {
	/**
	 * 场景对象
	 */
    export interface ISceneObject {
		/**
		 * 位置
		 */
        pos: Vector2;
		/**
		 * 视图对象
		 */
        avatar: AvatarBase;
		/**
		 * 是否在摄像机可视范围内
		 */
        lookInCamera: boolean;
    }

    /**
     * Avatar绘制对象
     */
    export interface ISortDrawObject {
        oid: number;
        sortScore: number;
        visible: boolean;
        update(diff: number): void;
        onDraw(diff: number, g: Graphics, ...args): void;
        clear(checkNow: boolean): void;
    }

}