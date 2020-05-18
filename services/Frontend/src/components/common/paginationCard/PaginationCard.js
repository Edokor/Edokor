import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import './PaginationCard.css'

const PaginationCard = ({
  currentPage,
  maxItemOnPage,
  totalItem,
  onPageChange,
}) => {
  const pageCount =
    Math.ceil(totalItem / maxItemOnPage) == 0
      ? 1
      : Math.ceil(totalItem / maxItemOnPage)

  useEffect(() => {
    if (currentPage > pageCount) {
      onPageChange(1)
    }
  }, [currentPage])

  const pageButtonList = []

  for (let i = 1; i <= pageCount; i++) {
    if (
      i == 1 ||
      i == pageCount ||
      i == currentPage ||
      i - 1 == currentPage ||
      i + 1 == currentPage ||
      (i - 2 == currentPage && currentPage == 1) ||
      (i + 2 == currentPage && currentPage == pageCount)
    ) {
      pageButtonList.push(
        <button
          className={currentPage == i ? 'page-selected' : ''}
          key={i}
          onClick={() => {
            onPageChange(i)
          }}
        >
          {i}
        </button>
      )
    } else if (
      i + 2 == currentPage ||
      i - 2 == currentPage ||
      (i - 3 == currentPage && currentPage == 1) ||
      (i + 3 == currentPage && currentPage == pageCount)
    ) {
      pageButtonList.push(
        <span className="pagination-more" key={i}>
          ...
        </span>
      )
    }
  }

  return (
    <div className="pagination-card">
      <div className="pagination-display-count">
        Showing{' '}
        <span>
          {currentPage != pageCount ? maxItemOnPage : totalItem % maxItemOnPage}
        </span>{' '}
        out of <span>{totalItem}</span> enteries
      </div>
      <div className="pagination-display-page">
        <button
          disabled={currentPage == 1 ? true : false}
          onClick={() => {
            onPageChange(currentPage - 1)
          }}
        >
          &lt;
        </button>
        {pageButtonList}
        <button
          disabled={currentPage == pageCount ? true : false}
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

PaginationCard.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxItemOnPage: PropTypes.number.isRequired,
  totalItem: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default PaginationCard
