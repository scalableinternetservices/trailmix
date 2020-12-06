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
  http.get('http://127.0.0.1:3000/app/hiking')

  http.post(
    'http://127.0.0.1:3000/graphql',
    '{"operationName":"FetchLatLon","variables":{"zipcode":90024},"query":"query FetchLatLon($zipcode: Int!) {\n  coordinates(zipcode: $zipcode) {\n    lat\n    lon\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  http.post(
    'http://127.0.0.1:3000/graphql',
    '{"operationName":"FetchComments","variables":{},"query":"query FetchComments {\n  comments {\n    id\n    name\n    text\n    date\n    hikeNum\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  http.post(
    'http://127.0.0.1:3000/graphql',
    '{"operationName":"FetchHikes","variables":{},"query":"query FetchHikes {\n  hikes {\n    id\n    name\n    summary\n    length\n    difficulty\n    location\n    stars\n    latitude\n    longitude\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  http.post(
    'http://127.0.0.1:3000/graphql',
    '{"operationName":"FetchLatLon","variables":{"zipcode":94544},"query":"query FetchLatLon($zipcode: Int!) {\n  coordinates(zipcode: $zipcode) {\n    lat\n    lon\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  http.post(
    'http://127.0.0.1:3000/graphql',
    '{"operationName":"FetchComments","variables":{},"query":"query FetchComments {\n  comments {\n    id\n    name\n    text\n    date\n    hikeNum\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  http.post(
    'http://127.0.0.1:3000/graphql',
    '{"operationName":"FetchHikes","variables":{},"query":"query FetchHikes {\n  hikes {\n    id\n    name\n    summary\n    length\n    difficulty\n    location\n    stars\n    latitude\n    longitude\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
