import { get, put } from '../lib/dynamo'

const dynamoTable = process.env.SETUP_TABLE;

const getSetupData = thing => {
  return get({ thing }, dynamoTable)
    .then(result => {
      return {
        thing,
        timeZone: 'UTC',
        ...result.Item
      }
    });
}

const putSetupData = item => {
  return put(item, dynamoTable);
}

export {
  getSetupData,
  putSetupData
}
