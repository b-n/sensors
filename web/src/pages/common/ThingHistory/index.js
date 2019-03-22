import React from 'react';

import HistoryChart from './HistoryChart';

import { useLinearScale, useSequentialScale, useSummaryData } from '../../../hooks/'

import { interpolateRdYlGn } from 'd3-scale-chromatic'

import './ThingHistory.css'

const padArray = ([min, max], padding) => ([ min - (max-min) * padding, max + (max-min) * padding ])

const Graph = ({
  data,
  width,
  animate
}) => {
  const summaryData = useSummaryData({ data: data.data, interval: 10 });

  const { co2, temp, humidity } = summaryData;

  const co2Scale = useLinearScale({ domain: padArray(co2, 0.05) });
  const tempScale = useLinearScale({ domain: padArray(temp, 0.05) });
  const humidityScale = useLinearScale({ domain: padArray(humidity, 0.05) });

  const co2ColorScale = useSequentialScale({ domain: [ 1200, 400 ], interpolator: interpolateRdYlGn })

  return (
    <>
      {summaryData.data.map((d, i) => (
        <HistoryChart
          key={d.date}
          width={width}
          co2Scale={co2Scale}
          co2ColorScale={co2ColorScale}
          tempScale={tempScale}
          humidityScale={humidityScale}
          date={d.date}
          data={d.data}
          animate={animate}
        />
      ))}
    </>
  )
}

export default Graph;
