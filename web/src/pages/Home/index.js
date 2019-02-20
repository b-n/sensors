import React from 'react';
import useSensorData from '../../hooks/sensorData'
import Graph from '../common/Graph'
import { useWindowWidth } from '../../hooks/window'

const Home = (props) => {
  const data = useSensorData('breather');  

  const width = useWindowWidth();
  console.log(data);

  return (
    <div>
      <section>
        {data !== null
          ? <Graph data={data} width={width} />
          : null
        }
      </section>
    </div>
  )
}

export default Home;

