/**
* 路径配置
*/
module td {
	export class Path {
		static template: string = 'scene/template/';
		static uiAtlas: string = "res/atlas/";
		static sfAtlas: string = "res/atlas/sf/";
		static ui: string = "ui/";
		static resource3D: string = "scene/3d/";
		static sound:string = 'scene/sound/';
		static scene_path: string = Path.resource3D + "LayaScene_baiwanyinyangshi/";
		static skin_path: string = Path.resource3D + "LayaScene_M{0}/M{0}.lh";
		static scene: string = Path.scene_path + "baiwanyinyangshi.ls";
		static scene_model: string = Path.scene_path + "Assets/yeyouji/model/";
		static scene_texture: string = Path.scene_path + "Assets/yeyouji/model/Materials/";
		static name_texture: string = Path.scene_path + "Assets/AINames/";
		static icon: string = "scene/icon/";
		static custom_atlas: string = "effect_xl/custom_atlas/";
		static mathSprite3D: string = Path.resource3D + "LayaScene_math/math.lh";



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