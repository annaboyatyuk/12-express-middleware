'use strict';

import Coffee from '../src/models/coffee.js';
import Grapes from '../src/models/grapes.js';
export default (module, dir) => {
  if ( typeof dir !== 'string' ) { return {}; }
  return {
    'coffee': {default: Coffee},
    'grapes': {default: Grapes},
  };
};

// Coffee: just passing on to real deal for now, but can uncomment above / comment out below for mocking fun

// import requireDirectory from 'require-directory';

// export default requireDirectory;

