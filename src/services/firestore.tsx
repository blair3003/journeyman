import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../config/firebase'

export const createUserDoc = async (authUser: FirebaseUser) => {

    const userCollectionRef = collection(db, 'users')
    
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
    const campaignCollectionRef = collection(db, 'campaigns')
    const userCollectionRef = collection(db, 'users')

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
    const missionCollectionRef = collection(db, 'missions')
    const campaignCollectionRef = collection(db, 'campaigns')

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