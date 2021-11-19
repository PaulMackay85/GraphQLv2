import React from 'react';
import { useQuery } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

const displayBookDetails = (loading, data, error) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (data.book) {
    return (
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All Books by this Author:</p>
        {data.book.author.books.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </div>
    );
  } else {
    return (
      <div>
        <p>No data to display...</p>
      </div>
    );
  }
};

const BookDetails = (props) => {
  const { loading, data, error } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });
  return (
    <div id="book-details">{displayBookDetails(loading, data, error)}</div>
  );
};

export default BookDetails;
