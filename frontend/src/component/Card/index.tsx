import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './style.css'

const Card = ({title = "", link = "", selected = false}) => {
    const Label = (
      <div className='card'>
        <div className={'name' + (selected ? ' selected' : '')}>{title}</div>
      </div>
    );
    if (link) return <Link to={link}>{Label}</Link>;
    return Label;
  }
;

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card
