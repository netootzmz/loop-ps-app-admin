import { useState, useCallback, FormEvent } from "react";

const useColorsForm = <T>(
  initialValues: T,
  onSubmit?: () => void | Promise<void>
) => {
  const [colors, setColors] = useState(initialValues);
  const vals = JSON.stringify(initialValues);
  const handleColorChange = (newColor: string, name: string) => {
    setColors({
      ...colors,
      [name]: newColor,
    });
  };
  const resetColors = useCallback(
    (newValues?: T) => {
      setColors(newValues ? newValues : JSON.parse(vals));
    },
    [vals]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit();
    }
  };

  return { colors, handleColorChange, resetColors, handleSubmit };
};

export default useColorsForm;
