import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { signUp as signUpApi } from '../../services/apiAuth';

export function useSignUp() {
	const { mutate: signUp, isLoading } = useMutation({
		mutationFn: signUpApi,
		onSuccess: (user) => {
			const firstName =
				user?.user?.user_metadata?.fullName.split(' ')[0] || '👻';
			toast.success(
				`account successfully create! please verify the new account from the ${firstName}'s email address`,
			);
		},
		onError: (err) => {
			toast.error('account failed to create', err.message);
		},
	});
	return { signUp, isLoading };
}
