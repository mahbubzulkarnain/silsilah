import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './style.css'

const Navbar = ({ title = "Silsilah Keluarga", link = "/" }) => {
  return <>
    <nav>
      <div className="nav-item">
        <Link className="nav-link" to={ link }>{ title }</Link>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon className="nav-icon active" icon={ faSearch }/>
      </div>
    </nav>
  </>;
};

Navbar.propTypes = {
  title: PropTypes.string,
  link : PropTypes.string
};

export default Navbar;
