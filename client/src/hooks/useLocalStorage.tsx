/* eslint-disable @typescript-eslint/no-explicit-any */
export const useLocalStorage = (key: string) => {
  // store data to the local storage to

  const init = (value: any) => {
    if (!getItem()) {
      setItems(value);
    }
  };

  const setItems = (value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  // fetch data to the local storage
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (e) {
      console.error(e);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  return { setItems, getItem, removeItem, init };
};
