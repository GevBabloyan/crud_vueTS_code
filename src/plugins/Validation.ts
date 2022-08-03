export const emailValidation = (email: string): boolean =>
  new RegExp(/\S+@\S+\.\S+/).test(email);

export const emptyValidation = (value: string, min: number): boolean =>
  value.length >= min ? true : false;

export const replaceValue = (
  value: string,
  type: string
): string | undefined => {
  if (type === "string") return value.replace(new RegExp(/[^a-zA-Z]/g), "");
  else if (type === "number") return value.replace(new RegExp(/[^0-9]/g), "");
};
