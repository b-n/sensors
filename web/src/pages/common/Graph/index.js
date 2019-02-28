import React from 'react';
import { Svg } from '@potion/element'

import DayGraph from './DayGraph'

import { useLinearScale, useSequentialScale } from '../../../hooks/graphScales'
import { useSummaryData } from '../../../hooks/dataSummary'

import { interpolateRdYlGn } from 'd3-scale-chromatic'

const Graph = (props) => {
  const { data, width, animate } = props;

  const summaryData = useSummaryData({ data: data.data, interval: 10 });

  const dataRange = summaryData.max - summaryData.min;
  const { min, max } = summaryData;

  const margin = { top: 30, bottom: 0, left: 50, right: 30 }
  const plot = { width: width - margin.left - margin.right, height: 140 }

  const chartHeight = margin.top + margin.bottom + summaryData.data.length*(plot.height + 60);

  const yScale = useLinearScale({ height: plot.height, from: min - dataRange * 0.03, to: max + dataRange * 0.03 });

  const ppmColorScale = useSequentialScale({ interpolator: interpolateRdYlGn, to: 400, from: 1200 })

  return (
    <Svg height={chartHeight} width={width}>
      {summaryData.data.length > 0 ? summaryData.data.map((d, i) =>
        <DayGraph
          transform={{translate:[margin.left, i*(plot.height + 60) + margin.top]}}
          {...plot}
          key={d.date}
          date={d.date}
          data={d.data}
          yScale={yScale}
          ppmColorScale={ppmColorScale}
          animate={animate}
        />
      ) : null}
    </Svg>
  )
}

export default Graph;
