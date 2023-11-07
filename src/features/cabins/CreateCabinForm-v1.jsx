import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;

	const queryClient = useQueryClient();

	const { mutate, isLoading: isCreating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('cabin created successfully');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });

			// / for resiting the from
			reset();
		},
		onError: (err) => toast.error(err.message),
	});
	// Point: handle Submit for creating form
	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}

	// form error'
	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Cabin Name' error={errors?.name?.message}>
				<Input
					disabled={isCreating}
					type='text'
					id='name'
					{...register('name', {
						required: 'This filed is required',
					})}
				/>
			</FormRow>

			<FormRow label='maximum Capacity' error={errors?.maxCapacity?.message}>
				<Input
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
					id='image'
					accept='image/*'
					// type='file' this will be automatically created
					{...register('image', {
						required: 'This file is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
