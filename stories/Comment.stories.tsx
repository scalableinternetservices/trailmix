import { Meta, Story } from '@storybook/react'
import * as React from 'react'
import { AuthorComment } from '../web/src/view/page/AuthorComment'
import { CommentCard } from '../web/src/view/page/Comment'

export default {
  title: 'Comment',
} as Meta

const CommentTemplate: Story = args => <CommentCard {...args} />

export const Comment = CommentTemplate.bind({})
Comment.args = {
  name: 'Chex Mix',
  message: 'I love this trail!',
  time: '3:45PM',
}

const AuthorCommentTemplate: Story = args => <AuthorComment {...args} />

export const Author = AuthorCommentTemplate.bind({})
