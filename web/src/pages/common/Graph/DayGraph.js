import React, { Fragment } from 'react'
import { Collection } from '@potion/layout'
import { Group, Text, Circle, Line } from '@potion/element'
import { addHours, format } from 'date-fns'

import { XAxis, YAxis } from './Axes'

import './index.css'

import { useTimeScale, useLinearScale } from '../../../hooks/graphScales'

const DayGraph = (props) => {
  const {
    x,
    y,
    width,
    height,
    date,
    data,
  } = props;

  const from = addHours(date, 0),
        to = addHours(date, 24);

  const xScale = useTimeScale({ width, from, to });
  const yScale = useLinearScale({ height, from: 400, to: 1500 });

  const keyedData = data.map((d,i) => ({
    key: '' + i,
    ...d,
    previousPPM: i === 0 ? d.ppm : data[i-1].ppm,
    previousTimestamp: i === 0 ? d.timestamp : data[i-1].timestamp
  }));
  console.log(data);

  return (
    <Group transform={{translate: [x, y]}}>
      <Text y={-2} x={5}>{format(date, 'ddd\tDD\tMMM')}</Text>
      <XAxis
        scale={xScale}
        transform={{translate: [0, 100]}}
        gridline={100}
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
          nodeEnter={d => ({ ...d, ppm: 0, previousPPM: 0 })}
          animate
        >
          {nodes => nodes.map(({key, ppm, previousPPM, timestamp, previousTimestamp}) => {
            const x1 = xScale(new Date(timestamp));
            const y1 = yScale(ppm);
            const x2 = xScale(new Date(previousTimestamp));
            const y2 = yScale(previousPPM);
            const line = { x1, x2, y1, y2 };
            return (
              <Fragment key={key}>
                <Circle cx={x1} cy={y1} r={2} fill="black" />
                <Line {...line} className="plot" />
              </Fragment>
            );
          //return <Rect key={key} x={x} y={y-bandWidth/2} width={width} height={bandWidth} fill={projectScale(projectName)}/>
          })}
        </Collection>
      </Group>
    </Group>
  );
}

export default DayGraph;
