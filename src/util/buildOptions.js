const validator = require("./argumentValidator");
const qs = require("querystring");

/**
 *  Clean argument from quotes and extra white space
 * @param  {String} arg request options
 */
const cleanArgument = (arg) => {
  return arg
    .replace('"', "")
    .replace('"', "")
    .replace("'", "")
    .replace("'", "");
};

/**
 *  Use argument object to build a request object to send to url.
 * @param  {Object} args
 */
const buildOptions = (args) => {
  // default request options
  let options = {
    method: "GET",
    headers: {
      "User-Agent": "FetchMe-Slack-App",
    },
  };

  try {
    console.log(args);

    // set header options if user specified options in args
    if (args.H) {
      if (Array.isArray(args.H)) {
        args.H.forEach((arg) => {
          // check if valid header type, if so add to header
          arg = cleanArgument(arg);
          if (validator.isKeyValueType(arg)) {
            const altHeaders = arg.split(":");
            options.headers[altHeaders[0]] = altHeaders[1].trim();
          }
        });
      } else {
        // check if valid header type, if so add to header
        if (validator.isKeyValueType(args.H)) {
          let altHeaders = cleanArgument(args.H);
          altHeaders = altHeaders.split(":");
          options.headers[altHeaders[0]] = altHeaders[1].trim();
        }
      }
    }

    // specify request type
    if (args.X) {
      if (Array.isArray(args.X)) {
        args.X.forEach((arg) => {
          arg = cleanArgument(arg);
          options.method = arg;
        });
      } else {
        options.method = cleanArgument(args.X);
      }
    }

    // specify form data
    if (args.d) {
      options.method = "POST";
      if (Array.isArray(args.d)) {
        args.d.forEach((arg) => {
          arg = cleanArgument(arg);
          const argObj = qs.parse(arg);
          options.body = Object.assign(options.body, argObj);
        });
      } else {
        const argObj = qs.parse(cleanArgument(args.d));
        options.body = argObj;
      }
    }
    console.log(options);
    return options;
  } catch (err) {
    console.log(err.message);
    return options;
  }
};

module.exports = { buildOptions };
