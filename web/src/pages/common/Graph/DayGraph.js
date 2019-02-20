import React, { Fragment } from 'react'
import { Collection } from '@potion/layout'
import { Group, Text, Circle } from '@potion/element'
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

  const keyedData = data.map((d,i) => ({
    key: '' + i,
    ...d,
    previousPPM: i === 0 ? d.ppm : data[i-1].ppm,
    previousTimestamp: i === 0 ? d.timestamp : data[i-1].timestamp
  }));

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
          data={keyedData}
          nodeEnter={d => ({ ...d, ppm: yMin, previousPPM: yMin })}
          animate
        >
          {nodes => nodes.map(({key, ppm, timestamp}) => {
            const x1 = xScale(new Date(timestamp));
            const y1 = yScale(ppm);
            const color = ppmColorScale(ppm);
            return (
              <Fragment key={key}>
                <Circle cx={x1} cy={y1} r={2} fill={color} />
              </Fragment>
            );
          })}
        </Collection>
      </Group>
    </Group>
  );
}

export default DayGraph;
