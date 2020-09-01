//地理院地図 Vector データをブラウザで読む
//https://qiita.com/wakufactory/items/e52ed58ef432390a6dd2
// 駅→浅田
//https://rinkobus.bus-navigation.jp/wgsys/wgp/busMarkImg.htm?locale=ja&from=%E5%B7%9D%E5%B4%8E%E9%A7%85%E5%89%8D&fromType=&fromlat=&fromlng=&to=%E6%B5%85%E7%94%B0%E4%B8%89%E4%B8%81%E7%9B%AE&toType=&tolat=&tolng=&existYn=
// 浅田→駅
//https://rinkobus.bus-navigation.jp/wgsys/wgp/busMarkImg.htm?locale=ja&from=%E6%B5%85%E7%94%B0%E4%B8%89%E4%B8%81%E7%9B%AE&fromType=&fromlat=&fromlng=&to=%E5%B7%9D%E5%B4%8E%E9%A7%85%E5%89%8D&toType=&tolat=&tolng=&existYn=

onload = async function () {
    const gsiv = new GSIV()
    await gsiv.init()
    console.log(gsiv)

    const CanvasLayer = L.GridLayer.extend({
        createTile: function (coords, done) {
            console.log(coords)
            let error = null
            // create a <canvas> element for drawing
            const tile = L.DomUtil.create('canvas', 'leaflet-tile');
            // setup tile width and height according to the options
            const size = this.getTileSize();
            tile.width = size.x * 2
            tile.height = size.y * 2
            const ctx = tile.getContext("2d")
            ctx.fillStyle = "rgb(150,150,180)"
            ctx.fillRect(0, 0, tile.width, tile.height)
            gsiv.loadtile(coords.z - 1, coords.x, coords.y).then(data => {
                const layers = data.layers
                ctx.fillStyle = "rgb(250,250,250)"
                ctx.fillRect(0, 0, tile.width, tile.height)
                if (layers.waterarea) gsiv.draw(tile, layers.waterarea)
                if (layers.lake) gsiv.draw(tile, layers.lake)
                if (layers.river) gsiv.draw(tile, layers.river)
                if (layers.railway) gsiv.draw(tile, layers.railway)
                if (layers.structurea) gsiv.draw(tile, layers.structurea)
                if (layers.building) gsiv.draw(tile, layers.building)
                if (layers.road) gsiv.draw(tile, layers.road)
                if (layers.structurel) gsiv.draw(tile, layers.structurel)
                done(error, tile)
            }).catch(e => {
                ctx.fillStyle = "rgb(150,150,150)"
                ctx.fillRect(0, 0, tile.width, tile.height)
                done(error, tile)
            })
            return tile;
        }
    })
    const vlayer = new CanvasLayer({
        tileSize: 512,
        attribution: "<a href='https://github.com/gsi-cyberjapan/gsimaps-vector-experiment' target='_blank'>国土地理院ベクトルタイル提供実験</a>"
    })

    const map = L.map('map', {
        zoom: 13,
        minZoom: 13.5,
        maxZoom: 17.4,
        zoomSnap: 0,
        center: [35.519112, 139.703312]
    });
    vlayer.addTo(map)


    // marker
    let markers = [];
    // マーカーをおく
    function plot(data) {

        //マーカーに表示したい対象の緯度経度とポップアップする名称を設定
        let markerList = [];
        for( let i=0; i<data.length; i++ ) {
            data[i].lat = data[i].lat==''? 0:data[i].lat;
            data[i].lng = data[i].lng==''? 0:data[i].lng;
            markerList.push({
                pos: [data[i].lat, data[i].lng],
                name: (i+1) +':'+ data[i].rollsignName +''+ (data[i].transitName==''||data[i].transitName=='null'?'<span class="sub">'+data[i].transitName+'</span>'+ data[i].routeLineDest: data[i].routeLineDest),
                data: data[i]
            });
        }

        //マーカー全体が入るボックスを作る
        var bound = L.latLngBounds(markerList[0].pos, markerList[0].pos);
        //markerListの設定でマーカーを追加
        for (var num in markerList) {
            var mk = markerList[num];
            var popup = L.popup().setContent(
                `<p>${mk.name}</p>`+
                `<p><span class="dir"><span style="transform: rotate(${mk.data.direction}deg)">↑</span></span> viewPlanFlg:${mk.data.viewPlanFlg} tempBusCode:${mk.data.tempBusCode}</p>`
            );
            markers.push( L.marker(mk.pos, { title: mk.name }).bindPopup(popup).addTo(map) );
            //マーカー全体が入るボックスを広げる
            //bound.extend(mk.pos);
        }
        //マーカー全体が入るように地図範囲を設定する
        //map.fitBounds(bound);
    }

    // 路線切り替え
    const lists = document.querySelectorAll( '#table .list-time' );
    const options = {
        root: null,
        rootMargin: "0px ", // ビューポートの中心を判定基準にする
        threshold: [0.5] // 閾値は0
    };
    const observer = new IntersectionObserver(doWhenIntersect, options);
        // それぞれのboxを監視する
        lists.forEach(list => {
        observer.observe(list);
    });
    function doWhenIntersect(entries) {
    // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
        entries.forEach(entry => {
            console.log('entry', entry.target, entry.isIntersecting, entry.intersectionRatio, entry.target.getAttribute('data-name'));
            if( entry.isIntersecting ) {
                console.log( 'PLOT' );
                let text = document.querySelector('#mapbase .title');
                text.innerText = entry.target.getAttribute('data-name');
                if( markers.length>0 )
                    for( let i=0; i<markers.length; i++ ) {
                        map.removeLayer(markers[i]);
                    }
                markers = [];
                plot(bus_data[entry.target.getAttribute('data-name')]);
            }
        });
    }

}
class GSIV {
    //load tile data
    static load(path) {
        return new Promise(function (resolve, reject) {
            const req = new XMLHttpRequest();
            req.open("get", path, true);
            req.responseType = "arraybuffer";
            req.onload = () => {
                if (req.status == 200) {
                    resolve(req.response);
                } else {
                    reject("file cannot load");
                }
            }
            req.send();
        })
    }

