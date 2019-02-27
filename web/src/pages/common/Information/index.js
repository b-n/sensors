import React from 'react';
import { interpolateRdYlGn } from 'd3-scale-chromatic'
import { useSequentialScale } from '../../../hooks/graphScales'

import './index.css';

const LegendTable = ({children}) => (<table className="info-legend"><tbody>{children}</tbody></table>)

const LegendTableItem = ({color, range, explanation}) => (
  <tr>
    <td className="info-legend-range">
      <span className="dot" style={{backgroundColor: color}}></span>
      {range}
    </td>
    <td className="info-legend-description">{explanation}</td>
  </tr>
);

const Information = () => {
  const ppmColorScale = useSequentialScale({ interpolator: interpolateRdYlGn, to: 400, from: 1200 });

  return (
  <section className="info-container">
    <h1>Information</h1>
    <p>
      The graph to the left measures the average Carbon Dioxide (CO<sub>2</sub>)
      concentration near the sensor in the office. The sensor reads the values
      in parts per million (ppm).
    </p>
    <p>
      CO<sub>2</sub> is a colorless gas with a density about 60% higher than that
      of dry air. The current global concentration is about 410 ppm, having risen
      from pre-industrial levels of 280 ppm. CO<sub>2</sub> is produced by all
      aerobic organisms (things that breathe air) when they metabolize
      carbohydrates and lipids (fats etc) to produce energy by respiration.
    </p>
    <p>
      CO<sub>2</sub> levels outside of buildings can range from 380-500ppm. At
      very high concentrations (10.000ppm), CO<sub>2</sub> becomes toxic to
      animals. Raising the concentration to 10.000ppm for several hours will
      kill spider mites and whiteflies in a greenhouse.
    </p>
    <p>
      A few studies have found linkages in increased CO<sub>2</sub>
      concentrations and an increase in impairment in cognitive abilities. Relative
      to 600 ppm, at 1.000 ppm CO<sub>2</sub>, moderate and statistically significant
      decrements occurred in six of nine scales of decision-making performance
      <a href="https://web.archive.org/web/20160305212909/http://ehp.niehs.nih.gov/wp-content/uploads/2012/09/ehp.1104789.pdf" target="_blank" rel="noopener noreferrer"><sup>[ref]</sup></a>.
      In a study of Volatile Organic Compound Exposure (VOC), of which CO<sub>2</sub>
      is one, average cognitive scores were 61% higher on the Green building day
      (~740ppm) and 101% higher on the two Green+ (~502ppm) building days than
      on the Conventional building day (~940ppm) <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4892924/" target="_blank" rel="noopener noreferrer"><sup>[ref]</sup></a>.
    </p>
    <h2>Legend</h2>
    <LegendTable>
      <LegendTableItem color={ppmColorScale(500)} range="400-600" explanation="Ideal" />
      <LegendTableItem color={ppmColorScale(700)} range="600-800" explanation="Okay, mild cognitive impairment" />
      <LegendTableItem color={ppmColorScale(900)} range="800-1000" explanation="Some cognitive impairment" />
      <LegendTableItem color={ppmColorScale(1100)} range="1000-1200" explanation="Open some windows already" />
      <LegendTableItem color={ppmColorScale(1300)} range="1200+" explanation="Illegal in South Netherlands (Belgium)" />
    </LegendTable>

    <h2>Graph Info</h2>
    <p>
      Readings are taken every 1 minute from the device. If the value doesn't
      change, then no value is plotted. Values are summarised into 10 minute
      intervals, where the points represent the median value in that 10 minutes.
      The black lines indicate the upper and lower quartile of the values in
      the 10 minutes to show the variablility in the readings.
    </p>
  </section>
  );
}

export default Information;
