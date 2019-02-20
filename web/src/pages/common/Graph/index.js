import React from 'react';
import { Svg } from '@potion/element'

import DayGraph from './DayGraph'

import { useLinearScale, useSequentialScale } from '../../../hooks/graphScales'

import { interpolateRdYlGn } from 'd3-scale-chromatic'
import { extent } from 'd3-array';

const Graph = (props) => {
  const { data, width } = props;

  const dayData = Object.keys(data.data).map(key => ({ date: key, data: data.data[key]}))
    .sort((a, b) => a.date >= b.date ? a.date === b.date ? 0 : -1 : 1);

  const dataExtent = extent(
    Object.keys(data.data)
      .map(key => extent(data.data[key], d => d.ppm))
      .reduce((a, c) => a.concat(c), [])
  );

  const margin = { top: 30, bottom: 0, left: 50, right: 30 }

  const drawHeight = 140;

  const height = margin.top + margin.bottom + dayData.length*(drawHeight + 60);

  const yScale = useLinearScale({ height: drawHeight, from: dataExtent[0], to: dataExtent[1] });

  const ppmColorScale = useSequentialScale({ interpolator: interpolateRdYlGn, to: 400, from: 1200 })

  return (
    <Svg height={height} width={width}>
      {dayData.length > 0 ? dayData.map((d, i) =>
        <DayGraph
          x={margin.left}
          y={i*(drawHeight+60) + margin.top}
          width ={width - margin.left - margin.right}
          height={drawHeight}
          key={d.date}
          date={d.date}
          data={d.data}
          yScale={yScale}
          ppmColorScale={ppmColorScale}
        />
      ) : null}
    </Svg>
  )
}

export default Graph;
