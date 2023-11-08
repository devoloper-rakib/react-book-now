// POINT: THIS IS A SINGLE PAGE BOOKING COMPONENT CONNECTED WITH BOOKING DETAILS ......................

import AddBooking from '../features/bookings/addBooking';
import BookingDetail from '../features/bookings/BookingDetail';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Booking() {
	return (
		<>
			<Row>
				<Heading as='h1'>this is a heading</Heading>
				<BookingDetail />;
			</Row>
			<Row>
				<AddBooking />
			</Row>
		</>
	);
}

export default Booking;
