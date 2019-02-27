import React, { Fragment } from 'react';
import useSensorData from '../../hooks/sensorData'
import { useWindowWidth } from '../../hooks/window'

import Graph from '../common/Graph'
import Information from '../common/Information'

import './Home.css'

const Home = (props) => {
  const data = useSensorData('breather');  

  const width = useWindowWidth();

  return (
    <Fragment>
      <section>
        {data !== null
          ? <Graph data={data} width={width*0.65} />
          : null
        }
      </section>
      <Information />
    </Fragment>
  )
}

export default Home;

