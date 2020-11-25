import http from 'k6/http'
import { sleep } from 'k6'

//see this link for k6 information: https://k6.io/docs/getting-started/running-k6
//make sure server is running before running this load test
//k6 will output information about its test, and data can also be visualized
//through honeycomb (see "Initial k6 test" for preliminary test)

//to install k6 on Mac, use "brew install k6" in terminal
//to run this script, use the command: k6 run server/src/loadtest/cacheScript.js

export let options = {
  vus: 20, //number of virtual users
  duration: '30s', //duration of load test
}

export default function () {

  http.get('http://127.0.0.1:3000/app')

  sleep(1)
  http.get('http://127.0.0.1:3000/app/hiking')

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"FetchLatLon","variables":{"zipcode":90024},"query":"query FetchLatLon($zipcode: Int!) {\n  coordinates(zipcode: $zipcode) {\n    lat\n    lon\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7021675,"name":"Hollywood Sign and Bronson Caves","stars":4.4,"summary":"A popular route to the Hollywood Sign that offers plenty of great views along the way.","location":"Hollywood Hills West, California","difficulty":"blue","length":6.6}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7009699,"name":"Inspiration Point - Rustic Canyon Loop","stars":3.8,"summary":"A popular, scenic loop in Will Rogers State Park with beautiful views and picnic spots.","location":"Santa Monica, California","difficulty":"black","length":5.1}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7002910,"name":"Mount Hollywood Loop","stars":4.2,"summary":"A hilly loop with great views of Griffith Park while summiting Glendale Peak and Mount Hollywood.","location":"Hollywood, California","difficulty":"blue","length":3.7}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7033638,"name":"Sullivan Canyon Loop","stars":4.1,"summary":"Hike through Sullivan Canyon and along ridge lines just above Santa Monica.","location":"Santa Monica, California","difficulty":"blue","length":10.9}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7023796,"name":"Beaudry Loop","stars":4.1,"summary":"A loop hike into the Verdugo Mountain range, leaving and returning by the North and South Beaudry Motorways.","location":"La Crescenta-Montrose, California","difficulty":"blue","length":5.9}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7022079,"name":"Cahuenga Peak","stars":4,"summary":"A terrific, short-and-steep option to get to the Wisdom Tree and then Hollywood Sign from the west.","location":"Hollywood Hills West, California","difficulty":"blueBlack","length":3}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7022079,"name":"Cahuenga Peak","stars":4,"summary":"A terrific, short-and-steep option to get to the Wisdom Tree and then Hollywood Sign from the west.","location":"Hollywood Hills West, California","difficulty":"blueBlack","length":3}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7022102,"name":"Betty B. Dearing Lollipop","stars":3.9,"summary":"An awesome lollipop loop through a handful of parks outside of West Hollywood.","location":"West Hollywood, California","difficulty":"blueBlack","length":6.7}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7034229,"name":"Hollywood Reservoir Loop","stars":4.3,"summary":"A paved loop around the entire Hollywood Reservoir.","location":"Universal City, California","difficulty":"green","length":3.4}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7032959,"name":"Temescal Canyon Loop","stars":4,"summary":"A loop into the mountains above Santa Monica.","location":"Santa Monica, California","difficulty":"blue","length":3.8}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddHike","variables":{"input":{"id":7047165,"name":"Murphy Ranch Loop","stars":4.3,"summary":"A canyon hike to an abandoned Nazi compound from the 1930s, now a canvas for street art.","location":"Santa Monica, California","difficulty":"blue","length":3.2}},"query":"mutation AddHike($input: AddHikeInput!) {\n  addHike(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
