'use strict';

import { querySensorData } from '../models/sensor'

const handler = async (event, context) => {
  const { thing } = event.pathParameters;

  const data = await querySensorData(thing);

  const res = {
    thing,
    data: data.reduce((a, c) => {
      a[c.summaryDate] = c.history.map(({ppm, timestamp}) => ({ppm, timestamp}));
      return a;
    }, {})
  };

  return {
    body: JSON.stringify(res),
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    statusCode: 200
  }
}

export {
  handler
}
