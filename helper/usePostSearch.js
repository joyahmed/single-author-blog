import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usePostSearch = (query, pageNumber) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		() => async () => {
			const { data } = await axios({
				method: 'GET',
				url: 'api/posts',
				params: { q: query, page: pageNumber },
				cancelToken: new axios.CancelToken(c => (cancel = c))
			})
				.then(res => {
					setPosts(prevPosts => {
						return [...new Set([
							...prevPosts,
							res.data.docs.map(p => p.title)
						])];
					});
					console.log(res.data);
				})
				.catch(e => {
					if (axios.isCancel(e)) return;
				});
			return () => cancel();
		};
	}, [query, pageNumber]);

	return null;
};

export default usePostSearch;
