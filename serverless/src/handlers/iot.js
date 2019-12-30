'use strict';
import { getMinutes, setMinutes, setSeconds, addMinutes } from 'date-fns';

import {
  getDataPointFromIOTReading,
  putSensorData,
  addHistoryReading,
  getInterval,
  putInterval,
  putLastData,
  summariseInterval
} from '../models/sensor'
import { getSetupData } from '../models/setup'

const handler = async (event, context) => {
  const { thing, ppm, temp, humidity, timestamp } = getDataPointFromIOTReading(event);
  
  const [ summaryDate, intervalDate ] = getDates({timestamp, intervalSize: 10});

  const key = { thing, summaryDate };

  const intData = await getInterval(key, intervalDate);
  const newIntData = summariseInterval(intData.items.concat({ppm, temp, humidity, timestamp}));

  const res = await Promise.all([
    addHistoryReading(key, {ppm, temp, humidity, timestamp}),
    putInterval(key, intervalDate, newIntData)
  ]);

  return {
    statusCode: 204
  }
};

const test = async (event, context) => {
  const data = JSON.parse(event.body);
  
  return handler(data, null);
}

const getDates = ({timestamp, intervalSize}) => {
  const d = new Date(timestamp);
  const interval = setSeconds(addMinutes(d, -1 * (getMinutes(d) % intervalSize) ),0);

  return [ setMinutes(interval, 0).toISOString(), interval.toISOString() ];
}

export { handler, test }
