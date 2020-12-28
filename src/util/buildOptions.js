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

  console.log(args);

  // set header options if user specified options in args
  if (args.H) {
    if (Array.isArray(args.H)) {
      args.H.forEach((arg) => {
        let altHeaders = arg
          .replace('"', "")
          .replace('"', "")
          .replace("'", "")
          .replace("'", "");
        altHeaders = altHeaders.split(":");
        options.headers[altHeaders[0]] = altHeaders[1].trim();
      });
    } else {
      let altHeaders = arg
        .replace('"', "")
        .replace('"', "")
        .replace("'", "")
        .replace("'", "");
      altHeaders = altHeaders.split(":");
      options.headers[altHeaders[0]] = altHeaders[1].trim();
    }
  }

  // specify request type
  if (args.X) {
    if (Array.isArray(args.X)) {
      args.X.forEach((arg) => {
        arg = arg
          .replace('"', "")
          .replace('"', "")
          .replace("'", "")
          .replace("'", "");
        options.method = arg;
      });
    } else {
      options.method = args.X.replace('"', "")
        .replace('"', "")
        .replace("'", "")
        .replace("'", "");
    }
  }

  // specify form data
  if (args.F) {
    if (Array.isArray(args.F)) {
      args.F.forEach((arg) => {
        arg = arg
          .replace('"', "")
          .replace('"', "")
          .replace("'", "")
          .replace("'", "");
        options.body = arg;
      });
    } else {
      options.body = args.F.replace('"', "")
        .replace('"', "")
        .replace("'", "")
        .replace("'", "");
    }
  }
  return options;
};

module.exports = { buildOptions };
