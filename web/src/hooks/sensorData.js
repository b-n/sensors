import { useState, useEffect } from 'react';
import { env } from '../config'

const useSensorData = (thing, { fromDate, toDate, refreshDuration } = {}) => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    if (refreshDuration) {
      window.setInterval(() => {
        getData({thing, fromDate, toDate})
          .then(res => { setSensorData(res) });
      }, refreshDuration);
    }
  }, [])

  useEffect(() => {
    getData({thing, fromDate, toDate})
      .then(res => { setSensorData(res) });
  }, [ fromDate, toDate ]);

  return sensorData
}

const getData = ({ thing, fromDate, toDate }) => {
  const url = new URL(thing, env.apiEndpoint);
  if (fromDate) url.searchParams.append('fromDate', fromDate);
  if (toDate) url.searchParams.append('toDate', toDate);

  return fetch(
    url,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      mode: 'cors'
    }
  )
    .then(res => res.json())
}

export default useSensorData;
