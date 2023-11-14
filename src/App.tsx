import { Navigate, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './layouts/Layout'
import Campaign from './pages/Campaign'
import Campaigns from './pages/Campaigns'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Auth from './layouts/Auth'
import RequireAuth from './layouts/RequireAuth'
import Data from './layouts/Data'

function App() {

	return (
		<AppProvider>
			<Routes>
				<Route path="/" element={<Auth />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="logout" element={<Logout />} />
					<Route path="register" element={<Register />} />

					<Route element={<RequireAuth />}>
						<Route element={<Data />}>
							<Route element={<Layout />}>
								<Route path="c">
									<Route index element={<Navigate to="/" replace />} />
									<Route path=":campaignId" element={<Campaign />} />
								</Route>
								<Route path="u">
									<Route index element={<Navigate to="/" replace />} />
									<Route path=":userId">
										<Route index element={<Profile />} />
										<Route path="campaigns" element={<Campaigns />} />
									</Route>
								</Route>
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
