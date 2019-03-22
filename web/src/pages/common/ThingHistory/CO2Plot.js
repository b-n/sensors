import React, { Fragment } from 'react'
import { Collection } from '@potion/layout'
import { Line, Circle } from '@potion/element'

const CO2Plot = ({
  chart,
  yScale,
  xScale,
  colorScale,
  data,
  animate,
  measure = 'co2'
}) => {

  const clipPath = `url(#${chart.clipPathId})`;

  const graphData = data.map(({key, date, ...measures}) => ({
    key,
    date,
    ...measures[measure]
  }))

  const nodeEnter = {
    median: yScale.domain()[0],
    upper: yScale.domain()[1],
    lower: yScale.domain()[0]
  }

  console.log()

  return (
    <Collection
      data={graphData}
      nodeEnter={d => ({...d, ...nodeEnter })}
      animate={animate}
    >
      {nodes => nodes.map(({key, date, median, upper, lower }) => {
        const x = xScale(date);
        if (x < 0 || x > chart.plotWidth) return null;
        return (
          <Fragment key={key}>
            <Line x1={x} x2={x} y1={yScale(lower)} y2={yScale(upper)} clipPath={clipPath} className="iqr-line"/>
            <Circle cx={x} cy={yScale(median)} r={3} fill={colorScale(median)} stroke="grey" strokeWidth="1px" clipPath={clipPath}/>
          </Fragment>
        );
      })}
    </Collection>
  )
}

export default CO2Plot
