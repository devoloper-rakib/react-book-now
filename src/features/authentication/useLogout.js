import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries(); // to remove all the queries on react queries cache
			toast.success('logged out');
			navigate('/login', { replace: true });
		},
		onError: (err) => {
			toast.error('something went wrong :(', err);
			console.error('Something went wrong :(', err);
		},
	});
	return { logout, isLoading };
}
