interface ProfilePicProps {
    photoURL?: string
    displayName: string
}

const ProfilePic = ({ photoURL, displayName }: ProfilePicProps) => {

    return (
        <div className="w-8 h-8 rounded-full shrink-0 grid place-content-center bg-blue-800 shadow-xl border-2 border-slate-300 overflow-hidden">
            {photoURL
                ? <img src={photoURL} alt={displayName} />
                : <div className="text-base text-white">{displayName[0].toUpperCase()}</div>
            }
        </div>
    )
}

export default ProfilePic