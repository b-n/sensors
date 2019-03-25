import React from 'react'
import { Line } from '../../../components/Chart'

const HumidityPlot = ({
  chart,
  yScale,
  xScale,
  colorScale,
  date,
  data,
  animate,
  measure = 'humidity'
}) => {

  const graphData = data.map(({key, date, ...measures}) => ({
    key,
    date,
    ...measures[measure]
  }))
    .filter(d => !isNaN(d.median) && d.median)

  return (
    <Line
      x={d => xScale(d.date)}
      y={d => yScale(d.median)}
      chart={chart}
      data={[{ key: '' + date, color: '#9999ff', data: graphData }]}
      animate={animate}
      accessor={d => d.data}
    />
  )
}

export default HumidityPlot
