import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';

import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resourceName='cabins' />;

	// Point : filter value
	const filterValue = searchParams.get('discount') || 'all';

	/*
	let filteredCabins;

	if (filterValue === 'all') filteredCabins = cabins;

	if (filterValue === 'no-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === 'with-discount')
		filteredCabins = cabins.filter((cabin) => cabin.
		discount > 0);

	*/

	const filteredCabins =
		filterValue === 'all'
			? cabins
			: filterValue === 'no-discount'
			? cabins.filter((cabin) => cabin.discount === 0)
			: filterValue === 'with-discount'
			? cabins.filter((cabin) => cabin.discount > 0)
			: cabins;

	// Point : Sort
	const sortBy = searchParams.get('sortBy') || 'startDate-asc';
	const [filed, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredCabins.sort(
		(a, b) => (a[filed] - b[filed]) * modifier,
	);

	return (
		<Menus>
			{/* <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'> */}
			<Table columns='1fr 1.8fr 2.2fr 1fr 1fr 0.2fr'>
				<Table.Header role='row'>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data={cabins}
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
