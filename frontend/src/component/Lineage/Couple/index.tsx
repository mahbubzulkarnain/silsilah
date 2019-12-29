import React, {FunctionComponent} from "react";
import {People} from "../../../pages/Peoples/interface";
import Card from "../../Card";

const LineageCouple: FunctionComponent<{ key: string, item: any, selectedID?: string }> = ({key = "", item = ({} as People), selectedID = "", children}) =>
  <ul key={key}>
    <li className='wrapper-card'>
      <Card title={item.sure_name} link={`/peoples/${item.id}`} selected={selectedID === item.id}/>
    </li>
    {!!children && <li>{children}</li>}
  </ul>;

export default LineageCouple
