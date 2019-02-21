import React, { Fragment } from 'react'
import { Collection } from '@potion/layout'
import { Group, Text, Circle, Line } from '@potion/element'
import { addHours, format } from 'date-fns'

import { XAxis, YAxis } from './Axes'

import './index.css'

import { useTimeScale } from '../../../hooks/graphScales'

const DayGraph = (props) => {
  const {
    x,
    y,
    width,
    height,
    date,
    data,
    yScale,
    ppmColorScale
  } = props;

  const from = addHours(date, 0),
        to = addHours(date, 24);

  const xScale = useTimeScale({ width, from, to });

  const yMin = yScale.domain()[0];

  return (
    <Group transform={{translate: [x, y]}}>
      <Text y={-2} x={5}>{format(date, 'ddd\tDD\tMMM')}</Text>
      <XAxis
        scale={xScale}
        transform={{translate: [0, height]}}
        gridline={height}
        className="x-axis"
      />
      <YAxis
        scale={yScale}
        gridline={width}
        className="y-axis"
      />
      <Group className="plot">
        <Collection
          data={data}
          nodeEnter={d => ({ ...d, mean: yMin, upper: yMin, lower: yMin })}
          animate
        >
          {nodes => nodes.map(({key, date, mean, lower, upper}) => {
            const x = xScale(new Date(date));
            const color = ppmColorScale(mean);
            return (
              <Fragment key={key}>
                <Line x1={x} x2={x} y1={yScale(lower)} y2={yScale(upper)} />
                <Circle cx={x} cy={yScale(mean)} r={3} fill={color} stroke="grey" strokeWidth="1px"/>
              </Fragment>
            );
          })}
        </Collection>
      </Group>
    </Group>
  );
}

export default DayGraph;
