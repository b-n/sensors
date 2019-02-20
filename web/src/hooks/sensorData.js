import { useState, useEffect } from 'react';
import { env } from '../config'

const useSensorData = (thing) => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    fetch(
      env.apiEndpoint + thing,
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
  }, []);

  return sensorData
}

export default useSensorData;
