import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useCabins } from '../cabins/useCabins';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookngs';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoading: isLoadingStatistics, bookings } = useRecentBookings();
	const { confirmStays, isLoading: isLoadingStays, numDays } = useRecentStays();
	const { cabins, isLoading: isCabinLoading } = useCabins();

	if (isLoadingStatistics || isLoadingStays || isCabinLoading)
		return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmStays={confirmStays}
				numDays={numDays}
				cabinCount={cabins.length}
			></Stats>
			<TodayActivity />
			<DurationChart confirmStays={confirmStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
