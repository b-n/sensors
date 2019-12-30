const dev = {
  //apiEndpoint: 'http://localhost:4000/thing/',
  apiEndpoint: 'https://bnb7g0g5g1.execute-api.eu-central-1.amazonaws.com/dev/thing/',
  chromeCastAppId: '860368F7'
}

const prod = {
  apiEndpoint: 'https://bnb7g0g5g1.execute-api.eu-central-1.amazonaws.com/dev/thing/',
  chromeCastAppId: '95A6E974'
}

const env = process.env.NODE_ENV === 'development'
  ? dev
  : prod;

export {
  env
}

