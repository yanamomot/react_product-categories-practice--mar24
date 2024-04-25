import classNames from 'classnames';

export const Filter = ({
  usersFromServer,
  categoriesFromServer,
  userId,
  categoryById,
  query,
  setUserId,
  setCategoryById,
  setQuery,
}) => {
  const Add = categoryId => {
    setCategoryById(current => [...current, categoryId]);
  };

  const Remove = categoryId => {
    setCategoryById(current => current.filter(cur => cur !== categoryId));
  };

  const Clear = () => {
    setUserId(0);
    setCategoryById([]);
    setQuery('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          onClick={() => setUserId(0)}
          className={classNames({
            'is-active': userId === 0,
          })}
          data-cy="FilterAllUsers"
          href="#/"
        >
          All
        </a>

        {usersFromServer.map(user => (
          <a
            onClick={() => setUserId(user.id)}
            className={classNames({
              'is-active': user.id === userId,
            })}
            key={user.id}
            data-cy="FilterUser"
            href="#/"
          >
            {user.name}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {query && (
            <span className="icon is-right">
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          className={classNames('button is-success mr-6', {
            'is-outlined': categoryById.length > 0,
          })}
          onClick={() => setCategoryById([])}
          href="#/"
          data-cy="AllCategories"
        >
          All
        </a>

        {categoriesFromServer.map(category =>
          categoryById.includes(category.id) ? (
            <a
              onClick={() => Remove(category.id)}
              key={category.id}
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              {category.title}
            </a>
          ) : (
            <a
              onClick={() => Add(category.id)}
              key={category.id}
              data-cy="Category"
              className="button mr-2 my-1"
              href="#/"
            >
              {category.title}
            </a>
          ),
        )}
      </div>

      <div className="panel-block">
        <a
          onClick={Clear}
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
