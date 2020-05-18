import React from 'react'
import PropTypes from 'prop-types'

import './OverviewCard.css'

const OverviewCard = ({ count, category, url }) => {
  return (
    <div className="overview-card">
      <div className="card-count shadow-text">{count}</div>
      <div className="card-category shadow-text">{category}</div>
      <a href={url} className="card-link">
        More Details
      </a>
    </div>
  )
}

OverviewCard.propTypes = {
  count: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default OverviewCard
