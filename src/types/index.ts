export interface UserAnswersType {
  [index: string]: string
}

export type UserType = {
  id: string
  name: string
  avatarURL: string
  answers: UserAnswersType
  polls: Array<string>
}

interface NormalizedData<T> {
  [index: string]: T
}

export type UsersType = NormalizedData<UserType>

type OptionsVotesType = {
  text: string
  votes: Array<string>
}

interface PollOptionsType {
  [poll: string]: OptionsVotesType
}

export type PollType = {
  id: string
  question: string
  author: string
  timestamp: number
  options: PollOptionsType
}

export type NewPollSubmitType = {
  question: string
  a: string
  b: string
  c: string
  d: string
}

export type NewPollType = NewPollSubmitType & {
  author: string
}

export type PollAnswerType = {
  authedUser: string
  answer: string
  id: string
}

export type PollsType = NormalizedData<PollType>
