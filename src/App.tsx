import { Navigate, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './layouts/Layout'
import Auth from './layers/Auth'
import Data from './layers/Data'
import RequireAuth from './layers/RequireAuth'
import Campaign from './pages/campaign/Campaign'
import Campaigns from './pages/campaigns/Campaigns'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Logout from './pages/logout/Logout'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'

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
