import Area from './Area';
import Robot from './Robot';

describe('Robot', () => {
  it('Provided Scenarios', () => {
    const area = new Area({ width: 5, height: 3 }, { width: 50, height: 50 });
    const robot = new Robot({ x: 1, y: 1 }, 'E', [
      'R',
      'F',
      'R',
      'F',
      'R',
      'F',
      'R',
      'F',
    ]);
    const robot2 = new Robot({ x: 3, y: 2 }, 'N', [
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
      'F',
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
    ]);
    const robot3 = new Robot({ x: 0, y: 3 }, 'W', [
      'L',
      'L',
      'F',
      'F',
      'F',
      'L',
      'F',
      'L',
      'F',
      'L',
    ]);
    area.addRobot(robot);
    area.addRobot(robot2);
    area.addRobot(robot3);

    expect(robot.lastKnownCoordinates).toEqual({ x: 1, y: 1 });
    expect(robot.orientation).toEqual('E');
    expect(robot.isLost()).toBeFalsy();

    expect(robot2.lastKnownCoordinates).toEqual({ x: 3, y: 3 });
    expect(robot2.orientation).toEqual('N');
    expect(robot2.isLost()).toBeTruthy();

    expect(robot3.lastKnownCoordinates).toEqual({ x: 2, y: 3 });
    expect(robot3.orientation).toEqual('S');
    expect(robot3.isLost()).toBeFalsy();
  });

  it('should display "LOST" if it leaves the grid', () => {
    const area = new Area({ width: 5, height: 3 }, { width: 50, height: 50 });
    const robot = new Robot({ x: 3, y: 2 }, 'N', [
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
      'F',
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
    ]);
    area.addRobot(robot);
    expect(robot.isLost()).toBeTruthy();
  });

  it('should not be able to get lost on same spot as past robot due to scent', () => {
    const area = new Area({ width: 5, height: 3 }, { width: 50, height: 50 });
    const robot = new Robot({ x: 3, y: 2 }, 'N', [
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
      'F',
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
    ]);
    const robot2 = new Robot({ x: 3, y: 2 }, 'N', [
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
      'F',
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
    ]);
    area.addRobot(robot);
    area.addRobot(robot2);
    expect(robot.isLost()).toBeTruthy();
    expect(robot2.isLost()).toBeFalsy();
  });

  it('Robot#rotate should rotate correctly', () => {
    expect((Robot as any).rotate('N', 1)).toBe('E');
    expect((Robot as any).rotate('N', 2)).toBe('S');
    expect((Robot as any).rotate('N', 3)).toBe('W');
    expect((Robot as any).rotate('N', 4)).toBe('N');
  });

  it('Robot#stepTowards should step correctly', () => {
    expect((Robot as any).stepTowards({ x: 0, y: 0 }, 'N', 1)).toStrictEqual({
      x: 0,
      y: 1,
    });
    expect((Robot as any).stepTowards({ x: 0, y: 0 }, 'E', 1)).toStrictEqual({
      x: 1,
      y: 0,
    });
    expect((Robot as any).stepTowards({ x: 0, y: 0 }, 'S', 1)).toStrictEqual({
      x: 0,
      y: -1,
    });
    expect((Robot as any).stepTowards({ x: 0, y: 0 }, 'W', 1)).toStrictEqual({
      x: -1,
      y: 0,
    });
  });

  it('Robot#processor should follow instructions', () => {
    const robot = new Robot({ x: 0, y: 0 }, 'N', []) as any;
    expect(robot.processor.L({ x: 0, y: 0 }, 'N', 1)).toStrictEqual([
      { x: 0, y: 0 },
      'W',
    ]);
    expect(robot.processor.R({ x: 0, y: 0 }, 'N', 1)).toStrictEqual([
      { x: 0, y: 0 },
      'E',
    ]);
    expect(robot.processor.F({ x: 0, y: 0 }, 'N', 1)).toStrictEqual([
      { x: 0, y: 1 },
      'N',
    ]);
  });

  it('Robot#setArea should set the area', () => {
    const robot = new Robot({ x: 0, y: 0 }, 'N', []) as any;
    const area = new Area({ width: 5, height: 5 }, { width: 50, height: 50 });
    expect(robot.area).toBeUndefined();
    robot.area = area;
    expect(robot.area).toBe(area);
  });

  it('Robot#hasInstructions to return true if robot has instructions', () => {
    const robot = new Robot({ x: 0, y: 0 }, 'N', ['F']) as any;
    expect(robot.hasInstructions()).toBeTruthy();
  });

  it('Robot#hasInstructions to return false if robot does not have instructions', () => {
    const robot = new Robot({ x: 0, y: 0 }, 'N', []) as any;
    expect(robot.hasInstructions()).toBeFalsy();
  });
});
