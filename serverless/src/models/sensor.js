import { get, put, update, query } from '../lib/dynamo'
import { mean, quantile } from 'd3-array'

const dynamoTable = process.env.DATA_TABLE;

const addHistoryReading = (key, item) => {
  console.log('addb',key, item);
  return update(
    key,
    dynamoTable,
    {
      UpdateExpression: 'SET history = list_append(if_not_exists(history, :emptylist), :item)',
      ExpressionAttributeValues: { ':item': [item], ':emptylist': [] },
      ReturnValues: 'UPDATED_NEW'
    }
  )
    .then(res => { console.log('add', res.Attributes); return res; })
    .then(res => res.Attributes);
}

const getInterval = (key, interval) => {
  return get(
    key,
    dynamoTable,
    {
      ProjectionExpression: `intervals.#interval.#items`,
      ExpressionAttributeNames: { '#interval': interval, '#items': 'items' }
    }
  )
  .then(res => { console.log(res); return res; })
  .then(res => {
    return !res.Item || !res.Item.intervals
      ? { items: [] }
      : res.Item.intervals[interval];
  })
}

const putInterval = async (key, interval, data) => {
  await update(
    key,
    dynamoTable,
    {
      UpdateExpression: `SET #intervals = :emptyobj`,
      ConditionExpression: `attribute_not_exists(#intervals)`,
      ExpressionAttributeNames: { '#intervals': 'intervals' },
      ExpressionAttributeValues: { ':emptyobj': {} }
    }
  )
  .catch(e => { if (e.code != 'ConditionalCheckFailedException') throw e; });

  return update(
    key,
    dynamoTable,
    {
      UpdateExpression: `SET intervals.#interval = :data`,
      ExpressionAttributeNames: { '#interval': interval },
      ExpressionAttributeValues: { ':data': data },
      ReturnValues: 'UPDATED_NEW'
    }
  )
}

const getDataPoints = (data, accessor) => {
  data.sort((a,b) => accessor(a) - accessor(b));
  return {
    mean: mean(data, accessor),
    max: quantile(data, 1, accessor),
    upper: quantile(data, 0.75, accessor),
    median: quantile(data, 0.5, accessor),
    lower: quantile(data, 0.25, accessor),
    min: quantile(data, 0, accessor)
  }
}

const summariseInterval = items => {
  return {
    items,
    co2: getDataPoints(items, d => d.ppm),
    temp: getDataPoints(items, d => d.temp),
    humidity: getDataPoints(items, d => d.humidity)
  }
}

const getSensorData = key => {
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
  getDataPointFromIOTReading,
  addHistoryReading,
  getInterval,
  putInterval,
  summariseInterval
}
