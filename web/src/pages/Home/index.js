import React, { Fragment } from 'react';

import useSensorData from '../../hooks/sensorData'
import { useWindowWidth } from '../../hooks/window'
import { useCastSender } from '../../hooks/cast'

import ThingHistory from '../common/ThingHistory'
import Information from '../common/Information'
import { addDays, format } from 'date-fns';

import { env } from '../../config'
import './Home.css'

const Home = () => {
  useCastSender({appId: env.chromeCastAppId});
  
  const data1 = useSensorData('breather', { refreshDuration: 300000, fromDate: format(addDays(new Date(), -4), 'YYYY-MM-DD')});
  const data2 = useSensorData('breather2', { refreshDuration: 300000, fromDate: format(addDays(new Date(), -4), 'YYYY-MM-DD')});
  
  const data = [ data1, data2 ];

  const width = useWindowWidth();

  const graphWidth = width*0.65*(1/data.length);

  return (
    <Fragment>
      {data.map(d => d !== null && (
        <section
          key={d.thing}
          style={{width: graphWidth}}
          className="graph"
        >
          {d !== null
            ? <ThingHistory
                data={d}
                width={graphWidth}
                animate={true}
              />
            : null
          }
        </section>
      ))}
      <Information onlySummary={false}/>
    </Fragment>
  )
}

export default Home;

