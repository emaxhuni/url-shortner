export const validateUrl = (value) => {
    try {
      const url = new URL(value);
      return ['http:', 'https:', 'ftp:'].includes(url.protocol);
    } catch (err) {
      return false;
    }
};