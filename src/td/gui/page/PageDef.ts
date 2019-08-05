/**
* name 
*/
module tb.gui.page {
	interface ClassMap {
		[index: string]: Object;
	}

	export class PageDef {
		/**加载界面 */
		static LOAD: number = 0;
		/**HUD界面 */
		static HUD: number = 1;
		/**SCENE HUD界面 */
		static SCENE_HUD: number = 2;

		//页面集合
		private static _pageClassMap: ClassMap = {};

		public static init(): void {
			PageDef._pageClassMap[PageDef.LOAD] = Load;
			PageDef._pageClassMap[PageDef.HUD] = HudPage;
			PageDef._pageClassMap[PageDef.SCENE_HUD] = SceneHudPage;
		}

		public static getPageClass(key: number): Object {
			return PageDef._pageClassMap[key];
		}
	}
}