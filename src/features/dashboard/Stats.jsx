import Stat from './Stat';

import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmStays, numDays, cabinCount }) {
	// Point 1 : number of bookings
	const numBookings = bookings.length;

	// Point 2 : total Sales
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	// Point 3 : Total checkIns
	const checkIns = confirmStays.length;

	// Point 4 : Occupations rate ( num of checked in nights / all available nights )
	/// num of checked inn nights / all available nights ( num days * num of cabins)
	const occupation =
		confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				title='bookings'
				color='blue'
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title='sales'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="check in's "
				color='indigo'
				icon={<HiOutlineCalendarDays />}
				value={checkIns}
			/>
			<Stat
				title='Occupancy rate'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + '%'}
			/>
		</>
	);
}

export default Stats;
