import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { extent, mean, quantile } from 'd3-array';

const getDataPoints = (data, accessor) => {
  data.sort((a,b) => accessor(a) - accessor(b));
  return {
    mean: mean(data, accessor),
    max: quantile(data, 1, accessor),
    upper: quantile(data, 0.75, accessor),
    median: quantile(data, 0.5, accessor),
    lower: quantile(data, 0.25, accessor),
    min: quantile(data, 0, accessor)
  }
}

const useSummaryData = ({ data, interval, extentAccessor = (d => d.median) }) => {

  const [ summaryData, setSummaryData ] = useState({ co2: [], temp: [], humidity: [], data: []});

  const intervalSeconds = interval * 60;

  useEffect(() => {
    const extents = {
      co2: [],
      temp: [],
      humidity: []
    };

    const outputData = Object.keys(data).map(d => {
      const baseDate = new Date(d + 'T00:00:00');

      const dayData = data[d]
      .reduce((a, c) => {
        const timeGroup = c.timestamp + (differenceInSeconds(baseDate, c.timestamp) % intervalSeconds) * 1000;

        if (!a[timeGroup]) a[timeGroup] = [];
        a[timeGroup].push(c);
        return a;
      }, {})

      const avgValues = Object.keys(dayData).map(key => ({
          key,
          date: +key,
          co2: getDataPoints(dayData[key], d => d.ppm),
          temp: getDataPoints(dayData[key], d => d.temp),
          humidity: getDataPoints(dayData[key], d => d.humidity)
      }));

      Object.keys(extents).map(measure => extents[measure].push(...extent(avgValues.map(val => val[measure]), extentAccessor)));

      return { 
        date: baseDate,
        data: avgValues
      };
    }).sort((a, b) => b.date - a.date);

    Object.keys(extents).map(key => extents[key] = extent(extents[key]));

    setSummaryData({
      ...extents,
      data: outputData
    });

  }, [data]);

  return summaryData;
}

export { useSummaryData };
