export function getUniqueCategories(posts) {
	const uniqueCategories = [
		...new Set(posts.map(post => post.category))
	];

	return uniqueCategories;
}
