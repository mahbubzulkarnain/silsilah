import React from 'react'
import { People } from "../../pages/Peoples/interface";

import './style.css'

const PeopleDetail = ({ people = {} as People }) => {
  return <div className='people-detail'>
    <div className='people-detail__avatar'>

    </div>
    <div className='people-detail__info'>
      <h3 className='people-detail__info__sure-name'>{ people?.sure_name || '-' }</h3>
      <h4 className='people-detail__info__nick-name'>({ people?.nick_name || '-' })</h4>
      <p className='people-detail__info__email'>
        <label>Email: </label>
        { people?.email || '-' }
      </p>
      <p className='people-detail__info__phone'>
        <label>Phone: </label>
        { people?.phone || '-' }
      </p>
      <p className='people-detail__info__address'>
        <label>Address: </label>
        { people?.address || '-' }
      </p>
    </div>
  </div>
};

export default PeopleDetail
