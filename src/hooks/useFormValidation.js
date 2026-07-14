import { useCallback, useState } from "react";

function getInputError(input) {
  if (input.validity.valid) {
    return "";
  }

  if (input.validity.valueMissing) {
    return "Este campo es obligatorio.";
  }

  if (input.validity.tooShort) {
    return `Debe tener al menos ${input.minLength} caracteres.`;
  }

  if (input.validity.tooLong) {
    return `Debe tener máximo ${input.maxLength} caracteres.`;
  }

  if (input.validity.typeMismatch && input.type === "url") {
    return "Introduce una URL válida.";
  }

  return input.validationMessage;
}

export default function useFormValidation(
  initialValues = {},
  initialIsValid = false
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(initialIsValid);

  function handleChange(event) {
    const input = event.target;
    const form = input.closest("form");

    setValues((currentValues) => ({
      ...currentValues,
      [input.name]: input.value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [input.name]: getInputError(input),
    }));

    setIsValid(form.checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, errors, isValid, handleChange, resetForm };
}
