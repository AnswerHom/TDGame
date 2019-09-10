module td.scene {
	export class SceneRes {
		static CELL_WIDTH: number = 1;
		static CELL_HEIGHT: number = 1;
		/**
		 * 锁定的图标
		 */
		static LOCK_ICON_TEXTURE: Texture;
		static LOCK_ICON_WIDTH = 50;
		static LOCK_ICON_HEIGHT = 50;
		// 橘色点
		static ANCHOR_POINT_ICON_TEXTURE: Texture;
		// 黑衣人素材
		static BLACKMAN_TEXTURE: Texture;
		/**
		 * 场景素材加载完成
		 */
		static onLoadSceneAssets(): void {
		}

		/**
		 * 地图素材
		 */
		static onLoadMapAssets():void{
			// this.LOCK_ICON_TEXTURE = Loader.getRes(Path.map_part + 'JZ_lock.png');
			// this.ANCHOR_POINT_ICON_TEXTURE = this.LOCK_ICON_TEXTURE;
			// this.BLACKMAN_TEXTURE = Loader.getRes(Path.map_part +'build_blackman.png');
		}
	}
}