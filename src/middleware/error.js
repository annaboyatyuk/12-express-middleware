'use strict';

export default (err, req, res) => {
  let error = {error: err};
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('content-type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

