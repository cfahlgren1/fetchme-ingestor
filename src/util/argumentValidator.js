/**
 * Check if input text is in the form "<key>:<value>"
 * @param  {String} text
 */
const isKeyValueType = (text) => {
  if (!text.includes(":")) {
    return false;
  }
  const keyValue = text.split(":");

  if (keyValue.length !== 2) {
    return false;
  }

  if (keyValue[0].length == 0 || keyValue[1].length == 0) {
    return false;
  }
  return true;
};

module.exports = { isKeyValueType };
