import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const AppPagination = ({ pagesCount, activePage, onPageNavigation }) => {
  const isFirstPage = activePage === 0;
  const isLastPage = activePage === pagesCount - 1;
  return (
    <div>
      <Pagination>
        {!isFirstPage && <Pagination.Prev onClick={() => onPageNavigation(activePage - 1)} />}
        {Array.from({ length: pagesCount }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index === activePage}
            onClick={() => onPageNavigation(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        {!isLastPage && <Pagination.Next onClick={() => onPageNavigation(activePage + 1)} />}
        </Pagination>
    </div>
  )
};

AppPagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageNavigation: PropTypes.func.isRequired
};

export default AppPagination;