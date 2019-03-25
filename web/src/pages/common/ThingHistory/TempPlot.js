import React from 'react'
import { Line } from '../../../components/Chart'

const TempPlot = ({
  chart,
  yScale,
  xScale,
  colorScale,
  date,
  data,
  animate,
  measure = 'temp'
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
      data={[{ key: '' + date, color: '#ff9999', data: graphData }]}
      animate={animate}
      accessor={d => d.data}
    />
  )
}

export default TempPlot
