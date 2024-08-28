import { type Timestamp } from 'firebase/firestore'

interface Memo {
    id: string
    titleText: string
    contentText: string
    updatedAt: Timestamp
    point: string
}

export type { Memo }