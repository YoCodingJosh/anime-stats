import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { GetUserResponse } from '@repo/schemas'

export const userDataAtom = atom<GetUserResponse | null>(null)
export const statsDataAtom = atomWithStorage<object | null>('statsData', null) // TODO: Create a schema for this

export const store = createStore()
