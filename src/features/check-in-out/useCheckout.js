import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

export function useCheckout() {
	const queryClient = useQueryClient();

	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),
		onSuccess: (data) => {
			toast.success(`booking ${data.id} successfully checked Out `);
			queryClient.invalidateQueries({ active: true }); // invalided all the active queries
		},
		onError: (data) =>
			toast.error(`there was an error while checking in ${data.id} `),
	});
	return { checkout, isCheckingOut };
}
