import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi2'
import useMenu from '../../../hooks/useMenu'
import PartyMenu from './PartyMenu'
import PartyUser from './PartyUser'
import { useDataContext } from '../../../context/DataContext'

interface PartyProps {
	defaultValues?: string[]
	setValue: (name: string, value: unknown, config?: Object) => void
	errors: FieldErrors
	isDarkMode?: boolean
}

const Party = ({ defaultValues = [], setValue, errors, isDarkMode = false }: PartyProps) => {
	
	const [party, setParty] = useState(defaultValues)
    const { users } = useDataContext()

    const updateParty = (newParty: string[]) => {
        setParty(newParty)
        setValue('users', newParty)
    }

	const addUser = (newUser: string) => {
		if (!party.includes(newUser)) {
			updateParty([...party, newUser])
		}
	}

	const removeUser = (oldUser: string) => {
		updateParty(party.filter(user => user !== oldUser))
	}

	const { menu, openMenu, closeMenu } = useMenu(
		users.reduce((menu: Record<string, () => void>, user) => {
			menu[user.uid] = () => addUser(user.uid)
			return menu
		}, {})
	)

	return (
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center">
				<span className="grow text-sm uppercase font-bold text-slate-500 cursor-pointer pb-1">Party</span>
				{errors.users && <span className="text-red-500 uppercase font-bold text-sm">{errors.users?.message?.toString()}</span>}
			</div>
			<div className="flex justify-between items-center">
				<div className="flex justify-start items-center">
					{party.map(partyUser => {
                        const user = users.find(user => user.uid === partyUser)
                        if (!user) return null
                        return <PartyUser key={user.uid} user={user} onRemove={removeUser} />
                    })}
				</div>
				<div className="relative">
					<button onClick={openMenu} className="flex items-center">
						<span className="sr-only">Add Label</span>
                        <HiPlus />
					</button>
					<PartyMenu menu={menu} users={users} onClose={closeMenu} />
				</div>
			</div>
		</div>
	)
}

export default Party
