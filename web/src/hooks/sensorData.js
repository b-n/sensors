import { useState, useEffect } from 'react';
import { env } from '../config'

const useSensorData = (thing, { fromDate, toDate } = {}) => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const url = new URL(thing, env.apiEndpoint);
    if (fromDate) url.searchParams.append('fromDate', fromDate);
    if (toDate) url.searchParams.append('toDate', toDate);

    fetch(
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
      .then(res => { setSensorData(res) });
  }, [ fromDate, toDate ]);

  return sensorData
}

export default useSensorData;
