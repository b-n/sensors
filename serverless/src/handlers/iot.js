'use strict';
import { formatToTimeZone } from 'date-fns-timezone';

import { getDataPointFromIOTReading, getSensorData, putSensorData } from '../models/sensor'
import { getSetupData } from '../models/setup'

const handler = async (event, context) => {
  
  const newDataPoint = getDataPointFromIOTReading(event);
  const { thing, ppm, timestamp } = newDataPoint;

  const { timeZone } = await getSetupData(thing);

  const summaryDate = formatToTimeZone(new Date(timestamp), 'YYYY-MM-DD', { timeZone });

  const key = { thing, summaryDate };

  const data = await getSensorData(key);

  const newData = {
    ...data,
    history: data.history.concat({ppm, timestamp}),
    last: ppm,
    lastTimestamp: timestamp
  };

  await putSensorData(newData);

  return {
    statusCode: 204
  }
};

const test = async (event, context) => {
  const data = JSON.parse(event.body);
  
  return handler(data, null);
}

export { handler, test }
