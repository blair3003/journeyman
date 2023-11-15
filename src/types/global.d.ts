type FirebaseUser = import('firebase/auth').User

type User = {
    uid: string
    username: string
    displayName: string
    photoURL?: string
    roles?: string[]
    createdAt: Date
}

type Campaign = {
    uid: string
    title: string
    users?: string[]
    missions?: string[]
    createdAt: Date
    updatedAt: Date
}

type Mission = {
    uid: string
    campaign: string
    title: string
    description?: string
    objectives?: string[]
    createdAt: Date
    updatedAt: Date
}

type Objective = {
    uid: string
    mission: string
    title: string
    description?: string
    due?: Date
    labels?: string[]
    priority?: string
    difficulty?: string
    tasks?: Task[]
    users?: string[]
    comments?: Comment[]
    createdAt: Date
    updatedAt: Date
}

type Task = {
    label: string
    checked: boolean
}

type Comment = {
    user: string
    body: string
    createdAt: Date
    updatedAt: Date
}
