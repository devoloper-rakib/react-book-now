import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from '../cabins/useCreateCabin';
import { useUpdateCabin } from '../cabins/useUpdateCabin';

function CreateBookingForm({ cabinToUpdate = {}, onCloseModal }) {
	// point : for creating a new cabin object({})
	const { createCabin, isCreating } = useCreateCabin();
	const { updateCabin, isUpdating } = useUpdateCabin();

	const { id: updatedId, ...updateValues } = cabinToUpdate;

	const isUpdateSession = Boolean(updatedId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isUpdateSession ? updateValues : {},
	});

	const { errors } = formState;

	// Point: for loading variable
	const isWorking = isCreating || isUpdating;

	// Point: handle Submit for creating form
	function onSubmit(data) {
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		if (isUpdateSession)
			updateCabin(
				{ newCabinData: { ...data, image }, id: updatedId },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				},
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				},
			);
	}

	// error form error
	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label='Cabin Name' error={errors?.name?.message}>
				<Input
					disabled={isWorking}
					type='text'
					id='name'
					{...register('name', {
						required: 'This filed is required',
					})}
				/>
			</FormRow>

			<FormRow label='maximum Capacity' error={errors?.maxCapacity?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='maxCapacity'
					{...register('maxCapacity', {
						required: 'This filed is required',
						min: {
							value: 1,
							message: 'Capacity Should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular Price' error={errors?.regularPrice?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='regularPrice'
					{...register('regularPrice', {
						required: 'This filed is required',
						min: {
							value: 1,
							message: 'regular Price should be at list 1',
						},
						// error max :{} in the supabase i have given 4digit integer how do i handle this data if the price is higher than that
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					disabled={isWorking}
					type='tel'
					id='discount'
					defaultValue={0}
					{...register('discount', {
						required: 'this filed is required',
					})}
				/>
			</FormRow>

			<FormRow label='observations' error={errors?.observations?.message}>
				<Textarea
					disabled={isWorking}
					type='text'
					id='observations'
					defaultValue=''
					{...register('observations')}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					onClick={() => onCloseModal?.()}
					variation='secondary'
					type='reset'
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isUpdateSession ? 'Update Cabin' : 'Create new Cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateBookingForm;
