"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneTilesheetComponent = exports.ObjectComponent = exports.LevelStartComponent = exports.LoadSceneComponent = exports.SceneComponent = exports.CurrentSceneComponent = exports.RectangleComponent = exports.PolylineComponent = exports.PolygonComponent = exports.TilesheetComponent = exports.TileComponent = exports.PositionComponent = exports.StaticSpriteComponent = exports.SpriteComponent = void 0;
const libecs_js_1 = require("@metaverse-systems/libecs-js");
const SpriteAnimation_1 = require("./SpriteAnimation");
const SpriteSheet_1 = require("./SpriteSheet");
class SpriteComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "SpriteComponent";
        this.sprite = new SpriteAnimation_1.SpriteAnimation(config.canvas, config.url, config.width, config.height, config.characterMap);
    }
}
exports.SpriteComponent = SpriteComponent;
class StaticSpriteComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "StaticSpriteComponent";
        this.sprite = new SpriteSheet_1.SpriteSheet(config.canvas, config.url, config.width, config.height);
    }
}
exports.StaticSpriteComponent = StaticSpriteComponent;
class TilesheetComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "TilesheetComponent";
    }
}
exports.TilesheetComponent = TilesheetComponent;
class TileComponent extends libecs_js_1.Component {
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
exports.TileComponent = TileComponent;
class PositionComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "PositionComponent";
        this.x = config.x;
        this.y = config.y;
    }
}
exports.PositionComponent = PositionComponent;
class PolygonComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "PolygonComponent";
        this.points = config.points;
    }
}
exports.PolygonComponent = PolygonComponent;
class PolylineComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "PolylineComponent";
        this.points = config.points;
    }
}
exports.PolylineComponent = PolylineComponent;
class RectangleComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "RectangleComponent";
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
    }
}
exports.RectangleComponent = RectangleComponent;
class CurrentSceneComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "CurrentSceneComponent";
        this.scene = config.scene;
    }
}
exports.CurrentSceneComponent = CurrentSceneComponent;
class SceneComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "SceneComponent";
        this.scene = config.scene;
    }
}
exports.SceneComponent = SceneComponent;
class LoadSceneComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "LoadSceneComponent";
        this.scene = config.scene;
        this.url = config.url;
    }
}
exports.LoadSceneComponent = LoadSceneComponent;
class LevelStartComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "LevelStartComponent";
        this.x = config.x;
        this.y = config.y;
    }
}
exports.LevelStartComponent = LevelStartComponent;
class ObjectComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "ObjectComponent";
        this.gid = config.gid;
        this.width = config.width;
        this.height = config.height;
    }
}
exports.ObjectComponent = ObjectComponent;
class SceneTilesheetComponent extends libecs_js_1.Component {
    constructor(config) {
        super(config);
        this.Type = "SceneTilesheetComponent";
        this.gid = config.gid;
    }
}
exports.SceneTilesheetComponent = SceneTilesheetComponent;
//# sourceMappingURL=Components.js.map