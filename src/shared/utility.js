export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const getLongDate = (originalDate) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formatedDate = new Date(originalDate).toLocaleDateString(
    "es-ES",
    dateOptions
  );

  return formatedDate;
};

export const checkValidity = (value, rules) => {
  let message = "success";

  if (rules.required) {
    message =
      value.trim() !== "" && message === "success"
        ? "success"
        : "Este campo es obligatorio";
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    message =
      pattern.test(value) && message === "success"
        ? "success"
        : "El email introducido no es válido";
  }

  if (rules.minLength) {
    message =
      value.length >= rules.minLength && message === "success"
        ? "success"
        : `El campo debe tener al menos ${rules.minLength} caracteres`;
  }

  return message;  
};
