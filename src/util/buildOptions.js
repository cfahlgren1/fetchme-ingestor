/**
 *  Use argument object to build a request object to send to url.
 * @param  {Object} args
 */
const buildOptions = (args) => {
  // default request options
  let options = {
    method: "GET",
    headers: {},
  };

  // set header options if user specified options in args
  if (args.H) {
    let altHeaders = args.H;
    altHeaders = altHeaders.replace('"', '').replace('"', '');
    altHeaders = altHeaders.split(':');
    options.headers[altHeaders[0]] = altHeaders[1].trim();
  }

  // specify request type
  if (args.X) {
    options.method = args.X;
  }

  return options;
};

module.exports = { buildOptions };
