import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';

export function useUpdateBooking() {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateBooking } = useMutation({
		mutationFn: updateBookingApi,
		onSuccess: (data) => {
			toast.success('Booking successfully updated');
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateBooking };
}
