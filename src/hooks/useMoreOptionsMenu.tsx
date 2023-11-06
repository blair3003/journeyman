import { useState } from 'react'
import MoreOptionsMenu from '../components/MoreOptionsMenu'

interface MoreOptionsMenu {
	menu: JSX.Element | null,
	openMenu: (e: any) => void
}

const useMoreOptionsMenu = (options: Record<string, () => void>): MoreOptionsMenu => {

	const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsMenuOpen(true)
    }

    const closeMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsMenuOpen(false)
    }

	const menu = isMenuOpen ? <MoreOptionsMenu handleClose={closeMenu} options={options} /> : null

	return {
		menu,
		openMenu
	}
}

export default useMoreOptionsMenu