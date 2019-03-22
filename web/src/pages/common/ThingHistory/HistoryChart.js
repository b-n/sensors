import React from 'react'
import { addHours, format } from 'date-fns'
import { Text } from '@potion/element'

import Chart, { AxisBottom, AxisLeft } from '../../../components/Chart'
import { useTimeScale } from '../../../hooks'

import CO2Plot from './CO2Plot'

const HistoryChart = ({
  width,
  co2Scale,
  co2ColorScale,
  date,
  data,
  animate
}) => {

  const from = addHours(date, 6),
        to = addHours(date, 20);

  const xScale = useTimeScale({ domain: [ from, to ] });
  console.log(date);
  
  return (
    <Chart
      width={width}
      height={200}
      marginLeft={50}
      marginTop={40}
    >
      <Text className="title" x={10} y={-5}>{format(date, 'ddd DD MMM')}</Text>
      <AxisLeft 
        scale={co2Scale}
        gridlines
      />
      <AxisBottom
        scale={xScale}
        gridlines
      />
      <CO2Plot
        xScale={xScale}
        yScale={co2Scale}
        colorScale={co2ColorScale}
        data={data}
        accessor={d => d.co2}
        animate={animate}
      />
    </Chart>
  )
}

export default HistoryChart;
