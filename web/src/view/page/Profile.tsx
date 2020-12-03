import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { FetchComments, FetchUserContext, FetchUserContext_self } from '../../graphql/query.gen'
import { H1, H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { fetchUser } from '../auth/fetchUser'
import { AppRouteParams } from '../nav/route'
import { fetchComments } from '../playground/mutateComments'
import { CommentCard } from './Comment'
import { Page } from './Page'
import { TrailInfoCard } from './TrailInfo'

interface ProfilePageProps extends RouteComponentProps, AppRouteParams {
  user: FetchUserContext_self
}

const FavHikes: Function = (): JSX.Element[] => {
  //TODO: Isolate favorited hikes to per-user
  const { data } = useQuery<FetchUserContext>(fetchUser)
  if (data && data.self && data.self.favorites) {
    return data.self.favorites.map(hike => (
      <TrailInfoCard
        title={hike!.name}
        // description={hike.summary}
        // distance={String(hike.length)}
        // difficulty={hike.difficulty}
      />
    ))
  }
  return []
}

const RecentComments: Function = (): JSX.Element[] => {
  const { data } = useQuery<FetchComments>(fetchComments)
  if (data) {
    return data.comments.map(comment => <CommentCard name={comment.name} message={comment.text} time={comment.date} />)
  }
  return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Profile(props: ProfilePageProps) {
  return (
    <Page>
      <Hero>
        <H1>My Profile</H1>
        <H3>Welcome, {props.user.name}</H3>
      </Hero>
      <Content>
        <LContent>
          <Section>
            <H2>My Favorite Hikes</H2>
            <Spacer $h4 />
            <FavHikes />
          </Section>
          {/* <Section>
            <H2>My Recent Comments</H2>
            <Spacer $h4 />
            <RecentComments />
          </Section> */}
        </LContent>
        <RContent>
          <Section>
            <H2>Your Information</H2>
            <Spacer $h4 />
            <BodyText>
              <table>
                <tbody>
                  <tr>
                    <TD>Email: </TD>
                    <TD>{props.user.email ? props.user.email : 'Oops, no email provided'}</TD>
                  </tr>
                  <tr>
                    <TD>Name: </TD>
                    <TD>{props.user.name ? props.user.name : 'Oops, no name provided'}</TD>
                  </tr>
                </tbody>
              </table>
            </BodyText>
          </Section>
          <Section>
            <H2>My Recent Comments</H2>
            <Spacer $h4 />
            <RecentComments />
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
