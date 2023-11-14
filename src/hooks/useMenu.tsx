import { useState } from 'react'

interface Menu {
	menu: Record<string, () => void> | null
	openMenu: () => void
	closeMenu: () => void
}

const useMenu = (options: Record<string, () => void>): Menu => {

	const [menu, setMenu] = useState<Record<string, () => void> | null>(null)

    const openMenu = () => setMenu(options)
    const closeMenu = () => setMenu(null)

	return { menu, openMenu, closeMenu }
}

export default useMenu