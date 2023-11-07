import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createUpdateCabin } from '../../services/apiCabins';

export function useCreateCabin() {
	const queryClient = useQueryClient();
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		mutationFn: createUpdateCabin,
		onSuccess: () => {
			toast.success('cabin created successfully');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { createCabin, isCreating };
}
