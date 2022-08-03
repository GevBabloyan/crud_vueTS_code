export const setCookie = (value: string): void => {
  document.cookie = value;
};

export const getCookie = <T, A>(name: T, type: A): A | undefined => {
  const value: string | undefined = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return JSON.parse(parts.pop().split(";").shift());
};

export const deleteCookie = (value: string): void => {
  document.cookie =
    value + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];";
};
