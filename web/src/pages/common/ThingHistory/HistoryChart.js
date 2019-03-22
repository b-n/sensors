import React from 'react'
import { addHours, format } from 'date-fns'
import { Text } from '@potion/element'

import Chart, { AxisBottom, AxisLeft, AxisRight } from '../../../components/Chart'
import { useTimeScale } from '../../../hooks'

import CO2Plot from './CO2Plot'
import TempPlot from './TempPlot'
import HumidityPlot from './HumidityPlot'

const HistoryChart = ({
  width,
  co2Scale,
  co2ColorScale,
  tempScale,
  humidityScale,
  date,
  data,
  animate
}) => {

  const from = addHours(date, 6),
        to = addHours(date, 20);

  const xScale = useTimeScale({ domain: [ from, to ] });
  
  return (
    <Chart
      width={width}
      height={200}
      marginLeft={50}
      marginTop={40}
      marginRight={80}
    >
      <Text className="title" x={10} y={-5}>{format(date, 'ddd DD MMM')}</Text>
      <AxisLeft 
        scale={co2Scale}
        gridlines
        ticks={9}
      />
      <AxisBottom
        scale={xScale}
        gridlines
      />
      <AxisRight
        scale={tempScale}
        className="scale-temp"
        ticks={9}
      />
      <AxisRight
        scale={humidityScale}
        translate={[40, 0]}
        className="scale-humidity"
        ticks={9}
      />
      <TempPlot
        xScale={xScale}
        yScale={tempScale}
        date={date}
        data={data}
        animate={animate}
      />
      <HumidityPlot
        xScale={xScale}
        yScale={humidityScale}
        data={data}
        date={date}
        animate={animate}
      />
      <CO2Plot
        xScale={xScale}
        yScale={co2Scale}
        colorScale={co2ColorScale}
        data={data}
        animate={animate}
      />
    </Chart>
  )
}

export default HistoryChart;
