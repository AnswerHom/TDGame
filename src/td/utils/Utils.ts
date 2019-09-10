module td.utils {
    var LAST_AVATAR_OID = 0;
    export function GetNewOid(): number {
        return LAST_AVATAR_OID++;
    }

    // 面部朝向
    export const FACETO_BOTTOM_RIGHT = 0;
    export const FACETO_BOTTOM_LEFT = 1;
    export const FACETO_UPPER_LEFT = 2;
    export const FACETO_UPPER_RIGHT = 3;

    // 向量获取面部朝向
    export function getFaceTowardByV2(ori:Vector2){
        return Math.floor(ori.getToward() / (Vector2.TowardCount / 4));
    }

    //面部朝向获取向量
    export function setV2ByFaceToward(ori:Vector2,v:number){
        ori.fromToward(v * (Vector2.TowardCount / 4) + (Vector2.TowardCount / 8));
    }

    // 区域判断
    export function areaContains(area: Array<number>, x: number, y: number): boolean {
        if (!area) {
            return false;
        }
        var i = 0;
        var j = 0;
        var cnt = 0;
        var size = area.length / 2;
        for (i = 0; i < size; i++) {
            j = (i == size - 1) ? 0 : i + 1;

            var xOffsetI = i * 2;
            var yOffsetI = xOffsetI + 1;

            var xOffsetJ = j * 2;
            var yOffsetJ = xOffsetJ + 1;

            if (area[yOffsetI] != area[yOffsetJ] &&
                (y >= area[yOffsetI] && y < area[yOffsetJ] || y >= area[yOffsetJ] && y < area[yOffsetI]) &&
                x < (area[xOffsetJ] - area[xOffsetI]) * (y - area[yOffsetI]) / (area[yOffsetJ] - area[yOffsetI]) + area[xOffsetI])
                cnt++;
        }
        return cnt % 2 > 0;
    }

    /**名称截取超过6个字节显示... */
    export function getNameSlice(str, c = 6) {
        let strcodeLength = getStrCodeLen(str);
        if (strcodeLength > 2 * c) {
            let t1 = str.replace(/([u0391-uffe5])/ig, '$1a');
            let t2 = t1.substring(0, c);
            let t3 = t2.replace(/([u0391-uffe5])a/ig, '$1') + '...';
            return t3;
        }
        else {
            return str;
        }
    }

    function getStrCodeLen(s) {
        if (!s) return 0;
        let c = s.match(/[^x00-xff]/ig);
        return s.length + (c == null ? 0 : c.length);
    }

    /**检验两个位置是否一致*/
    export function equalPos(pos1, pos2): boolean {
            var diff_x = (pos1.x > pos2.x) ? (pos1.x - pos2.x) : (pos2.x - pos1.x);
            var diff_y = (pos1.y > pos2.y) ? (pos1.y - pos2.y) : (pos2.y - pos1.y);
            return diff_y < 1 && diff_x < 1;
        }
}
