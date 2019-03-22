import { useEffect } from 'react';
import { scaleTime, scaleLinear, scaleOrdinal, scaleSequential } from 'd3-scale';
import { hash } from '../lib'

const useTimeScale = ({domain}) => {
  const scale = scaleTime()
    .domain(domain)

  useEffect(() => {
    scale
      .domain(domain)
  }, [ ...domain ]);

  return scale;
}

const useLinearScale = ({domain}) => {
  const scale = scaleLinear()
    .domain(domain)

  useEffect(() => {
    scale
      .domain(domain)
  }, [ ...domain ]);

  return scale;
}

const useOrdinalScale = ({domain = [], range = []}) => {
  const scale = scaleOrdinal()
  if (domain.length) scale.domain(domain)
  if (range.length) scale.range(range)

  useEffect(() => {
    if (domain.length) scale.domain(domain)
    if (range.length) scale.range(range)
  }, [ hash(domain), hash(range) ])

  return scale
}

const useSequentialScale = ({ domain = [], interpolator }) => {
  const scale = scaleSequential(interpolator)
    .domain(domain);

  useEffect(() => {
    scale
      .domain(domain);
  }, [ ...domain ])

  return scale;
}

export {
  useTimeScale,
  useLinearScale,
  useOrdinalScale,
  useSequentialScale
}
