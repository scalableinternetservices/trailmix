import http from 'k6/http'
import { sleep } from 'k6'

//see this link for k6 information: https://k6.io/docs/getting-started/running-k6
//make sure server is running before running this load test
//k6 will output information about its test, and data can also be visualized
//through honeycomb (see "Initial k6 test" for preliminary test)

//to install k6 on Mac, use "brew install k6" in terminal
//to run this script, use the command: k6 run server/src/loadtest/cacheScript.js

export let options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '50',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
}

export default function () {
  http.get('http://127.0.0.1:3000/app')

  sleep(1)
  http.get('http://127.0.0.1:3000/app/playground/login')

  sleep(1)
  http.get('http://127.0.0.1:3000/app/playground/signup')

  http.post('http://localhost:3000/auth/createUser', '{"email":"abcd@test.com","name":"Joe Bruin"}', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  http.post(
    'http://localhost:3000/graphql?opName=FetchUserContext',
    '{"operationName":"FetchUserContext","variables":{},"query":"query FetchUserContext {\n  self {\n    id\n    name\n    email\n    userType\n    favorites {\n      name\n      length\n      difficulty\n      stars\n      summary\n      __typename\n    }\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  http.post(
    'http://localhost:3000/graphql?opName=FetchMyComments',
    '{"operationName":"FetchMyComments","variables":{},"query":"query FetchMyComments {\n  mycomments {\n    id\n    name\n    text\n    date\n    hikeNum\n    likes\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
