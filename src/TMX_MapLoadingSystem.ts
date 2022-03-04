import fetch from "node-fetch";
import tmx from "tiled-tmx-parser";
import { System } from '@metaverse-systems/libecs-js';
import { PolygonComponent, PolylineComponent, PositionComponent, RectangleComponent, 
         SceneComponent, StaticSpriteComponent, TileComponent, TilesheetComponent } from "./Components";

class TMX_MapLoadingSystem extends System
{
  loadedScenes: string[];
  canvas: HTMLCanvasElement;
  tilesheetBaseURL: string;

  constructor(config)
  {
    super(config);
    if(config === undefined) {
      config = {};
    }

    this.Handle = "TMX_SceneLoadingSystem";
    this.loadedScenes = [];
    this.canvas = config.canvas;
    this.tilesheetBaseURL = config.tilesheetBaseURL;
  }

  Init = () => {
    this.Container.Components["LoadSceneComponent"] = {};
  }

  Update = () => {
    const LoadScenes = this.Container.Components["LoadSceneComponent"];
    if(LoadScenes === undefined) return;

    let entity = "";
    Object.keys(LoadScenes).forEach((e) => entity = e);
    if(!entity) return;

    const { scene, url } = LoadScenes[entity];
    this.Container.EntityDestroy(entity);

    if(this.loadedScenes.includes(scene)) {
      console.log("Scene " + scene + " already loaded.");
      return;
    }

    this.loadedScenes.push(scene);
    console.log("Loading " + scene + " from " + url);
    
    this.DeltaTimeGet();
    fetch(url)
    .then((response) => response.text())
    .then((data) => {
      tmx.parse(data, "", (err, map) => {
        if(map.properties.red !== undefined) this.setBackgroundColor(scene, map);
//        this.setMusic(map.properties.soundtrack);
        map.layers.forEach((layer) => {
          switch(layer.type)
          {
            case "tile":
              this.buildTileLayer(scene, layer);
              break;
            case "object":
              this.buildObjectLayer(scene, layer);
              break;
            default:
              console.log("initializeMap(): Unknown layer type: " + layer.type);
              break;
          }
        });
      });
    });

    const time = this.DeltaTimeGet();
    console.log("Load time for " + scene + ": " + time + "ms");
  }

  setBackgroundColor = (scene, map) => {
    const e = this.Container.Entity();
    e.Component(new PositionComponent({ x: 0, y: 0 }));

    const backgroundWidth = map.width * map.tileWidth;
    const backgroundHeight = map.height * map.tileHeight;
    const color = "#" + parseInt(map.properties.red).toString(16)
                      + parseInt(map.properties.green).toString(16)
                      + parseInt(map.properties.blue).toString(16);

    e.Component(new RectangleComponent({ width: backgroundWidth, height: backgroundHeight, color: color }));
    e.Component(new SceneComponent({ scene: scene }));
  }

  buildObjectLayer = (scene, layer) => {
    layer.objects.forEach((o) => {
      if(o.type === "sprite") {
        this.buildSprite(scene, o);
        return;
      }

      if(o.type === "door") {
        if(o.name !== "main") return;
/*
        this.setState({ levelStart: { x: o.x - 0, y: o.y - 0 } }, () => {
          this.initializePlayer();
        });
*/
      }

      if(o.polygon !== null) {
//      this.buildPolygon(scene, o);
        return;
      }

      if(o.polyline !== null) {
        this.buildPolyline(scene, o);
        return;
      }

      this.buildObject(scene, o);
    });
  }

  buildObject = (scene, o) => {
/*
console.info("buildObject():");
console.info(scene);
console.info(o);
*/
//        let tX = tileId % tilesheetCols;
//        let tY = (tileId - tX) / tilesheetCols;
    const e = this.Container.Entity();
    e.Component(new PositionComponent({ x: o.x, y: o.y }));
//    e.Component(new );
    e.Component(new SceneComponent({ scene: scene }));
  }

  buildSprite = (scene, o) => {
    const url = this.tilesheetBaseURL + o.properties.sheet;

    const e = this.Container.Entity();
    e.Component(new PositionComponent({ x: o.x, y: o.y }));

    const options = { flipHorizontal: o.properties.flip === "true" ? true : false };
    e.Component(new StaticSpriteComponent({ canvas: this.canvas, url: url, width: o.properties.width,
                                            height: o.properties.height, x: o.x, y: o.y, options: options }));
    e.Component(new SceneComponent({ scene: scene }));
  }

  buildPolygon = (scene, o) => {
    const e = this.Container.Entity();
    e.Component(new PositionComponent({ x: o.x, y: o.y }));
    e.Component(new PolygonComponent({ points: o.polygon }));
    e.Component(new SceneComponent({ scene: scene }));
  }

  buildPolyline = (scene, o) => {
    const e = this.Container.Entity();
    e.Component(new PositionComponent({ x: o.x, y: o.y }));
    e.Component(new PolylineComponent({ points: o.polyline }));
    e.Component(new SceneComponent({ scene: scene }));
  }

  buildTileLayer = (scene, layer) => {
    const tileSet = layer.map.tileSets[0];
console.log(tileSet);
    const tilesheetURL = this.tilesheetBaseURL + "images/" + tileSet.image.source;
    const tilesheetCols = tileSet.image.width / tileSet.tileWidth;

    let e = this.Container.Entity();
    e.Component(new TilesheetComponent({ url: tilesheetURL, width: tileSet.tileWidth, height: tileSet.tileHeight,
                                         firstGid: tileSet.firstGid, tileCount: tileSet.tiles.length }));

    let maxCols = layer.map.width;
    let maxRows = layer.map.height;

    let index = 0;
    for(let y = 0; y < maxRows; y++)
    {
      for(let x = 0; x < maxCols; x++)
      {
        if(layer.tiles[index] === undefined) {
          index++;
          continue;
        }

        let tileId = layer.tiles[index].id;

        if(tileId === -1)
        {
            index++;
            continue;
        }

        let tX = tileId % tilesheetCols;
        let tY = (tileId - tX) / tilesheetCols;

        const options: {
          flipHorizontal: boolean,
          flipVertical: boolean,
          flipDiagonal: boolean,
        } = {
          flipHorizontal: false,
          flipVertical: false,
          flipDiagonal: false,
        };

        if(layer.horizontalFlips[index] === true) {
          options.flipHorizontal = true;
        }
        if(layer.verticalFlips[index] === true) {
          options.flipVertical = true;
        }
        if(layer.diagonalFlips[index] === true) {
          options.flipDiagonal = true;
        }
        e = this.Container.Entity();
        e.Component(new PositionComponent({ x: x, y: y }));
        e.Component(new TileComponent({ tilesheet: tilesheetURL, width: tileSet.tileWidth, height: tileSet.tileHeight, x: tX, y: tY, options: options }));
        e.Component(new SceneComponent({ scene: scene }));

        index++;
      }
    }
  }
}

export default TMX_MapLoadingSystem;
