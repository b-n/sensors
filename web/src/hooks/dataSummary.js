import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { extent, mean, quantile } from 'd3-array';

const useSummaryData = ({ data, interval }) => {

  const [ summaryData, setSummaryData ] = useState({ min: 0, max: 0, data: []});

  const intervalSeconds = interval * 60;

  useEffect(() => {
    const allMinMax = [];
    const outputData = Object.keys(data).map(d => {
      const baseDate = new Date(d + 'T00:00:00');

      const dayData = data[d]
      .reduce((a, c) => {
        const timeGroup = c.timestamp + (differenceInSeconds(baseDate, c.timestamp) % intervalSeconds) * 1000;

        if (!a[timeGroup]) a[timeGroup] = [];
        a[timeGroup].push(c);
        return a;
      }, {})
      const avgValues = Object.keys(dayData).map(key => {
        dayData[key].sort((a,b) => (a.ppm-b.ppm));
        return {
          key,
          date: +key,
          mean: mean(dayData[key], d => d.ppm),
          max: quantile(dayData[key], 1, d => d.ppm),
          upper: quantile(dayData[key], 0.75, d => d.ppm),
          median: quantile(dayData[key], 0.5, d => d.ppm),
          lower: quantile(dayData[key], 0.25, d => d.ppm),
          min: quantile(dayData[key], 0, d => d.ppm)
        }
      })
      allMinMax.push(...extent(avgValues, d => d.median));
      return { 
        date: d,
        data: avgValues
      };
    }).sort((a, b) => a.date >= b.date ? a.date > b.date ? -1 : 0 : 1);

    const totalExtent = extent(allMinMax);

    setSummaryData({
      min: totalExtent[0],
      max: totalExtent[1],
      data: outputData
    });

  }, [data]);

  return summaryData;
}

export { useSummaryData };
