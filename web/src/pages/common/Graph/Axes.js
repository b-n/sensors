import React, { Fragment } from 'react';
import { Group, Line, Text } from '@potion/element'
import { differenceInHours, addHours, format } from 'date-fns'

const XAxis = (props) => {
  const { scale, transform, gridline, className } = props;

  const from = scale.domain()[0];
  const to = scale.domain()[1];
  const width = scale.range()[1];

  const dates = new Array(differenceInHours(to, from)).fill(0).map((x, i) => addHours(from, i)).concat(to);

  return (
    <Group transform={transform} className={className}>
      <Line x1={0} y1={0} x2={width} y2={0} stroke='black' strokeWidth={1} className="axis"/>
      {dates.map((d, i) => {
        const x = scale(d);
        return (
        <Fragment key={i}>
          <Line
            x1={x} x2={x}
            y1={0} y2={5}
            className="tick"
          />
          <Text
            className="tick-label"
            x={x}
            y={13}
            textAnchor={i > 0 ? i < dates.length-1 ? 'middle' : 'end' : 'start' }
          >
            {format(d, 'HH:mm')}
          </Text>
          {gridline === undefined
            ? null
            : (<Line x1={x} x2={x} y1={-gridline} y2={0} className="gridline"/>)}
        </Fragment>
        );
      })}
    </Group>
  )
}

const YAxis = (props) => {
  const { scale, transform, gridline, className } = props;

  const projects = scale.domain();
  const range = scale.range();

  return (
    <Group transform={transform} className={className}>
      <Line x1={0} x2={0} y1={range[0]} y2={range[1]} stroke="black" strokeWidth={1} />
      {projects.map((project, i) => {
        const y = scale(project);
        return (
          <Fragment key={i}>
            <Line
              x1={0}
              x2={-5}
              y1={y}
              y2={y}
              stroke='black'
              strokeWidth={1}
              className="tick"
            />
            <Text
              className="tick-label"
              x={-7}
              y={y}
              textAnchor='end'
              alignmentBaseline='central'
            >
              {project}
            </Text>
            {
              gridline === undefined
                ? null
                : (<Line x1={0} x2={gridline} y1={y} y2={y} className="gridline"/>)
            }
          </Fragment>
        )
      })}
    </Group>
  );
}

export {
  XAxis,
  YAxis,
}
