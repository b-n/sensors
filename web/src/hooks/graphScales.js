import { useState, useEffect } from 'react';
import { scaleTime, scaleLinear, scaleSequential } from 'd3-scale';

const useTimeScale = (props) => {
  const { from, to, width } = props;
  const [scale, setScale] = useState({ scale: scaleTime().domain([from, to]) });

  useEffect(() => {
    setScale({
      scale: scale.scale
        .range([0, width])
    })
  }, [width]);

  return scale.scale;
}

const useLinearScale = ({ from, to, height }) => {
  const [ scale, setScale ] = useState({ scale: scaleLinear().domain([from, to])});

  useEffect(() => {
    setScale({
      scale: scale.scale
        .domain([from, to ])
        .range([height, 0])
    })
  }, [from, to, height]);

  return scale.scale;
}

const useSequentialScale = ({ from, to, interpolator }) => {
  const [ scale, setScale ] = useState({ scale: scaleSequential(interpolator).domain([from, to])});

  useEffect(() => {
    setScale({
      scale: scale.scale
        .domain([from, to])
    })
  }, [ from, to ])

  return scale.scale;
}

export {
  useTimeScale,
  useLinearScale,
  useSequentialScale
}
