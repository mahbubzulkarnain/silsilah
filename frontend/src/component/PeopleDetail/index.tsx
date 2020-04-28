import React from 'react'
import { People } from "../../pages/Peoples/interface";

import './style.css'
import PeopleDetailItem from "./PeopleDetailItem";

const PeopleDetail = ({ people = {} as People }) => (
  <div className='people-detail'>
    <div className='people-detail__avatar'>

    </div>
    <div className='people-detail__info'>
      <h3 className='people-detail__info__sure-name'>{ people?.sure_name || '-' }</h3>
      <h4 className='people-detail__info__nick-name'>({ people?.nick_name || '-' })</h4>

      <PeopleDetailItem value={ people?.date_of_birth }/>
      <PeopleDetailItem label='Email' value={ people?.email }/>
      <PeopleDetailItem label='Phone' value={ people?.phone }/>
      <PeopleDetailItem label='Address' value={ people?.address }/>
    </div>
  </div>
);

export default PeopleDetail
