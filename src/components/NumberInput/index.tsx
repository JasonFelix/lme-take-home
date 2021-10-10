import { useCallback, useEffect, useState } from 'react';
import { NumberInputContainer, LabelContainer, InputContainer } from './styles';

interface Props { 
  label: string;
  min: number;
  max: number;
  value: number;
  callback: (n: number) => void;
}

const NumberInput = ({ label, value, min, max, callback }: Props) => {
  const [dragging, setDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseDelta, setMouseDelta] = useState(0);

  const clampValue = useCallback((n: number) => {
    return Math.min(Math.max(n, min), max);
  }, [max, min]);

  const updateNumber = useCallback((n: number) => {
    callback(n);
  }, [callback]);

  const mousemove = useCallback((e: MouseEvent) => {
    if (dragging) {
      const delta = Math.floor((e.pageX - mouseX) * 0.2);
      setMouseDelta(delta);
    }
  }, [dragging, mouseX]);

  const mouseup = useCallback((_: MouseEvent) => {
    if (dragging) {
      console.log(value, mouseDelta);
      updateNumber(clampValue(value + mouseDelta));
      setDragging(false);
      setMouseDelta(0);
    }
  }, [dragging, mouseDelta, clampValue, updateNumber, value]);

  const mousedown = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    if (!dragging) { 
      setDragging(true); 
      setMouseX(e.pageX);
    }
  }, [dragging]);

  useEffect(() => {
    window.addEventListener('mousemove', mousemove, { passive: true });
    window.addEventListener('mouseup', mouseup, { passive: true });

    return () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', mouseup);
  };
  }, [mousemove, mouseup]);

  return <NumberInputContainer
    dragging={dragging}
    onMouseDown={mousedown}
  >
    <LabelContainer>{label}</LabelContainer>
    <InputContainer type="number" min={0} max={50} value={clampValue(value + mouseDelta)} onChange={e => updateNumber(Number(e.target.value))} />
  </NumberInputContainer>;
}

export default NumberInput;