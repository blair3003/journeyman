type FirebaseUser = import('firebase/auth').User

type User = {
    id: string
    uid?: string
    username: string
    email: string
    displayName: string
    displayPic?: string
    roles?: string[]
}

type Campaign = {
    id: string
    title: string
    users?: string[]
    missions?: string[]
    createdAt: Date
    updatedAt: Date
}

type Mission = {
    id: string
    campaign: string
    title: string
    description?: string
    order: number
    createdAt: Date
    updatedAt: Date
}

type Objective = {
    id: string
    mission: string
    title: string
    description?: string
    due?: Date
    labels?: string[]
    priority?: string
    difficulty?: string
    tasks?: Task[]
    users?: string[]
    messages?: Message[]
    createdAt: Date
    updatedAt: Date
}

type Task = {
    label: string
    checked: boolean
}

type Message = {
    user: string
    body: string
    createdAt: Date
    updatedAt: Date
}
