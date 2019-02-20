import { get, put, query } from '../lib/dynamo'

const dynamoTable = process.env.DATA_TABLE;

const getSensorData = key => {
  console.log(key);
  return get(key, dynamoTable)
    .then(result => {
      if (!result.Item) return { ...key, history: [] }
      return result.Item;
    });
}

const querySensorData = thing => {
  return query({
    KeyConditionExpression: 'thing = :thing',
    ExpressionAttributeValues: { ':thing': thing }
  }, dynamoTable).then(result => {
    if (!result.Count) return [];
    return result.Items;
  })
}

const putSensorData = item => {
  return put(item, dynamoTable);
}

const getDataPointFromIOTReading = ({ thing, newPPM, timestamp }) => ({ thing, ppm: newPPM, timestamp: new Date(0).setUTCSeconds(timestamp) });

export {
  getSensorData,
  putSensorData,
  querySensorData,
  getDataPointFromIOTReading
}
