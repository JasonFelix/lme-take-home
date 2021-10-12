import { makeAutoObservable } from "mobx";
import Robot from "./Robot";
import { Coordinates, Dimensions } from "./types";

export default class Area {
  robots: Array<Robot> = [];
  scents: Map<string, boolean> = new Map();

  /**
   * 
   * @param width : Size of grid width. Default size is 50.
   * @param height : Size of grid width. Default size is 50.
   */
  constructor(private _dimensions: Dimensions, private _maxDimensions: Dimensions = { width: 50, height: 50 }) {
    if (this.dimensions.width > this._maxDimensions.width || this._maxDimensions.height > 50) {
      throw new Error(`Grid height / width too large. The max width is ${this._maxDimensions.width} / height is ${this._maxDimensions.height}.`);
    }
    makeAutoObservable(this);
  }

  addRobot(robot: Robot): void {
    robot.area = this;

    while (robot.hasInstructions() && !robot.isLost()) {
      const prev = robot.coordinates;
      robot.move();
      const post = robot.coordinates;
      if (!this.withinBounds(post)) {
        this.scents.set(JSON.stringify(prev), true);
        continue;
      }
    }

    this.robots.push(robot);
  }

  get dimensions() {
    return this._dimensions;
  }

  set dimensions({ width, height }: Dimensions) {
    if (width > this._maxDimensions.width || this._maxDimensions.height > 50) {
      throw new Error(`Grid height / width too large. The max width is ${this._maxDimensions.width} / height is ${this._maxDimensions.height}.`);
    }
    this.dimensions.width = width;
    this.dimensions.height = height
  }

  purge() {
    this.robots = [];
    this.scents = new Map();
    this.dimensions.width = 0;
    this.dimensions.height = 0;
  }

  withinBounds({ x, y }: Coordinates) {
    return x >= 0 && y >= 0 && x <= this.dimensions.width && y <= this.dimensions.height;
  }
}