    init() {
        return new Promise((resolve, reject) => {
            //get Mapbox scheme
            protobuf.load("vector_tile.proto", (err, root) => {
                if (err) reject(err)
                this.tile = root.lookupType("vector_tile.Tile");
                resolve(this)
            })
        })
    }
    loadtile(zoom, x, y) {
        const tilepath = `//cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/${zoom}/${x}/${y}.pbf`
        return new Promise((resolve, reject) => {
            GSIV.load(tilepath).then(v => {
                const buf = new Uint8Array(v)
                const msg = this.tile.decode(buf)			//decode Protocol Buffers
                const obj = this.tile.toObject(msg)	//convert to Object
                const layers = {}
                for (let l of obj.layers) {
                    layers[l.name] = l
                }
                //			console.log(layers)
                resolve({ zoom: zoom, tilex: x, tiley: y, layers: layers })
            }).catch(r => {
                reject("cannot load tile")
            })
        });
    }

    //draw road map
    draw(can, layer) {
        function decodeint(value) { return (value >> 1) ^ (-(value & 1)) }
        //console.log(layer)
        const ext = layer.extent
        const ctx = can.getContext("2d")

        let lc = 0;
        const wx = can.width / ext, wy = can.height / ext // axis scale 
        for (let i in layer.features) {
            //decode tags
            const tags = layer.features[i].tags
            const type = layer.features[i].type
            const attr = {}
            for (let i = 0; i < tags.length; i += 2) {
                attr[layer.keys[tags[i]]] = layer.values[tags[i + 1]]
            }
            //		console.log(attr)

            switch (layer.name) {
                case "road":
                    ctx.lineWidth = (attr.rnkWidth) ? (attr.rnkWidth.intValue + 1) : 1
                    //ctx.strokeStyle = "rgba(100,100,100,1)"
                    ctx.strokeStyle = "rgba(102,102,102,1)"
                    if (attr.motorway.intValue == 1) {
                        ctx.lineWidth = 6
                    }
                    break;
                case "structurel":
                    ctx.lineWidth = 2
                    ctx.strokeStyle = "rgba(150,150,50,1)"
                    break;
                case "building":
                case "structurea":
                    ctx.lineWidth = 1
                    ctx.strokeStyle = "rgba(153,153,153,0)"
                    ctx.fillStyle = "rgba(153,153,153,1)"
                    //ctx.strokeStyle = "rgba(200,100,100,0)"
                    //ctx.fillStyle = "rgba(200,100,100,1)"
                    break;
                case "railway":
                    ctx.lineWidth = 4
                    //ctx.strokeStyle = "rgba(150,200,150,1)"
                    ctx.strokeStyle = "rgba(102,102,102,1)"
                    break;
                case "river":
                    ctx.lineWidth = 1
                    //ctx.strokeStyle = "rgba(100,100,250,1)"
                    ctx.fillStyle = "rgba(160,207,227,1)"
                    break;
                case "waterarea":
                case "lake":
                    //ctx.fillStyle = "rgba(150,150,200,1)"
                    ctx.fillStyle = "rgba(160,207,227,1)"
                    break;
                case "contour":
                    ctx.lineWidth = 1
                    ctx.strokeStyle = "rgba(100,50,50,0.5)"
                    break;
                default:
                    ctx.lineWidth = 1
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"
                    ctx.fillStyle = "rgba(100,100,200,1)"
            }
            //decode geometory
            const geo = layer.features[i].geometry
            let gi = 0
            let cx = 0
            let cy = 0
            let sx = 0
            let sy = 0
            //		ctx.lineWidth = attr.rnkWidth.intValue + 1 
            ctx.beginPath()
            while (gi < geo.length) {
                let c = geo[gi++]
                let cmd = c & 7		//command 
                let count = c >> 3 	//count
                switch (cmd) {
                    case 1://moveto
                        for (let i = 0; i < count; i++) {
                            cx = cx + decodeint(geo[gi])
                            cy = cy + decodeint(geo[gi + 1])
                            ctx.moveTo(cx * wx, cy * wy)
                            //						console.log("move "+ cx+"x"+cy)
                        }
                        sx = cx, sy = cy
                        gi += count * 2
                        break
                    case 2://liento
                        for (let i = 0; i < count; i++) {
                            cx += decodeint(geo[gi++])
                            cy += decodeint(geo[gi++])
                            ctx.lineTo(cx * wx, cy * wy)
                            lc++
                            //						console.log("line "+cx+"x"+cy)
                        }
                        break
                    case 7://close
                        ctx.lineTo(sx * wx, sy * wy)
                        ctx.moveTo(cx * wx, cy * wy)
                        lc++
                        break
                    default:
                        console.log("illigal command")
                }
            }
            if (type == 3) ctx.fill()
            else ctx.stroke()
        }
        return lc
    }
}