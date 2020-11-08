import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H1, H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { Link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { AuthorComment } from './AuthorComment'
import { CommentCard } from './Comment'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {
  comments: string[]
  names: string[]
  dates: string[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  const [comments, setComments] = useState<string[]>(props.comments)
  const [names, setNames] = useState<string[]>(props.names)
  const [dates, setDates] = useState<string[]>(props.dates)
  return (
    <Page>
      <Hero>
        <H1>Trailmix</H1>
        <H3>Scalable Internet Services Project</H3>
        <H3>UCLA, Fall 2020</H3>
      </Hero>
      <Content>
        <LContent>
          <Section>
            <H2>About Trailmix</H2>
            <Spacer $h4 />
            <BodyText>A hiking application to make finding hikes easier and fun!</BodyText>
            <Spacer $h4 />
            <BodyText>
              Instructions: Input zip code -- get hikes nearby -- go on hikes! -- leave comments with your feedback!
            </BodyText>
          </Section>
          <Section>
            <H2>Test Comments Section</H2>
            <Spacer $h4 />
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
            <Spacer $h4 />
            <div>
              {comments.map((comment, index) => (
                // eslint-disable-next-line react/jsx-key
                <CommentCard message={comment} name={names[index]} time={dates[index]} />
              ))}
            </div>
            <Spacer $h4 />
          </Section>
        </LContent>
        <RContent>
          <Section>
            <H2>Team Information</H2>
            <Spacer $h4 />
            <BodyText>
              <table>
                <tbody>
                  <tr>
                    <TD>👨‍💻</TD>
                    <TD>Jivan Gubbi</TD>
                    <TD>👩‍💻</TD>
                    <TD>Hayley Martinez</TD>
                  </tr>
                  <tr>
                    <TD>👩‍💻</TD>
                    <TD>Shikha Mody</TD>
                    <TD>👨‍💻</TD>
                    <TD>Armaan Singh</TD>
                  </tr>
                </tbody>
              </table>
            </BodyText>
          </Section>
          <Section>
            <H2>Resources</H2>
            <Spacer $h4 />
            <BodyText>
              <ul className="ml4">
                <li>
                  <Link block href="https://www.typescriptlang.org/docs/handbook/intro.html">
                    TypeScript handbook
                  </Link>
                  <Link block href="https://basarat.gitbook.io/typescript/">
                    TypeScript deep-dive
                  </Link>
                </li>
                <li>
                  <Link block href="https://www.typescriptlang.org/play">
                    TypeScript playground
                  </Link>
                </li>
                <li>
                  <Link block href="https://reactjs.org/tutorial/tutorial.html">
                    React tutorial
                  </Link>
                </li>
                <li>
                  <Link block href="https://reactjs.org/docs/hello-world.html">
                    React docs
                  </Link>
                </li>
                <li>
                  <Link block href="https://www.apollographql.com/docs/react/data/queries/">
                    Apollo client docs
                  </Link>
                </li>
                <li>
                  <Link block href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">
                    <code>fetch</code> docs
                  </Link>
                </li>
                <li>
                  <Link block href="#">
                    Project troubleshooting
                  </Link>
                </li>
              </ul>
            </BodyText>
          </Section>
        </RContent>
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.mint + '!important',
  borderRightColor: Colors.mint + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-70-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-30-l')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'mint'] + '!important',
  borderLeftWidth: '3px',
}))

const TD = style('td', 'pa1', p => ({
  color: p.$theme.textColor(),
}))
