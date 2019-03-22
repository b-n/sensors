import React, { useRef, useEffect, useState } from 'react'
import { Group, Line } from '@potion/element'
import { axisBottom, axisLeft, axisRight } from 'd3-axis'
import { select } from 'd3-selection'
import 'd3-transition' 

const useTranslate = (pos) => {
  const [ translate, setTranslate ] = useState(pos);
  useEffect(() => {
    setTranslate(pos)
  }, ...pos)

  return translate
}

const useElem = ({axisFn, scale, range, ticks, tickFormat}) => {
  const elem = useRef(null);

  useEffect(() => {
    const axis = axisFn()
      .scale(scale);
    if (ticks) axis.ticks(ticks)
    if (tickFormat) axis.tickFormat(tickFormat);

    select(elem.current)
      .call(axis);
  },[
    ...scale.domain(),
    ...scale.range(),
  ]);

  return elem
}

const AxisBottom = ({
  chart,
  scale,
  gridlines,
  className,
  ticks,
  tickFormat
}) => {
  const translate = useTranslate([0, chart.plotHeight]);

  scale.range([0, chart.plotWidth]);

  const axisEl = useElem({
    axisFn: axisBottom,
    scale,
    ticks,
    tickFormat
  })

  return (
    <Group transform={{translate}} className={className}>
      {gridlines && scale.ticks().map(tick => scale(tick) > 0 && (
        <Line key={tick} x1={scale(tick)+0.5} x2={scale(tick)+0.5} y1={-chart.plotHeight} y2={0} className="gridline" />
      ))}
      <g ref={axisEl}></g>
    </Group>
  )
}

const AxisLeft = ({
  chart,
  scale,
  gridlines,
  className,
  ticks,
  tickFormat
}) => {
  const translate = useTranslate([0,0]);

  scale.range([chart.plotHeight, 0]);

  const axisEl = useElem({
    axisFn: axisLeft,
    scale,
    ticks,
    tickFormat
  })

  return (
    <Group transform={{translate}} className={className}>
      {gridlines && scale.ticks().map(tick => (
        <Line key={tick} x1={0} x2={chart.plotWidth} y1={scale(tick)+0.5} y2={scale(tick)+0.5} className="gridline"/>
      ))}
      <g ref={axisEl}></g>
    </Group>
  )
}

const AxisRight = ({
  chart,
  scale,
  gridlines,
  className,
  ticks,
  tickFormat
}) => {
  const translate = useTranslate([chart.plotWidth,0]);

  scale.range([chart.plotHeight, 0]);

  const axisEl = useElem({
    axisFn: axisRight,
    scale,
    ticks,
    tickFormat
  })

  return (
    <Group transform={{translate}} className={className}>
      {gridlines && scale.ticks().map(tick => (
        <Line key={tick} x1={0} x2={chart.plotWidth} y1={scale(tick)+0.5} y2={scale(tick)+0.5} className="gridline"/>
      ))}
      <g ref={axisEl}></g>
    </Group>
  )
}

export {
  AxisBottom,
  AxisLeft,
  AxisRight
}
