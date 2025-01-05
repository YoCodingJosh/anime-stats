import { atom } from 'jotai'

import { GetUserResponse } from '@repo/schemas'

export const userDataAtom = atom<GetUserResponse>()