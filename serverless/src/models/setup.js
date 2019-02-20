import { get, put } from '../lib/dynamo'

const dynamoTable = process.env.SETUP_TABLE;

const getSetupData = thing => {
  return get({ thing }, dynamoTable)
    .then(result => {
      if (!result.Count) return { thing, timeZone: 'UTC' }
      return result.Items[0]
    });
}

const putSetupData = item => {
  return put(item, dynamoTable);
}

export {
  getSetupData,
  putSetupData
}
