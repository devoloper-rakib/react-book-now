import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
	overflow: scroll;
`;

const StyledAppLayout = styled.div`
	display: grid;
	height: 100vh;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	max-width: 120rem;
	margin 0 auto;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
