const dev = {
  apiEndpoint: 'http://localhost:4000/thing/'
}

const prod = {
  apiEndpoint: 'https://bnb7g0g5g1.execute-api.eu-central-1.amazonaws.com/dev/thing/'
}

const env = process.env.NODE_ENV === 'development'
  ? dev
  : prod;

export {
  env
}

