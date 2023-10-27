import { Navigate, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './layouts/Layout'
import Campaign from './pages/Campaign'
import Campaigns from './pages/Campaigns'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import Register from './pages/auth/Register'

function App() {

	console.log(`App rendered`)

	return (
		<AppProvider>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="logout" element={<Logout />} />
					<Route path="register" element={<Register />} />
					<Route element={<Layout />}>
						<Route path="c">
							<Route index element={<Navigate to="/" replace />} />
							<Route path=":id" element={<Campaign />} />
						</Route>
						<Route path="u">
							<Route index element={<Navigate to="/" replace />} />
							<Route path=":id">
								<Route index element={<Profile />} />
								<Route path="campaigns" element={<Campaigns />} />
							</Route>
						</Route>
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</AppProvider>
	)
}

export default App
