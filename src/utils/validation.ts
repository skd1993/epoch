export interface Validatable {
  value: number;
  min: number;
  max: number;
}

export const validate = (toBeValidated: Validatable): boolean => {
  let isValid = true;
  if (toBeValidated.value !== undefined)
    isValid =
      isValid &&
      !isNaN(toBeValidated.value) &&
      toBeValidated.value >= toBeValidated.min &&
      toBeValidated.value <= toBeValidated.max;
  return isValid;
};
