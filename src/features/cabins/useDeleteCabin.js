import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';

export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		// mutationFn: (id) => deleteCabin(id),
		mutationFn: deleteCabinAPI,

		onSuccess: () => {
			toast.success('cabin deleted successfully');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},

		onError: (error) => toast.error(error.message),
	});

	return { isDeleting, deleteCabin };
}
