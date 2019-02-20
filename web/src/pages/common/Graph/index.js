import React from 'react';
import { Svg } from '@potion/element'

import DayGraph from './DayGraph'

const Graph = (props) => {
  const { data, width } = props;

  const dayData = Object.keys(data.data).map(key => ({ date: key, data: data.data[key]}));
  console.log(dayData);

  const margin = { top: 30, bottom: 0, left: 50, right: 30 }

  const drawHeight = 100;

  const height = margin.top + margin.bottom + dayData.length*(drawHeight + 60);

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
        />
      ) : null}
    </Svg>
  )
}

export default Graph;
