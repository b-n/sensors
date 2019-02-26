import { useEffect } from 'react';
import { scaleTime, scaleLinear, scaleSequential } from 'd3-scale';

const useTimeScale = ({ from, to, width }) => {
  const scale = scaleTime()
    .domain([from, to ])
    .range([0, width]);

  useEffect(() => {
    scale
      .range([0, width])
  }, [width]);

  return scale;
}

const useLinearScale = ({ from, to, height }) => {
  const scale = scaleLinear()
    .domain([from, to])
    .range([ height, 0 ]);

  useEffect(() => {
    scale
      .domain([from, to ])
      .range([height, 0]);
  }, [from, to, height]);

  return scale;
}

const useSequentialScale = ({ from, to, interpolator }) => {
  const scale = scaleSequential(interpolator)
    .domain([from, to]);

  useEffect(() => {
    scale
      .domain([from, to]);
  }, [ from, to ])

  return scale;
}

export {
  useTimeScale,
  useLinearScale,
  useSequentialScale
}
