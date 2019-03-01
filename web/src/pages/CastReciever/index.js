import React, { Fragment } from 'react';
import useSensorData from '../../hooks/sensorData'
import { useWindowWidth } from '../../hooks/window'
import { useCastReciever } from '../../hooks/cast'
import { format, addDays } from 'date-fns'

import Graph from '../common/Graph'
import Information from '../common/Information'

const CastReciever = () => {
  useCastReciever();
  const fromDate = format(addDays(new Date(), -3), 'YYYY-MM-DD')
  const data = useSensorData('breather', { fromDate, refreshDuration: 60000 });  

  const width = useWindowWidth();

  return (
    <Fragment>
      <section>
        {data !== null
          ? <Graph data={data} width={width*0.65} animate={false}/>
          : null
        }
      </section>
      <Information onlySummary={true}/>
    </Fragment>
  )
}

export default CastReciever;

