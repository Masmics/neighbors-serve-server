module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error'; //'My Internal Server Error';
  console.error(err);

  res
    .status(status)
    .send({ status, message });
};



