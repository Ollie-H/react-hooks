const DEFAULT_SETTINGS: { [key: string]: any } = {
  API_BASE_URL: "http://" + window.location.hostname + ":8000/api",
  CLIENT_ID: "YT4C4rofi8wRdLIEBCsucLLxFcJlnDiyPgPEp1al",
  AUTH_LOCAL_STORAGE: "auth_user"
};

export const getEnvironmentConfigItem = (itemKey: string): string => {
  try {
    const _window = window as any;
    if (_window && _window.environment && _window.environment[itemKey]) {
      return _window.environment[itemKey] || "";
    }
    return DEFAULT_SETTINGS[itemKey] || "";
  } catch (e) {
    console.error(
      e,
      `${itemKey} is not set via environment variables or default`
    );
    return "";
  }
};
