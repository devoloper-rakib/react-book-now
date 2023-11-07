import supabase, { supabaseUrl } from './supabase';

// Point: 1 Get all the cabins data
export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded ;(');
	}

	return data;
}

// Point: 2 delete a cabin data
export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('cabin could not be deleted :(');
	}
	return data;
}

// Point: 3 added a cabin to the database or updated it.
export async function createUpdateCabin(newCabin, id) {
	/// check what kind of image is being uploaded to
	const hasImagePath = await newCabin?.image?.startsWith?.(supabaseUrl);

	const imageName = await `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		'',
	);

	const imagePath = hasImagePath
		? newCabin?.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// const imageName = newCabin.image.name
	// 	.replace(/[^\w\s.-]/g, '') // Remove special characters
	// 	.replace(/\s+/g, '-') // Replace spaces with hyphens
	// 	.toLowerCase(); // Convert to lowercase

	// const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// https://dndinujwqjbioocdndga.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

	// Point 3.1: Create/Update  a cabin
	let query = supabase.from('cabins');

	// point 3.2 create
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// 	Point : 3.3 Update
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('cabin could not be created :(');
	}

	// Point : upload the image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// Point: 3 delete the cabin if there was an error uploading the image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.log(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created.',
		);
	}

	return data;
}
