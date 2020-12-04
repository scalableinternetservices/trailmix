import http from 'k6/http'
import { sleep } from 'k6'

//see this link for k6 information: https://k6.io/docs/getting-started/running-k6
//make sure server is running before running this load test
//k6 will output information about its test, and data can also be visualized
//through honeycomb (see "Initial k6 test" for preliminary test)

//to install k6 on Mac, use "brew install k6" in terminal
//to run this script, use the command: k6 run server/src/loadtest/expectedUsage.js

export let options = {
  vus: 10, //number of virtual users
  duration: '30s', //duration of load test
}

export default function () {
  //normal person workflow
  //load app
  http.get('http://127.0.0.1:3000/app')
  sleep(1)
  //run a query which hits data api and adds 10 hikes to the db
  for (let i = 0; i < 10; i++) {
    http.post(
      'http://localhost:3000/graphql',
      '{"operationName":"AddHike","variables":{"input":{"id":' +
        i +
        ',"name":"Hollywood Reservoir Loop","stars":4.3,"summary":"A paved loop around the entire Hollywood Reservoir.","location":"Universal City, California","difficulty":"green","length":3.4,"latitude":34.1287,"longitude":-118.3363}},"query":"mutation AddHike($input: AddHikeInput!) {  addHike(input: $input) } "}',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    sleep(0.5)
  }
  //load comments
  sleep(1)
  //add comment
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddComment","variables":{"input":{"id":1,"name":"name1","text":"test1","date":"11:59:10 AM, 11/23/2020"}},"query":"mutation AddComment($input: AddCommentInput!) {  addComment(input: $input)}"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  //upvote a comment
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"UpvoteComment","variables":{"input":{"name":"name1","text":"test1","date":"11:59:10 AM, 11/23/2020","id":1}},"query":"mutation UpvoteComment($input: UpvoteInput!) {  upvoteComment(input: $input)}"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  //add a favorite hike
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":' +
      1 +
      ',"name":"Hollywood Reservoir Loop","stars":4.3,"summary":"A paved loop around the entire Hollywood Reservoir.","location":"Universal City, California","difficulty":"green","length":3.4,"latitude":34.1287,"longitude":-118.3363}},"query":"mutation AddHike($input: AddHikeInput!) {  addHike(input: $input) } "}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
