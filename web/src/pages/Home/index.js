import React, { Fragment } from 'react';

import useSensorData from '../../hooks/sensorData'
import { useWindowWidth } from '../../hooks/window'
import { useCastSender } from '../../hooks/cast'

import Graph from '../common/Graph'
import Information from '../common/Information'

import { env } from '../../config'

const Home = () => {
  useCastSender({appId: env.chromeCastAppId});
  
  const data = useSensorData('breather');

  const width = useWindowWidth();

  return (
    <Fragment>
      <section>
        {data !== null
          ? <Graph data={data} width={width*0.65} animate={true}/>
          : null
        }
      </section>
      <Information onlySummary={false}/>
    </Fragment>
  )
}

export default Home;

