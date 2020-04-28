import React from 'react'

import './style.css'

const PeopleDetailItem = (props: any) => {
  const { label, value } = props

  return value && (
    <p className={ `people-detail__info__${ label?.toLowerCase() || 'default' }` }>
      { label && (<label>{ label }: </label>) }
      { value }
    </p>
  )
}

export default PeopleDetailItem
