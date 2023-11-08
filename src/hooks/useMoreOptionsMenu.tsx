import { useState } from 'react'

interface MoreOptionsMenu {
	menu: Record<string, () => void> | null
	openMenu: () => void
	closeMenu: () => void
}

const useMoreOptionsMenu = (options: Record<string, () => void>): MoreOptionsMenu => {

	const [menu, setMenu] = useState<Record<string, () => void> | null>(null)

    const openMenu = () => setMenu(options)
    const closeMenu = () => setMenu(null)

	return { menu, openMenu, closeMenu }
}

export default useMoreOptionsMenu