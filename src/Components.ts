import { Component } from "@metaverse-systems/libecs-js";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteSheet } from "./SpriteSheet";

class SpriteComponent extends Component
{
  sprite: SpriteAnimation;
  constructor(config) {
    super(config);
    this.Type = "SpriteComponent";
    this.sprite = new SpriteAnimation(config.canvas, config.url, config.width, config.height, config.characterMap);
  }
}

class StaticSpriteComponent extends Component
{
  sprite: SpriteSheet;
  constructor(config) {
    super(config);
    this.Type = "StaticSpriteComponent";
    this.sprite = new SpriteSheet(config.canvas, config.url, config.width, config.height);
  }
}

class TilesheetComponent extends Component
{
  firstGid: number;
  tileCount: number;
  constructor(config) {
    super(config);
    this.Type = "TilesheetComponent";
  }
}

class TileComponent extends Component
{
  x: number;
  y: number;
  width: number;
  height: number;
  tilesheet: string;
  options: any;
  constructor(config) {
    super(config);
    this.Type = "TileComponent";
    this.tilesheet = config.tilesheet;
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;
    this.options = config.options;
  }
}

class PositionComponent extends Component
{
  x: number;
  y: number;
  constructor(config) {
    super(config);
    this.Type = "PositionComponent";
    this.x = config.x;
    this.y = config.y;
  }
}

class PolygonComponent extends Component
{
  points: any;
  constructor(config) {
    super(config);
    this.Type = "PolygonComponent";
    this.points = config.points;
  }
}

class PolylineComponent extends Component
{
  points: any;
  constructor(config) {
    super(config);
    this.Type = "PolylineComponent";
    this.points = config.points;
  }
}

class RectangleComponent extends Component
{
  width: number;
  height: number;
  color: number;
  constructor(config) {
    super(config);
    this.Type = "RectangleComponent";
    this.width = config.width;
    this.height = config.height;
    this.color = config.color;
  }
}

class CurrentSceneComponent extends Component
{
  scene: string;
  constructor(config) {
    super(config);
    this.Type = "CurrentSceneComponent";
    this.scene = config.scene;
  }
}

class SceneComponent extends Component
{
  scene: string;
  constructor(config) {
    super(config);
    this.Type = "SceneComponent";
    this.scene = config.scene;
  }
}

class LoadSceneComponent extends Component
{
  scene: string;
  url: string;
  constructor(config) {
    super(config);
    this.Type = "LoadSceneComponent";
    this.scene = config.scene;
    this.url = config.url;
  }
}

class LevelStartComponent extends Component
{
  x: number;
  y: number;
  constructor(config) {
    super(config);
    this.Type = "LevelStartComponent";
    this.x = config.x;
    this.y = config.y;
  }
}

class ObjectComponent extends Component
{
  gid: number;
  width: number;
  height: number;
  constructor(config) {
    super(config);
    this.Type = "ObjectComponent";
    this.gid = config.gid;
    this.width = config.width;
    this.height = config.height;
  }
}

class SceneTilesheetComponent extends Component
{
  gid: number;
  constructor(config) {
    super(config);
    this.Type = "SceneTilesheetComponent";
    this.gid = config.gid;
  }
}

export {
  SpriteComponent,
  StaticSpriteComponent,
  PositionComponent,
  TileComponent,
  TilesheetComponent,
  PolygonComponent,
  PolylineComponent,
  RectangleComponent,
  CurrentSceneComponent,
  SceneComponent,
  LoadSceneComponent,
  LevelStartComponent,
  ObjectComponent,
  SceneTilesheetComponent
};
