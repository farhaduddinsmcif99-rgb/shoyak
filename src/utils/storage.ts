export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(`shayok_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(`shayok_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  remove: (key: string) => {
    localStorage.removeItem(`shayok_${key}`);
  }
};
