import Card from "../../Card";
import React, { FunctionComponent } from "react";
import { People } from "../../../pages/Peoples/interface";

const LineageItem: FunctionComponent<{ key: string, people: People, selectedID?: string }> = ({ key = "", people = ({} as People), selectedID, children }) => (
  <li key={ key || '' } className='wrapper-card'>
    <Card title={ people.sure_name } link={ `/peoples/${ people.id }` } selected={ selectedID === people.id }/>
    { !!children && children }
  </li>
);

export default LineageItem
