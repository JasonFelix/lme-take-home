import { makeAutoObservable } from "mobx";
import Robot from "./Robot";
import { Coordinates, Dimensions } from "./types";

export default class Area {
  _robots: Array<Robot> = [];

  _scents: Map<string, boolean> = new Map();

  /**
   *
   * @param width : Size of grid width. Default size is 50.
   * @param height : Size of grid width. Default size is 50.
   */
  constructor(
    private _dimensions: Dimensions,
    private _maxDimensions: Dimensions = { width: 50, height: 50 }
  ) {
    if (
      this.dimensions.width > this._maxDimensions.width ||
      this._maxDimensions.height > 50
    ) {
      throw new Error(
        `Grid height / width too large. The max width is ${this._maxDimensions.width} / height is ${this._maxDimensions.height}.`
      );
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
        // eslint-disable-next-line no-continue
        continue;
      }
    }

    this.robots.push(robot);
  }

  get robots(): Robot[] {
    return this._robots;
  }

  set robots(robots: Robot[]) {
    this._robots = [...robots];
  }

  get scents(): Map<string, boolean> {
    return this._scents;
  }

  set scents(scents: Map<string, boolean>) {
    this._scents = { ...scents };
  }

  get dimensions(): Dimensions {
    return this._dimensions;
  }

  set dimensions({ width, height }: Dimensions) {
    if (width > this._maxDimensions.width || this._maxDimensions.height > 50) {
      throw new Error(
        `Grid height / width too large. The max width is ${this._maxDimensions.width} / height is ${this._maxDimensions.height}.`
      );
    }
    this.dimensions.width = width;
    this.dimensions.height = height;
  }

  purge(): void {
    this.robots = [];
    this.scents = new Map();
    this.dimensions.width = 0;
    this.dimensions.height = 0;
  }

  withinBounds({ x, y }: Coordinates): boolean {
    return (
      x >= 0 &&
      y >= 0 &&
      x <= this.dimensions.width &&
      y <= this.dimensions.height
    );
  }
}
