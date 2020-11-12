import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Comment } from '../entities/Comment'
import { Hike } from '../entities/Hike'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { zip_code } from '../entities/ZipCode'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

async function coordinateQuery(zip: number) {
  return (await zip_code.findOne({ where: { zipcode: zip } })) || null
}
interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    hike: async (_, hikeId) => (await Hike.findOne({ where: { id: hikeId } })) || null,
    comment: async (_, commentId) => (await Comment.find({ where: { id: commentId } })) || null,
    comments: () => Comment.find(),
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    coordinates: (_, { zipcode }) => coordinateQuery(zipcode),
    hikes: () => Hike.find(),
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    addComment: async (_, { input }, ctx) => {
      const { id, name, text, date } = input

      const newComment = new Comment()
      newComment.text = text
      newComment.date = date
      newComment.name = name
      newComment.likes = 0
      const hike = await Hike.findOne({ where: { id: id } })
      if (hike != null) {
        newComment.hike = hike
      }

      await newComment.save()
      ctx.pubsub.publish('ADD_HIKE_' + id, newComment)

      return true
    },
    upvoteComment: async (_, { input }, ctx) => {
      const { id, name, text, date } = input
      if (id == null) {
        return false
      }
      const com = check(await Comment.findOne({ where: { text: text, name: name, date: date } }))
      com.likes = com.likes + 1

      await com.save()
      ctx.pubsub.publish('COMMENT_UPDATE_' + com.id, com)

      return true
    },
    downvoteComment: async (_, { input }, ctx) => {
      const { id, name, text, date } = input
      if (id == null) {
        return false
      }
      const com = check(await Comment.findOne({ where: { text: text, name: name, date: date } }))
      com.likes = com.likes - 1

      await com.save()
      ctx.pubsub.publish('COMMENT_UPDATE_' + com.id, com)

      return true
    },
    addHike: async (_, { input }, ctx) => {
      const { id, name, summary, stars, difficulty, location, length } = input

      const newHike = new Hike()
      newHike.id = id
      newHike.name = name
      newHike.summary = summary
      newHike.stars = stars
      newHike.difficulty = difficulty
      newHike.location = location
      newHike.length = length

      await newHike.save()
      ctx.pubsub.publish('ADD_HIKE_' + id, newHike)

      return true
    },
    addFavorite: async (_, { input }, ctx) => {
      const { hike } = input
      const user = ctx.user
      if (user == null) {
        return false
      }
      let found = await Hike.findOne({ where: { id: hike.id } })
      if (found == null) {
        const h = new Hike()
        h.id = hike.id
        h.name = hike.name
        h.summary = hike.summary
        h.stars = hike.stars
        h.difficulty = hike.difficulty
        h.location = hike.location
        h.length = hike.length
        found = h
      }
      if (user.favorites == undefined || user.favorites == null) {
        user.favorites = [found]
        return true
      }
      if (user.favorites.includes(found)) {
        return false
      }
      user.favorites.push(found)
      await user?.save()

      return true
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
