import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateBooking } from '../bookings/useCreateBooking'; // Import your create booking hook

function CreateBookingForm({ bookingToUpdate = {}, onCloseModal }) {
	const { createBooking, isCreating } = useCreateBooking();

	const { id: updatedId, ...updateValues } = bookingToUpdate;

	const isUpdateSession = Boolean(updatedId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isUpdateSession ? updateValues : {},
	});

	let updateBooking;

	const { errors } = formState;

	const isWorking = isCreating;

	function onSubmit(data) {
		console.log(data);
		if (isUpdateSession) {
			// Update an existing booking
			updateBooking(updatedId, {
				...data,
			});

			reset();
			onCloseModal?.();
		} else {
			// Create a new booking
			createBooking({
				...data,
			});

			// reset();
			// onCloseModal?.();
		}
	}

	function onError(errors) {}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label='Start Date' error={errors?.startDate?.message}>
				<Input
					disabled={isWorking}
					type='date'
					id='startDate'
					{...register('startDate', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='End Date' error={errors?.endDate?.message}>
				<Input
					disabled={isWorking}
					type='date'
					id='endDate'
					{...register('endDate', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Cabin ID' error={errors?.cabinId?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='cabinId'
					{...register('cabinId', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Cabin ID should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Guest ID' error={errors?.guestId?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='guestId'
					{...register('guestId', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Guest ID should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Has Breakfast' error={errors?.hasBreakfast?.message}>
				<input
					disabled={isWorking}
					type='checkbox'
					id='hasBreakfast'
					{...register('hasBreakfast', {})}
				/>
			</FormRow>

			<FormRow label='Observations' error={errors?.observations?.message}>
				<Textarea
					disabled={isWorking}
					type='text'
					id='observations'
					{...register('observations', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Is Paid' error={errors?.isPaid?.message}>
				<input
					disabled={isWorking}
					type='checkbox'
					id='isPaid'
					{...register('isPaid', {})}
				/>
			</FormRow>

			<FormRow label='Number of Guests' error={errors?.numGuests?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='numGuests'
					{...register('numGuests', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Number of guests should be at least 1',
						},
					})}
				/>
			</FormRow>

			{/* Include other existing form fields as well in the form */}
			{/* ... (other fields) ... */}

			<FormRow>
				<Button
					onClick={() => onCloseModal?.()}
					variation='secondary'
					type='reset'
				>
					Cancel
				</Button>
				<Button disabled={isWorking} type='submit'>
					{isUpdateSession ? 'Update Booking' : 'Create Booking'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateBookingForm;
