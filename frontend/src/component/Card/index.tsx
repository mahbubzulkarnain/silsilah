import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './style.css'

const Card = ({ title = "", subtitle = "", link = "", selected = false }) => {
  const Label = (
    <div className={ 'card' + (selected ? ' selected' : '') }>
      <p className="card-title">{ title }</p>
      { subtitle && (<h6 className="card-subtitle mb-2 text-muted">{ subtitle }</h6>) }
    </div>
  );
  if (link) return <Link to={ link }>{ Label }</Link>;
  return Label;
};

Card.propTypes = {
  title   : PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  link    : PropTypes.string,
  selected: PropTypes.bool,
};

export default Card
