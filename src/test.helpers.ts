export const flushPromises = (ts: number = 200) => {
  return new Promise(resolve => setTimeout(resolve, ts));
};

export const createLocalStorageMock = (storeData?: object) => {
  const localStorageMock = () => {
    let store = storeData || {};

    return {
      getItem(key) {
        return store[key] || null;
      },
      removeItem(key, value) {
        delete store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      }
    };
  };

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock(),
    writable: true
  });
};
