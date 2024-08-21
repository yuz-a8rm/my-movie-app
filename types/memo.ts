import { type Timestamp } from 'firebase/firestore'

interface Memo {
    id: string
    titleText: string
    contentText: string
    updatedAt: Timestamp
}

export type { Memo }