import AsyncStorage from '@react-native-async-storage/async-storage';

export const EVENT_MUSIC = 'event_music';
export const SETTINGS_MUSIC_KEY = '@music-on-off';

export const readSettings = async (key, cb) => {
  try {
    const settingsVal = await AsyncStorage.getItem(key);
    cb(JSON.parse(settingsVal));
  } catch (error) {
    console.log('Unable to retrieve settings data');
    console.log(error);
  }
};

export const SettingsBus = {
  listeners: [],
  listen: function(listener, listenerFn) {
    if (!this.listeners.find((listener) => listener.name === listener)) {
      this.listeners.push({name: listener, fn: listenerFn});
    }
  },
  dispatch: function(event, value) {
    console.log(this.listeners);
    this.listeners.forEach((listener) => listener.fn(event, value));
  },
  remove: function(listener) {
    this.listeners = this.listeners.filter((l) => l.name !== listener);
  }
}