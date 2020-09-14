import { createAction } from '@reduxjs/toolkit'

export function getPercentage(count: number, total: number): number {
  return total === 0 ? 0 : (count / total) * 100
}

export const createSagaAction = <
  Trigger = void,
  Fulfilled = void,
  Rejected = { message: string },
  T extends string = string
>(
  type: T
) => ({
  trigger: createAction<Trigger>(`${type}/trigger`),
  fulfilled: createAction<Fulfilled>(`${type}/fulfilled`),
  rejected: createAction<Rejected>(`${type}/rejected`),
})
