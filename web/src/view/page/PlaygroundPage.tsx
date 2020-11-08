import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { AppRouteParams, PlaygroundApp } from '../nav/route'
import { Surveys } from '../playground/Surveys'
import { AuthorComment } from './AuthorComment'
import { CommentCard } from './Comment'
import { Page } from './Page'

interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams {}

export function PlaygroundPage(props: PlaygroundPageProps) {
  return <Page>{getPlaygroundApp(props.app)}</Page>
}

interface CommentListProps {
  comments: string[]
  names: string[]
  dates: string[]
}

const listProps: CommentListProps = {
  comments: [],
  names: [],
  dates: [],
}

// function updateComments(comment: string, name: string, time: string) {
//   console.log('updating stuff')
//   console.log(listProps)
//   listProps.comments.push(comment)
//   listProps.names.push(name)
//   listProps.dates.push(time)
// }

function getPlaygroundApp(app?: PlaygroundApp) {
  // const [counter, setCounter] = useState(0)
  const [comments, setComments] = useState(listProps.comments)
  const [names, setNames] = useState(listProps.names)
  const [dates, setDates] = useState(listProps.dates)

  // function rerender() {
  //   if (listProps.comments.length > counter) {
  //     setCounter(listProps.comments.length)
  //   }
  // }

  if (!app) {
    return <div>choose an app</div>
  }
  switch (app) {
    case PlaygroundApp.SURVEYS:
      return <Surveys />
    case PlaygroundApp.LOGIN:
      return (
        <>
          <div>
            <AuthorComment
              comments={comments}
              names={names}
              dates={dates}
              setCommentsCallback={setComments}
              setNamesCallback={setNames}
              setDatesCallback={setDates}
            />
          </div>
          <div>
            {comments.map((comment, index) => (
              // eslint-disable-next-line react/jsx-key
              <CommentCard message={comment} name={names[index]} time={dates[index]} />
            ))}
            {console.log(comments)}
          </div>
        </>
      )
    default:
      throw new Error('no app found')
  }
}
