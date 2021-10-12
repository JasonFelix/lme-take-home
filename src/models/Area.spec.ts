import Area from "./Area";
import Robot from "./Robot";

describe("Area", () => {
  it("should throw and error if the size is set above the maximum", () => {
    const area = new Area({ width: 5, height: 5 }, { width: 50, height: 50 });
    expect(() => (area.dimensions = { width: 100, height: 100 })).toThrowError(
      "Grid height / width too large. The max width is 50 / height is 50."
    );
  });

  it("should construct with the correct dimension", () => {
    const area = new Area({ width: 5, height: 5 }, { width: 50, height: 50 });
    expect(area.dimensions).toStrictEqual({ width: 5, height: 5 });
  });

  it("Area#getDimensions should set the dimensions correctly", () => {
    const area = new Area({ width: 10, height: 10 }, { width: 50, height: 50 });
    expect(area.dimensions).toStrictEqual({ width: 10, height: 10 });
  });

  it("Area#addRobot should push the robot to Area#robots", () => {
    const area = new Area({ width: 10, height: 10 }, { width: 50, height: 50 });
    area.addRobot(new Robot({ x: 0, y: 0 }, "N", []));
    expect(area.robots).toHaveLength(1);
  });

  it("Area#purge reset all values", () => {
    const area = new Area({ width: 10, height: 10 }, { width: 50, height: 50 });
    area.addRobot(new Robot({ x: 0, y: 0 }, "N", ["L", "F", "F", "F"]));
    expect(area.robots).toHaveLength(1);
    expect(area.dimensions).toStrictEqual({ width: 10, height: 10 });
    area.purge();
    expect(area.robots).toHaveLength(0);
    expect(area.dimensions).toStrictEqual({ width: 0, height: 0 });
  });

  it("Area#withinBounds should be true if Coordinates are inside bounds", () => {
    const area = new Area({ width: 10, height: 10 }, { width: 50, height: 50 });
    expect(area.withinBounds({ x: 2, y: 2 })).toBeTruthy();
  });

  it("Area#withinBounds should be false if Coordinates are outside bounds", () => {
    const area = new Area({ width: 10, height: 10 }, { width: 50, height: 50 });
    expect(area.withinBounds({ x: 100, y: 100 })).toBeFalsy();
  });
});
