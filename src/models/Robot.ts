import { makeAutoObservable } from "mobx";
import Area from "./Area";
import { Coordinates, Instruction, Orientation } from "./types";

export default class Robot {
  private _area: Area | undefined;
  private _coordinates: Coordinates;
  private _lastKnownCoordinates: Coordinates;
  private _orientation: Orientation;
  private _instructions: Array<Instruction>;

  /**
   * 
   * @param coordinates {x: 0, y: 0} Coordinates
   * @param orientation Starting orientation the robot is facing
   * @param instructions Array of instructions to be added to a queue
   */
  constructor(
    coordinates: Coordinates = { x: 0, y: 0 }, 
    orientation: Orientation = 'N', 
    instructions: Array<Instruction>
  ) {
    if (instructions.length > 100) {
      throw new Error('Instruction size too large. Maximum size is 100.');
    }
    this._coordinates = coordinates;
    this._lastKnownCoordinates = coordinates;
    this._orientation = orientation;
    this._instructions = instructions;
    
    makeAutoObservable(this);
  }

  get coordinates() {
    return this._coordinates;
  }

  get lastKnownCoordinates() {
    return this._lastKnownCoordinates;
  }

  set lastKnownCoordinates(coordinates: Coordinates) {
    this._lastKnownCoordinates = coordinates;
  }

  get orientation() {
    return this._orientation;
  }

  get instructions() {
    return this._instructions;
  }

  get area(): Area | undefined {
    return this._area;
  }

  set area(area: Area | undefined) {
    this._area = area;
  }

  private set coordinates(coordinates: Coordinates) {
    this._coordinates = coordinates;
  }

  private set orientation(orientation: Orientation) {
    this._orientation = orientation;
  }

  hasInstructions(): boolean {
    return this.instructions.length > 0;
  }

  isLost() {
    return !this.area?.withinBounds(this.coordinates);
  }

  print(): string {
    return `${this.lastKnownCoordinates.x} ${this.lastKnownCoordinates.y} ${this.orientation}${this.isLost() ? ' LOST' : ''}`
  }

  /**
   * Execute one instruction if available 
   */
  move(): void {
    const instruction = this.instructions.shift();

    if (!instruction) {
      throw new Error(`Robot does not have any instructions.`);
    }

    if (!this.area) {
      throw new Error(`Robot does not have a area.`)
    }
    const [newCoordinates, newOrientation] = this.processor[instruction](this.coordinates, this.orientation);

    if (this.area.withinBounds(newCoordinates) || !this.area.scents.has(JSON.stringify(this.coordinates))) {
      this.coordinates = newCoordinates;
    }
    this.orientation = newOrientation;

    if (this.area.withinBounds(this.coordinates)) {
      this.lastKnownCoordinates = {...this.coordinates};
    }
  };

  private processor: {[key in Instruction]: (coordinates: Coordinates, orientation: Orientation) => [Coordinates, Orientation]} = {
    'L': (c: Coordinates, o: Orientation) => [c, this.rotate(o, -1)],
    'R': (c: Coordinates, o: Orientation) => [c, this.rotate(o, 1)],
    'F': (c: Coordinates, o: Orientation) => [this.stepTowards(c, o), o],
  }

  private stepTowards({x, y}: Coordinates, orientation: Orientation, modifier: number = 1): Coordinates {
    const unitCircle = { 'N': [0, 1], 'S': [0, -1], 'E': [1, 0], 'W': [-1, 0] };
    return {
      x: x + (unitCircle[orientation][0] * modifier), 
      y: y + (unitCircle[orientation][1] * modifier)
    };
  }

  private rotate(orientation: Orientation, modifier: number): Orientation {
    const compass: Orientation[] = ['N', 'E', 'S', 'W'];
    const currentOrientation = compass.findIndex((o: Orientation) => o === orientation);
    return compass.slice((currentOrientation + modifier) % 4)[0]; // Shortcut to get -/+ index, unfortunately Array#at is not yet supported by TS.
  }
}