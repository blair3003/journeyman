type Campaign = {
    id: string
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
    options?: {
        label: string
        value: string
    }
    default?: string
    required?: boolean
}

type Mission = {
    id: string
    campaign: string
    title: string
    description: string
    users: string[]
    labels: string[]
    metaboxes: string[]
    attachments: Attachment[]
    comments: Comment[]
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

type User = {
    id: string
    username: string
    email: string
    displayName: string
    roles: string[]
    createdAt: Date
    updatedAt: Date
}
