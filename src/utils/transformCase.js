import camelCase from 'lodash/camelCase.js';

export const toCamelCase = (str) => {
  if (Array.isArray(str)) {
    return str.map((v) => toCamelCase(v));
  } else if (str !== null && typeof str === 'object' && str.constructor === Object) {
    return Object.keys(str).reduce((acc, key) => {
      acc[camelCase(key)] = toCamelCase(str[key]);
      return acc;
    }, {});
  }
  return str;
};
