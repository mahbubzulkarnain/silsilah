import React, {useEffect, useState} from 'react'

import './style.css';
import find from "./graphql";

import {Link} from 'react-router-dom'

export default ({data: any}: any) => {
  const [isLoading, setLoading] = useState(true);
  const [peoples, setPeoples] = useState([{id: "", sure_name: ""}]);

  useEffect(() => {
    find().then((data) => {
      setPeoples(data);
      setLoading(false);
    })
  }, []);

  if (isLoading) return (<div/>);

  return (
    <div>
      <ul>
        {
          peoples
            ? peoples.map((item: any, i: number) => <li key={i}>
              <Link to={`/peoples/${item.id}`}> {item.sure_name}</Link>
            </li>)
            : (<li>Not found</li>)
        },
      </ul>
    </div>
  )
}
