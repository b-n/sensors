import React from 'react'
import { Svg, Group, Rect } from '@potion/element'

const Chart = ({
  height,
  width,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
  children,
  className
}) => {
  const chartProps = {
    height,
    width,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    plotHeight: height - marginTop - marginBottom,
    plotWidth: width - marginLeft - marginRight,
    clipPathId: "plotArea",
  }
  return (
    <Svg height={height} width={width} className={className}>
      <Group transform={{translate: [marginLeft, marginTop ]}}>
        <clipPath id={chartProps.clipPathId}>
          <Rect width={chartProps.plotWidth} height={chartProps.plotHeight} />
        </clipPath>
        {React.Children.map(
          children,
          child => React.cloneElement(child, {chart:chartProps})
        )}
      </Group>
    </Svg>
  )
}

export default Chart
export { AxisBottom, AxisLeft, AxisRight } from './Axes'
export { Line } from './Line'
