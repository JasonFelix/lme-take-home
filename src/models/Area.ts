import { makeAutoObservable } from "mobx";
import Robot from "./Robot";
import { Coordinates, Dimensions } from "./types";

export default class Area {
  robots: Array<Robot> = [];
  scents: Map<string, boolean> = new Map();

  /**
   * 
   * @param width : Size of grid width. Maximum size is 50.
   * @param height : Size of grid width. Maximum size is 50.
   */
  constructor(private width: number, private height: number, private maxWidth: number, private maxHeight: number) {
    if (width > this.maxWidth || this.maxHeight > 50) {
      throw new Error(`Grid height / width too large. The max width is ${maxWidth} / height is ${maxHeight}.`);
    }
    makeAutoObservable(this);
  }

  addRobot(robot: Robot): void {
    robot.setArea(this);

    while (robot.hasInstructions() && !robot.isLost()) {
      const prev = robot.getCoordinates;
      robot.move();
      const post = robot.getCoordinates;
      if (!this.withinBounds(post)) {
        this.scents.set(JSON.stringify(prev), true);
        continue;
      }
    }

    this.robots.push(robot);
  }

  setDimensions({ width, height}: Dimensions) {
    if (width > this.maxWidth || this.maxHeight > 50) {
      throw new Error(`Grid height / width too large. The max width is ${this.maxWidth} / height is ${this.maxHeight}.`);
    }
    this.width = width;
    this.height = height
  }

  getDimensions() {
    return { width: this.width, height: this.height };
  }

  purge() {
    this.robots = [];
    this.scents = new Map();
    this.width = 0;
    this.height = 0;
  }

  withinBounds({ x, y }: Coordinates) {
    return x >= 0 && y >= 0 && x <= this.width && y <= this.height;
  }
}
