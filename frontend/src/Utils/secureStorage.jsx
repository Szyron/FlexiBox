import CryptoJS from 'crypto-js';

const secretKey = 'teszt123';

// Usage:
//secureStorage.setItem('user', { ...data.user });
//secureStorage.getItem('user');
//secureStorage.removeItem('user');
// secureStorage.setItem('profile',adat);
// secureStorage.getItem('profile');
// secureStorage.removeItem('profile');

const secureStorage = {
  setItem: (key, value) => {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
    sessionStorage.setItem(key, encryptedValue);
  },
  getItem: (key) => {
    const encryptedValue = sessionStorage.getItem(key);
    if (!encryptedValue) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedValue) return null;
      return JSON.parse(decryptedValue);
    } catch (e) {
      console.error('Error decrypting data:', e);
      return null;
    }
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  }
};

export default secureStorage;