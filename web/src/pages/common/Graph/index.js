import React from 'react';
import { Svg } from '@potion/element'

import DayGraph from './DayGraph'

import { useLinearScale, useSequentialScale } from '../../../hooks/graphScales'
import { useSummaryData } from '../../../hooks/dataSummary'

import { interpolateRdYlGn } from 'd3-scale-chromatic'

const Graph = (props) => {
  const { data, width } = props;

  const summaryData = useSummaryData({ data: data.data, interval: 10 });

  const margin = { top: 30, bottom: 0, left: 50, right: 30 }

  const drawHeight = 140;

  const height = margin.top + margin.bottom + summaryData.data.length*(drawHeight + 60);

  const yScale = useLinearScale({ height: drawHeight, from: summaryData.min, to: summaryData.max });

  const ppmColorScale = useSequentialScale({ interpolator: interpolateRdYlGn, to: 400, from: 1200 })

  return (
    <Svg height={height} width={width}>
      {summaryData.data.length > 0 ? summaryData.data.map((d, i) =>
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
