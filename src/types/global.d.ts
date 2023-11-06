type FirebaseUser = import('firebase/auth').User

type User = {
    uid: string
    username: string
    email: string
    displayName: string
    image?: string
    roles?: string[]
    createdAt: Date
}

type Campaign = {
    uid: string
    title: string
    users?: string[]
    missions?: string[]
    labels?: Label[]
    metaboxes?: Metabox[]
    createdAt: Date
    updatedAt: Date
}

type Label = {
    id: string
    title: string
    color: {
        name: string
        value: string
    }
}

type Metabox = {
    id: string
    title: string
    type: 'checkbox' | 'date' | 'radio' | 'select'
    options?: string[]
    default?: any
    required?: boolean
}

type Mission = {
    id: string
    campaign: string
    title: string
    description?: string
    objectives?: string[]
    labels?: string[]
    createdAt: Date
    updatedAt: Date
}

type Objective = {
    id: string
    mission: string
    title: string
    description?: string
    users?: string[]
    labels?: string[]
    metaboxes?: [{
        id: string
        value: any
    }]
    attachments?: Attachment[]
    comments?: Comment[]
    createdAt: Date
    updatedAt: Date
}

type Attachment = {
    path: string
    name: string
    mime: string
    size: string
    thumbnail?: string
    user: string
    createdAt: Date
}

type Comment = {
    id: string
    user: string
    body: string
    parent?: string
    createdAt: Date
    updatedAt: Date
}
