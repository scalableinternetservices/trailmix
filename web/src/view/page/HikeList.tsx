import { Dialog, DialogContent, IconButton, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { TrailDesc, TrailTitle } from '../../style/header'
import { AppRouteParams } from '../nav/route'
import { favorite } from '../playground/mutateHikes'
import { CommentsSection } from './CommentSection'

//const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })

interface HikingListProps extends RouteComponentProps, AppRouteParams {
  allHikes: Trail[]
}
export interface Trail {
  id: string
  name: string
  length: number
  summary: string
  difficulty: string
  stars: number
  starVotes: number
  location: string
  conditionStatus: string
  conditionDetails: string
  conditionDate: string
  lat: number
  lon: number
  comments: string[]
  names: string[]
  dates: string[]
}

interface trailInfo {
  id: number
  title?: string
  summary?: string
  length?: number
  difficulty?: string
  stars?: number
  location?: string
  conditionStatus?: string
  conditionDetails?: string
  conditionDate?: string
  icon?: undefined | string
  onClick?: () => void | undefined
  comments: string[]
  names: string[]
  dates: string[]
}

interface trailStyle {
  background?: string
  outline: string
  width: string
  borderRadius: string
  opacity: number
}

const buttonStyle: trailStyle = {
  outline: 'none',
  width: '70%',
  borderRadius: '25px',
  opacity: 1,
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

export default class HikeList extends Component<HikingListProps, { open: boolean }> {
  openTabs: Map<string | undefined, boolean>
  favorited: Map<number, boolean>

  constructor(props: HikingListProps) {
    super(props)
    this.state = { open: false }
    this.openTabs = new Map<string | undefined, boolean>()
    this.favorited = new Map<number, boolean>()
  }

  togglePopup(title: string | undefined, task: string) {
    this.setState({ open: true })
    console.log(task)
    if (!this.openTabs.has(title)) {
      this.openTabs.set(title, true)
    } else {
      if (task === 'close') {
        this.openTabs.delete(title)
        this.openTabs.set(title, false)
      } else {
        this.openTabs.delete(title)
      }
    }
    console.log(this.openTabs)
  }

  async addFav(hike: trailInfo) {
    if (this.favorited.get(hike.id)) {
      this.favorited.set(hike.id, false)
      //where we would unfavorite
      return
    }
    this.favorited.set(hike.id, true)
    if (
      hike.title == null ||
      hike.summary == null ||
      hike.length == null ||
      hike.difficulty == null ||
      hike.location == null ||
      hike.stars == null
    ) {
      return
    }
    void favorite(getApolloClient(), {
      hike: {
        id: hike.id,
        name: hike.title,
        summary: hike.summary,
        length: hike.length,
        difficulty: hike.difficulty,
        location: hike.location,
        stars: hike.stars,
      },
    })
  }

  TrailInfoCard(args: trailInfo) {
    return (
      <div
        id="trailInfo"
        className="flex items-center pa2 hover-bg-light-green bg-washed-green"
        style={buttonStyle}
        onClick={() => this.togglePopup(args.title, 'open')}
      >
        <img src={args.icon ? args.icon : undefined} className="ph3" />
        <div>
          <div className="flex flex-column" style={{ float: 'left', width: '90%' }}>
            <TrailTitle className="pv2">{args.title}</TrailTitle>
            <TrailDesc className="pb2">{args.summary} </TrailDesc>
          </div>
          <div style={{ float: 'right', width: '10%' }}>
            <Checkbox
              onClick={() => this.addFav(args)}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
            />
          </div>
        </div>
        <Dialog
          // disableBackdropClick={true}
          onClose={args.onClick}
          aria-labelledby="customized-dialog-title"
          open={!!this.openTabs.get(args.title)}
        >
          <DialogTitle id="customized-dialog-title" onClose={() => this.togglePopup(args.title, 'close')}>
            {args.title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{args.summary}</Typography>
            <Typography gutterBottom>
              This {args.length}-mile hike, located in {args.location}, has {args.difficulty}-level difficulty and is
              currently rated {args.stars} stars.
            </Typography>
            <CommentsSection comments={args.comments} names={args.names} dates={args.dates} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  render() {
    return this.props.allHikes.map(item => {
      return this.TrailInfoCard({
        id: parseInt(item.id),
        title: item.name,
        summary: item.summary,
        length: item.length,
        difficulty: item.difficulty,
        stars: item.stars,
        location: item.location,
        conditionStatus: item.conditionStatus,
        conditionDetails: item.conditionDetails,
        conditionDate: item.conditionDate,
        comments: item.comments,
        names: item.names,
        dates: item.dates,
      })
    })
  }
}
