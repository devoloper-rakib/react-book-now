import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/Constants';

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// Point: FILTER
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };
	// {field: 'totalPrice , value: 5000 , method: 'gte}

	// POINT: SORT BY
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	// POINT: PAGINATION
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Point: PRE_FETCHING_
	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount)
		queryClient.prefetchInfiniteQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, bookings, error, count };
}
