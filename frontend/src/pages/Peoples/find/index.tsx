import React, { useEffect, useState } from 'react'

import './style.css';
import find from "./graphql";

import Lineage from "../../../component/Lineage";
import Navbar from "../../../component/Navbar";
import { People } from "../interface";

export default ({ data: any }: any) => {
  const initialStatePeoples = ([] as Array<People>);
  const [isLoading, setLoading] = useState(true);
  const [peoples, setPeoples] = useState(initialStatePeoples);

  useEffect(() => {
    find().then((data) => {
      setPeoples(data);
      setLoading(false);
    })
  }, []);

  if (isLoading) return (<div/>);

  return (
    <>
      <Navbar/>
      <Lineage list={ peoples } selectedID=""/>
    </>
  )
}
