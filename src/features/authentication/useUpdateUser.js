import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updatedCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updatedCurrentUser,
		onSuccess: ({ user }) => {
			toast.success('User Account Updated Successfully');
			// queryClient.invalidateQueries({
			// 	queryKey: ['user'],
			// });
			queryClient.setQueryData(['user'], user);
		},
		onError: (err) => toast.error(err.message || 'User Account Invalid'),
	});

	return { updateUser, isUpdating };
}
