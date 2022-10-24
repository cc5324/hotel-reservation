/**
 *
 * @param {Object} response
 * @returns 將物件 key 轉為 camelCase
 */

export function camelizeJsonKeys(response) {
  if (typeof response !== "object") return;
  if (Array.isArray(response)) return;

  return Object.entries(response).reduce((accumulator, [key, value]) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      accumulator[camelize(key)] = camelizeJsonKeys(value);
    } else {
      accumulator[camelize(key)] = value;
    }
    return accumulator;
  }, {});

  // return output;
}

export function camelize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
