import http from 'k6/http'
import { sleep } from 'k6'

//see this link for k6 information: https://k6.io/docs/getting-started/running-k6
//make sure server is running before running this load test
//k6 will output information about its test, and data can also be visualized
//through honeycomb (see "Initial k6 test" for preliminary test)

//to install k6 on Mac, use "brew install k6" in terminal
//to run this script, use the command: k6 run server/src/loadtest/kbScript.js

export let options = {
  vus: 10, //number of virtual users
  duration: '30s', //duration of load test
}

export default function () {
  http.get('http://127.0.0.1:3000/app')
  sleep(1)
  http.get('http://127.0.0.1:3000/hiking')
  sleep(1)
}
