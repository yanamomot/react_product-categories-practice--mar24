/* eslint-disable jsx-a11y/accessible-emoji */
import classNames from 'classnames';
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { getFilteredCategories } from './utilities/functionFilter';
import { Filter } from './utilities/Filter/Filter';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    currCategory => currCategory.id === product.categoryId,
  );
  const user = usersFromServer.find(
    currUser => currUser.id === category.ownerId,
  );

  return { ...product, category, user };
});

export const App = () => {
  const [categoryById, setCategoryById] = useState([]);
  const [userId, setUserId] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [reverseMethod, setReverseMethod] = useState(false);
  const [query, setQuery] = useState('');

  const sortedGoodProducts = getFilteredCategories(products, {
    userId,
    categoryById,
    sortBy,
    reverseMethod,
    query,
  });

  const Sort = value => {
    if (sortBy !== value) {
      setReverseMethod(false);
      setSortBy(value);

      return;
    }

    if (!reverseMethod && sortBy === value) {
      setReverseMethod(true);

      return;
    }

    setReverseMethod(false);
    setSortBy('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filter
            usersFromServer={usersFromServer}
            categoriesFromServer={categoriesFromServer}
            userId={userId}
            categoryById={categoryById}
            query={query}
            setUserId={setUserId}
            setCategoryById={setCategoryById}
            setQuery={setQuery}
          />
        </div>

        <div className="box table-container">
          {sortedGoodProducts.length > 0 ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {['ID', 'Product', 'Category', 'User'].map(currArea => (
                    <th key={currArea}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {currArea}
                        <a href="#/" onClick={() => Sort(currArea)}>
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={classNames('fas', {
                                'fa-sort': sortBy !== currArea,
                                'fa-sort-up':
                                  !reverseMethod && sortBy === currArea,
                                'fa-sort-down':
                                  reverseMethod && sortBy === currArea,
                              })}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sortedGoodProducts.map(currProduct => (
                  <tr data-cy="Product" key={currProduct.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {currProduct.id}
                    </td>

                    <td data-cy="ProductName">{currProduct.name}</td>
                    <td data-cy="ProductCategory">
                      {`${currProduct.category.icon} - ${currProduct.category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames({
                        'has-text-danger': currProduct.user.sex === 'f',
                        'has-text-link': currProduct.user.sex === 'm',
                      })}
                    >
                      {currProduct.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
