import React, {FunctionComponent} from "react";
import LineageCouple from "./Couple";
import {People} from "../../pages/Peoples/interface";
import LineageItem from "./Item";
import {Children} from "../../pages/Children/interface";

const removeKeyChild = (children: [Children]) => {
  return children.map(({child}) => child)
};

const Lineage: FunctionComponent<{ list: Array<People>, selectedID?: string }> = ({list, selectedID = "", children}) =>
  <ul>
    {
      (list && list.length && list[0].id)
        ? list.map((item, ip) =>
          <LineageItem key={`item${ip + item.id}`} people={item} selectedID={selectedID}>
            {/*Couple*/}
            {(item.couples && item.couples.length && item.couples[0].id)
              ? item.couples.map((couple) =>
                <LineageCouple key={`couple${ip + item.id + couple.id + (
                  (couple.children && couple.children.length && couple.children[0].child && couple.children[0].child.id) ? couple.children[0].child.id : 0
                )}`} item={couple}>
                  {/*Children*/}
                  {(couple.children && couple.children.length && couple.children[0].child && couple.children[0].child.id)
                    ? (couple.children[0].child.couples && couple.children[0].child.couples.length && couple.children[0].child.couples[0].id)
                      ? <Lineage list={removeKeyChild(couple.children)} selectedID={selectedID}/>
                      : (<ul> {couple.children.map(({child}) =>
                        <LineageItem
                          key={`children${ip + item.id + couple.id + child?.id}`}
                          people={child}
                          selectedID={selectedID}
                        />
                      )} </ul>)
                    : null}
                  {/*Children*/}
                </LineageCouple>
              ) : null}
            {/*Couple*/}
          </LineageItem>)
        : <li>Not found</li>
    }
  </ul>;

export default Lineage
