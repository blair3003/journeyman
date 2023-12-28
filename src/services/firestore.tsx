import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

export const userCollectionRef = collection(db, 'users')
export const campaignCollectionRef = collection(db, 'campaigns')
export const missionCollectionRef = collection(db, 'missions')
export const objectiveCollectionRef = collection(db, 'objectives')

export const createUserDoc = async (authUser: FirebaseUser) => {    
    try {
        const q = query(userCollectionRef, where('uid', '==', authUser.uid))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.size > 0) return querySnapshot.docs[0].id        
        const newUserDocRef = doc(userCollectionRef)
        await setDoc(newUserDocRef, {
            uid: authUser.uid,
            username: authUser.email?.split('@')[0],
            email: authUser.email,
            displayPic: authUser.photoURL,
            displayName: authUser.displayName ?? authUser.email?.split('@')[0]
        })
        return newUserDocRef.id
    } catch (error) {
        console.error(error)
    }
}

export const createCampaignDoc = async (title: string, userId: string) => {
    try {
        const newCampaignDocRef = doc(campaignCollectionRef)
        const userDocRef = doc(userCollectionRef, userId)
        await setDoc(newCampaignDocRef, { title, users: [userDocRef] })        
        return { title, users: [userDocRef.id], id: newCampaignDocRef.id } as Campaign
    } catch (error) {
        console.error(error)
    }
}

export const createMissionDoc = async (title: string, campaignId: string, order: number) => {
    try {
        const newMissionDocRef = doc(missionCollectionRef)
        const campaignDocRef = doc(campaignCollectionRef, campaignId)
        await setDoc(newMissionDocRef, { title, campaign: campaignDocRef, order })    
        await updateDoc(campaignDocRef, { missions: arrayUnion(newMissionDocRef) })        
        return { title, campaign: campaignId, order, id: newMissionDocRef.id } as Mission
    } catch (error) {
        console.error(error)
    }
}

export const createObjectiveDoc = async (title: string, missionId: string) => {
    try {
        const newObjectiveDocRef = doc(objectiveCollectionRef)
        const missionDocRef = doc(missionCollectionRef, missionId)
        const timestamp = serverTimestamp()
        const clientTimestamp = new Date()
        await setDoc(newObjectiveDocRef, { title, mission: missionDocRef, createdAt: timestamp, updatedAt: timestamp })    
        await updateDoc(missionDocRef, { objectives: arrayUnion(newObjectiveDocRef) })        
        return { title, mission: missionId, id: newObjectiveDocRef.id, createdAt: clientTimestamp, updatedAt: clientTimestamp } as Objective
    } catch (error) {
        console.error(error)
    }
}

export const getUsers = async () => {
    try {
        const data = await getDocs(userCollectionRef)
        return data.docs.map(doc => ({id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error(error)
    }
}

export const getCampaigns = async () => {
    try {
        const data = await getDocs(campaignCollectionRef)
        return data.docs.map(doc => {
            const { users, missions, ...rest } = doc.data()
            return {
                id: doc.id,
                users: users?.map((user: { id: string }) => user.id),
                missions: missions?.map((mission: { id: string }) => mission.id),
                ...rest
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const getMissions = async () => {
    try {
        const data = await getDocs(missionCollectionRef)
        return data.docs.map(doc => {
            const { campaign, objectives, ...rest } = doc.data()
            return {
                id: doc.id,
                campaign: campaign.id,
                objectives: objectives?.map((objective: { id: string }) => objective.id),
                ...rest
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const getObjectives = async () => {
    try {
        const data = await getDocs(objectiveCollectionRef)
        return data.docs.map(doc => {
            const { users, mission, messages, createdAt, updatedAt, ...rest } = doc.data()
            return {
                id: doc.id,
                users: users?.map((user: { id: string }) => user.id),
                mission: mission.id,
                messages: messages?.map((message: { user: { id: string }, createdAt: Timestamp, updatedAt: Timestamp }) => {
                    return {
                        ...message,
                        user: message.user.id,
                        createdAt: createdAt.toDate(),
                        updatedAt: updatedAt.toDate()
                    }
                }),
                createdAt: createdAt.toDate(),
                updatedAt: updatedAt.toDate(),
                ...rest
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const updateCampaignDoc = async (campaign: Campaign, data: { title?: string }) => {
    try {
        const campaignDocRef = doc(campaignCollectionRef, campaign.id)
        await updateDoc(campaignDocRef, { ...data })
        return { ...campaign, ...data } as Campaign
    } catch (error) {
        console.error(error)
    }
}

export const updateMissionDoc = async (mission: Mission, data: { title?: string, description?: string }) => {
    try {
        const missionDocRef = doc(missionCollectionRef, mission.id)
        await updateDoc(missionDocRef, { ...data } )
        return { ...mission, ...data } as Mission
    } catch (error) {
        console.error(error)
    }
}