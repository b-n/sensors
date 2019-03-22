import React from 'react';
import { Collection } from '@potion/layout'
import { Group, Circle } from '@potion/element'
import { line as d3line, curveBundle } from 'd3-shape'

const Line = ({x, y, data, chart, accessor = d => d.data, animate = false}) => {

  const l = d3line()
    .x(x)
    .y(y)
    .curve(curveBundle.beta(0.75));

  const clipPath = `url(#${chart.clipPathId})`;

  const plots = data.map(d => ({
    key: d.key,
    plot: (
      <>
        <path
          d={l(accessor(d))}
          clipPath={clipPath}
          className="line"
          stroke={d.color || 'black'}
        />
        {accessor(d).map((node, i) => (
          <Circle
            key={i}
            cx={x(node)}
            cy={y(node)}
            clipPath={clipPath}
            fill={d.color}
            className="point"
          />
        ))}
      </>
    ),
    animationProgress: 1
  }))

  return (
    <Collection
      data={plots}
      nodeEnter={n => ({...n, animationProgress: 0})}
      animate={animate}
    >
      {nodes => nodes.map(({key, plot, animationProgress}) => (
        <Group
          key={key}
          transform={{translate: [0, chart.plotHeight*(1-animationProgress)]}}
        >
          {plot}
        </Group>
      ))}
    </Collection>
  )
}

export {
  Line
}
