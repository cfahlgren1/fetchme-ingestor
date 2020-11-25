// hello world index
exports.index = (req, res) => {
  res.write("Hello World!\n");
  res.write(`Request received: ${req.method} - ${req.path}`);
  res.end();
};
