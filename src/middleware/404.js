'use strict';

export default (req, res) => {
  let error = { error: 'Resouce Not Found'};
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('content-type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

