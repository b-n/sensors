import React, { Fragment } from 'react';
import useSensorData from '../../hooks/sensorData'
import { useWindowWidth } from '../../hooks/window'
import { useCastReciever } from '../../hooks/cast'
import { format, addDays } from 'date-fns'

import ThingHistory from '../common/ThingHistory'
import Information from '../common/Information'

const CastReciever = () => {
  useCastReciever();
  const fromDate = format(addDays(new Date(), -3), 'YYYY-MM-DD')
  const data = useSensorData('breather', { fromDate, refreshDuration: 60000 });  

  const width = useWindowWidth();

  const graphWidth = width*0.65*(1/data.length);

  return (
    <Fragment>
      <section
        style={{width: graphWidth}}
      >
        {data !== null
          ? <ThingHistory
              data={data}
              width={graphWidth}
              animate={true}
            />
          : null
        }
      </section>
      <Information onlySummary={false}/>
    </Fragment>
  )
}

export default CastReciever;

