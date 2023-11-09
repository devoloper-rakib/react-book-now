import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';

import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';

import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';
import Guests from './pages/Guests';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 1000 * 60 * 1, // 1 minutes
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								// this is a protect route for authorization users
								<ProtectedRoute>
									{/* // Point: Main App layout route */}

									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to='dashboard' />} />

							<Route path='dashboard' element={<Dashboard />} />
							<Route path='account' element={<Account />} />

							{/* bookings page in dashboard */}
							<Route path='bookings' element={<Bookings />} />
							{/* single page booking */}
							<Route path='bookings/:bookingId' element={<Booking />} />
							{/* Single Page Checkin page */}
							<Route path='/checkin/:bookingId' element={<Checkin />} />

							<Route path='cabins' element={<Cabins />} />
							<Route path='guests' element={<Guests />} />
							<Route path='settings' element={<Settings />} />
							<Route path='users' element={<Users />} />
						</Route>

						<Route path='login' element={<Login />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position='top-right'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							backGroundColor: 'var(--color-grey-0)',
							color: 'var(--color-grey-700',
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
