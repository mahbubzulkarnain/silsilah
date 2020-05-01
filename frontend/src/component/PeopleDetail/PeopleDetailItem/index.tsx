import React from 'react'

import './style.css'

const PeopleDetailItem = (props: any) => {
  const { label, value } = props

  if (!value) return null

  return (
    <p className={ `people-detail__info__${ label?.toLowerCase() || 'default' }` }>
      { label && (<label>{ label }: </label>) }
      { value }
    </p>
  )
}

export default PeopleDetailItem
