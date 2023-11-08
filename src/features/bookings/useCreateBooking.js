import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createBooking as createBookingApi } from '../../services/apiBookings';

export function useCreateBooking() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createBooking } = useMutation({
		mutationFn: createBookingApi,
		onSuccess: (data) => {
			toast.success('Booking successfully created');
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createBooking };
}
