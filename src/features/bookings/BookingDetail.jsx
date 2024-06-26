import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import { useMoveBack } from '../../hooks/useMoveBack';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '../../ui/Empty';
import { useCheckout } from '../check-in-out/useCheckout';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const { checkout, isCheckingOut } = useCheckout();
	const { isDeleting, deleteBooking } = useDeleteBooking();
	const moveBack = useMoveBack();
	let navigate = useNavigate();

	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resourceName='booking' />;

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>Booking #{bookingId} </Heading>
					<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === 'unconfirmed' && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check In{' '}
					</Button>
				)}

				{status === 'checked-in' ? (
					<Button
						icon={<HiArrowUpOnSquare />}
						onClick={() => {
							checkout(bookingId);
							navigate('/bookings?status=checked-out'); // todo : we can remove this when we don't want to redirect back bookings page
						}}
						disabled={isCheckingOut}
					>
						Check Out
					</Button>
				) : null}

				<Modal>
					<Modal.Open opens='delete'>
						<Button variation='danger'>Delete Booking</Button>
					</Modal.Open>
					<Modal.Window name='delete'>
						<ConfirmDelete
							disabled={isDeleting}
							resourceName='booking'
							onConfirm={() =>
								deleteBooking(bookingId, {
									// Point: on settled will always happen on error or working properly
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>

				<Button variation='secondary' onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
