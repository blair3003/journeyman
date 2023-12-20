import { CSSProperties } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

interface LoaderProps {
	color?: string
	loading?: boolean
	size?: number
	cssOverride?: CSSProperties
}

const Loader = ({ color = '#FFF', loading = true, size = 48, cssOverride }: LoaderProps) => {

	return (
		<ClipLoader
	        color={color}
	        loading={loading}
	        size={size}
	        cssOverride={cssOverride}
	        aria-label="Loading Spinner"
	    />
	)
}

export default Loader