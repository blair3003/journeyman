import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore'
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