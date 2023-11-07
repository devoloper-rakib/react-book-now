import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
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
						// custom validate react-form-hook
						// validate: (value) =>
						// 	value <= getValues()?.regularPrice ||
						// 	'Discount should be less than regular Price',

						validate: (value) => {
							const numericValue = Number(value);
							return numericValue >= 0 &&
								numericValue <= getValues('regularPrice')
								? true
								: 'Discount should be a valid number and less than or equal to the regular price';
						},
					})}
					// onBlur={(e) => {
					// 	if (e.target.value === '0') {
					// 		e.target.value = ''; // Remove the leading zero
					// 	}
					// }}

					onFocus={(e) => {
						e.target.select(); // Select the input's value
					}}
				/>
			</FormRow>

			<FormRow
				label='Description for the cabin '
				error={errors?.description?.message}
			>
				<Textarea
					disabled={isWorking}
					type='text'
					id='description'
					defaultValue=''
					{...register('description', {
						required: 'This filed is required',
					})}
				/>
			</FormRow>

			{/* // Point: photo upload  */}
			<FormRow label='Cabin Photo' error={errors?.image?.message}>
				<FileInput
					disabled={isWorking}
					id='image'
					accept='image/*'
					// type='file' this will be automatically created
					{...register('image', {
						required: isUpdateSession ? false : 'This file is required',
					})}
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

export default CreateCabinForm;
