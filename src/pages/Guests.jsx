import CreateGuestForm from '../features/guests/CreateGuestForm';
import GuestList from '../features/guests/GuestList';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Guests() {
	return (
		<>
			<Row>
				<Heading as='h1'>All Guest List</Heading>
			</Row>

			<Row>
				<GuestList />
			</Row>
		</>
	);
}

export default Guests;
