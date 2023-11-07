import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// Point 1: load the authenticated user
	const { isAuthenticated, isLoading } = useUser();

	// Point 3: If there is NO authenticated user, redirect to the "/login" page
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		[isAuthenticated, isLoading, navigate],
	);

	// Point 2: while loading , show a spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// Point 4: if there IS a authenticated user, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
