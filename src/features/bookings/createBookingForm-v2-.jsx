import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateBooking } from './useCreateBooking';
import { useUpdateBooking } from './useUpdateBooking';

function CreateBookingForm({ bookingToUpdate = {}, onCloseModal }) {
	const { createBooking, isCreating } = useCreateBooking();
	const { isUpdating, updateBooking } = useUpdateBooking();
	const { id: updatedId, ...updateValues } = bookingToUpdate;

	const isUpdateSession = Boolean(updatedId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isUpdateSession ? updateValues : {},
	});

	const { errors } = formState;

	const isWorking = isCreating || isUpdating;

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

	function onError(errors) {
		console.log(errors);
	}

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

			<FormRow label='Number of Nights' error={errors?.numNights?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='numNights'
					{...register('numNights', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Number of nights should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Cabin Price' error={errors?.guestId?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='cabinPrice'
					{...register('cabinPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Cabin Price should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Extra Price' error={errors?.guestId?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='extraPrice'
					{...register('extraPrice', {})}
				/>
			</FormRow>

			<FormRow label='Has Breakfast' errors={errors?.hasBreakfast?.message}>
				<input
					disabled={isWorking}
					type='checkbox'
					id='hasBreakfast'
					{...register('hasBreakfast')}
					defaultChecked={getValues('hasBreakfast')}
				/>
			</FormRow>

			{/* // point: will be dynamically generated on supabase 

			<FormRow label='Created At' error={errors?.created_at?.message}>
				<Input
					disabled={isWorking}
					type='date'
					id='created_at'
					{...register('created_at', {
						required: 'This field is required',
					})}
				/>
			</FormRow> */}

			<FormRow label='Observations' error={errors?.observations?.message}>
				<Textarea
					disabled={isWorking}
					type='text'
					id='observations'
					{...register('observations', {})}
				/>
			</FormRow>

			<FormRow label='Is Paid' errors={errors?.isPaid?.message}>
				<input
					disabled={isWorking}
					type='checkbox'
					id='isPaid'
					{...register('isPaid')}
					defaultChecked={getValues('isPaid')}
				/>
			</FormRow>

			<FormRow label='status' errors={errors?.isPaid?.message}>
				<input
					disabled={isWorking}
					type='text'
					id='status'
					{...register('status')}
				/>
			</FormRow>

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
