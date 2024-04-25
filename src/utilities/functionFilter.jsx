export const getFilteredCategories = (
  products,
  { userId, categoryById, sortBy, reverseMethod, query },
) => {
  let sortedGoodProducts = [...products];

  if (userId) {
    sortedGoodProducts = sortedGoodProducts.filter(
      curr => curr.user.id === userId,
    );
  }

  if (categoryById.length !== 0) {
    sortedGoodProducts = sortedGoodProducts.filter(curr =>
      categoryById.includes(curr.categoryId),
    );
  }

  if (query) {
    const normalQuery = query.trim().toLowerCase();

    sortedGoodProducts = sortedGoodProducts.filter(curr => {
      const normalName = curr.name.trim().toLowerCase();

      return normalName.includes(normalQuery);
    });
  }

  if (sortBy) {
    sortedGoodProducts.sort((a, b) => {
      switch (sortBy) {
        case 'ID':
          return a.id - b.id;
        case 'Product':
          return a.name.localeCompare(b.name);
        case 'User':
          return a.user.name.localeCompare(b.user.name);
        case 'Category':
          return a.category.title.localeCompare(b.category.title);
        default:
          return 0;
      }
    });
  }

  if (reverseMethod) {
    sortedGoodProducts.reverse();
  }

  return sortedGoodProducts;
};
