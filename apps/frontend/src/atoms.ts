import { atom, createStore } from 'jotai'

import { GetUserResponse } from '@repo/schemas'

export const userDataAtom = atom<GetUserResponse | null>(null)

export const store = createStore()
