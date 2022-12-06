import { useState } from 'react';

interface useValidationProps {
  validation: (val: string) => boolean;
}

export const useValidation = ({ validation }: useValidationProps) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const valid = validation(value);

  const reset = () => {
    setValue('');
  };

  return {
    value,
    touched,
    valid,
    setValue,
    setTouched,
    reset,
  };
};
