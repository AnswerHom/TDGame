module td.utils {

	/**
	* 最短路径算法
	*/
    export class Dijkstra {
        //无法通过的距离;
        static NO_PATH: number = 1000000;

        constructor() {

        }

        //从某一源点出发，找到到某一结点的最短路径
        static getShortedPath(G: Array<any>, star: number, end: number, maxlong: number = Dijkstra.NO_PATH): Object {
            var len: number = G.length;
            var s: Array<any> = new Array<any>();
            var min: number;
            var curNode: number = 0;
            var dist: Array<any> = new Array<any>();
            var prev: Array<any> = new Array<any>();

            var path: Array<any> = new Array<any>();

            for (var v: number = 0; v < len; v++) {
                s[v] = false;
                dist[v] = G[star][v];
                if (dist[v] >= maxlong) {
                    prev[v] = 0;
                }
                else {
                    prev[v] = star;
                }
            }
            path[0] = end;
            dist[star] = 0;
            s[star] = true;

            for (var i: number = 1; i < len; i++) {
                min = maxlong;
                for (var w: number = 0; w < len; w++) {
                    if ((!s[w]) && (dist[w] < min)) {
                        curNode = w;
                        min = dist[w];
                    }
                }
                s[curNode] = true;
                for (var j: number = 0; j < len; j++) {
                    if ((!s[j]) && ((min + G[curNode][j]) < dist[j])) {
                        dist[j] = min + G[curNode][j];
                        prev[j] = curNode;
                    }
                }
            };

            var e: number = end;
            var step: number = 0;
            const maxTitl: number = 3000;
            var curTitl: number = 0;
            while (e != star) {
                curTitl++;
                if (curTitl > maxTitl) {
                    return { dist: dist[end], path: [] };
                }

                step++;
                path[step] = prev[e];
                e = prev[e];
            }
            for (var q: number = step; q > (step / 2); q--) {
                var temp: number = path[step - q];
                path[step - q] = path[q];
                path[q] = temp;
            }

            return { dist: dist[end], path: path };
        }



        //从某一源点出发,找出到所有节点的最短路径
        static getShortedPathList(G: Array<any>, star: number, maxlong: number = Dijkstra.NO_PATH): Object {
            var len: number = G.length;
            var pathID: Array<any> = new Array<any>(len);
            var s: Array<any> = new Array<any>(len);
            var max: number;
            var curNode: number = 0;
            var dist: Array<any> = new Array<any>(len);
            var prev: Array<any> = new Array<any>(len);

            var path: Array<any> = new Array<any>(len);
            for (var n: number = 0; n < len; n++) {
                path[path.length] = [];
            }

            for (var v: number = 0; v < len; v++) {
                s[v] = false;
                dist[v] = G[star][v];
                if (dist[v] > maxlong) {
                    prev[v] = 0;
                }
                else {
                    prev[v] = star;
                }
                path[v][0] = v;
            }
            dist[star] = 0;
            s[star] = true;

            for (var i: number = 1; i < len; i++) {
                max = maxlong;
                for (var w: number = 0; w < len; w++) {
                    if ((!s[w]) && (dist[w] < max)) {
                        curNode = w;
                        max = dist[w];
                    }
                }
                s[curNode] = true;
                for (var j: number = 0; j < len; j++) {
                    if ((!s[j]) && ((max + G[curNode][j]) < dist[j])) {
                        dist[j] = max + G[curNode][j];
                        prev[j] = curNode;
                    }
                }
            }

            for (var k: number = 0; k < len; k++) {
                var e: number = k;
                var step: number = 0;
                const maxTitl: number = 3000;
                var curTitl: number = 0;
                while (e != star) {
                    curTitl++;
                    if (curTitl > maxTitl) {
                        return { dist: dist, path: [] };
                    }
                    step++;
                    path[k][step] = prev[e];
                    e = prev[e];
                }
                for (var p: number = step; p > (step / 2); p--) {
                    var temp: number = path[k][step - p];
                    path[k][step - p] = path[k][p];
                    path[k][p] = temp;
                }
            }
            return { dist: dist, path: path };
        }
    }
}