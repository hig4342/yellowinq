import { readFileSync } from 'node:fs'
import { createSchema, createPubSub } from "graphql-yoga";
import { Message, Resolvers } from './resolvers-types'
import { messageDB } from '@/database/db';
import { DateTimeResolver } from 'graphql-scalars';
import { compareAsc } from 'date-fns';
import { MessageModel } from '@/models/message';
import { GenerateService } from '@/services/generate.service';

const pubSub = createPubSub<{
  'chatting:followMessage': [channelId: string, payload: Message]
}>()

const typeDefs = readFileSync('./schema.graphql', 'utf8')

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    findIdMessage: async (_, { channelId }) => {
      const { items: messages } = await messageDB.fetch({channelId})

      const result = (messages as Array<MessageModel>)
        .map((v) => ({...v, datetime: new Date(v.datetime)}))
        .sort((a, b) => compareAsc(a.datetime, b.datetime))
      return result
    },
    getRandomCoordinate: async (_, { country }) => {
      return await new GenerateService().generateCoordinate(country)
    },
    getCountries: () => {
      return GenerateService.getCountries()
    }
  },
  Subscription: {
    followMessage: {
      subscribe: (_, { channelId }) => pubSub.subscribe('chatting:followMessage', channelId),
      resolve: (payload: any) => payload
    }
  },
  Mutation: {
    broadcastMessage: async (_, { message }) => {
      const date = new Date()
      const data = {
        ...message,
        datetime: date.getTime(),
      }
      const payload = {
        ...message,
        datetime: date
      }
      await messageDB.put(data)
      pubSub.publish('chatting:followMessage', message.channelId, payload)
      return true
    }
  }
}

export const schema = createSchema({typeDefs, resolvers})