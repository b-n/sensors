import React, { useRef, useEffect } from 'react';
import { Group, Line } from '@potion/element'
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

const XAxis = (props) => {
  const { scale, transform, gridline, className, ticks, tickFormat } = props;

  const axisEl = useRef(null);

  useEffect(() => {
    select(axisEl.current)
      .call(
        axisBottom()
        .scale(scale)
        .ticks(ticks)
        .tickFormat(tickFormat)
      );
  }, [ ...scale.domain(), ...scale.range() ]);

  return (
    <Group transform={transform} className={className}>
      {gridline && scale.ticks(ticks).map(tick => (
        <Line key={tick} x1={scale(tick)} x2={scale(tick)} y1={-gridline} y2={0} className="gridline"/>
      ))}
      <g ref={axisEl}></g>
    </Group>
  )
}

const YAxis = (props) => {
  const { scale, transform, gridline, className, ticks, tickFormat } = props;

  const axisEl = useRef(null);

  useEffect(() => {
    select(axisEl.current)
      .call(
        axisLeft()
        .scale(scale)
        .ticks(ticks)
        .tickFormat(tickFormat)
      );
  }, [...scale.domain(), ...scale.range() ]);

  return (
    <Group transform={transform} className={className}>
      {gridline && scale.ticks(ticks).map((tick, i) => (
        <Line key={tick} x1={0} x2={gridline} y1={scale(tick)} y2={scale(tick)} className="gridline"/>
      ))}
      <g ref={axisEl}></g>
    </Group>
  );
}

export {
  XAxis,
  YAxis,
}
