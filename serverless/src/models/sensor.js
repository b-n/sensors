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

const querySensorData = ({thing, fromDate, toDate}) => {
  let queryString = 'thing = :thing'
  if (fromDate !== undefined && toDate !== undefined) queryString += ' AND summaryDate BETWEEN :from AND :to';
  else if (fromDate !== undefined) queryString += ' AND summaryDate >= :from';
  else if (toDate !== undefined) queryString += ' AND summaryDate <= :to';

  return query({
    KeyConditionExpression: queryString,
    ExpressionAttributeValues: {
      ':thing': thing,
      ':from': fromDate,
      ':to': toDate
    }
  }, dynamoTable).then(result => {
    if (!result.Count) return [];
    return result.Items;
  })
}

const putSensorData = item => {
  return put(item, dynamoTable);
}

const getDataPointFromIOTReading = (event) => ({ ...event, timestamp: new Date(0).setUTCSeconds(event.timestamp) });

export {
  getSensorData,
  putSensorData,
  querySensorData,
  getDataPointFromIOTReading
}
