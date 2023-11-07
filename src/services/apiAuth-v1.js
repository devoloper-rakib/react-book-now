import supabase, { supabaseUrl } from './supabase';

// Point :  For Sign up user
export async function signUp({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});

	if (error) throw new Error(error.message);
	return data;
}

// Point: for login
export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

// Point: getting current user from queries database
export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message || error);
	return data?.user;
}

// Point: for logOut
export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updatedCurrentUser({ password, fullName, avatar }) {
	// Point: 1 Updated Password or Full Name
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } }; // just like sign up formatting

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message || error);

	// Point : 2 Upload the avatar image
	const fileName = `avatar-${data.user.id}-${Math.random() * 1000000 + 1}`;

	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	// Point : 3 update avatar in the user;

	const { data: updatedUser, error: updatedError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		});

	if (updatedError) throw new Error(updatedError.message);

	return updatedUser;
}
