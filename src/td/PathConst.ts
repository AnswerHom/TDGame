/**
* 路径配置
*/
module td {
	export class Path {
		static template: string = 'scene/template/';
		static uiAtlas: string = "res/atlas/";
		static sfAtlas: string = "res/atlas/sf/";
		static ui: string = "ui/";
		static sound: string = 'scene/sound/';
		static atlas_wj = "res/atlas/wujiang/";
		static scene_wj = "wujiang/"


		/**
		 * 获得一直序列帧地址
		 * @param path 图片路径
		 * @param count 帧数
		 * @param start 起始位置
		 * @param reverse 是否倒序播放
		 */
		static getSeqFrames(path: string, count: number, start: number = 0, reverse: boolean = false): string[] {
			let paths = [];
			if (reverse)
				for (let i = count - 1; i >= start; i--) {
					paths.push(StringU.substitute(path, i));
				}
			else
				for (let i = start; i < start + count; i++) {
					paths.push(StringU.substitute(path, i));
				}
			return paths;
		}
	}
}