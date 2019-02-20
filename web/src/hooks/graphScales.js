import { useState, useEffect } from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';

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
        .range([height, 0])
    })
  }, [height]);

  return scale.scale;
}

export {
  useTimeScale,
  useLinearScale
}
