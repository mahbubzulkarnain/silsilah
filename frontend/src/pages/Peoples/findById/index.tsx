import React, {useCallback, useEffect, useState} from 'react'

import './style.css';
import findById from "./graphql";

import {useParams} from 'react-router-dom'
import {Parent, ParentKey, People} from "../interface";
import {Couple} from "../../Couples/interface";
import Lineage from "../../../component/Lineage";

interface FindById extends People {
  parent: Parent
  couples: [Couple]
}

export default () => {
  const initialStatePeoples = ([] as Array<People>);
  const [isLoading, setLoading] = useState(true);
  const [peoples, setPeoples] = useState(initialStatePeoples);
  const {peopleID} = useParams();

  const hasParentBrother = (key: ParentKey, response: FindById) => (
    response.parent &&
    response.parent[key] &&
    response.parent[key]?.parent &&
    response.parent[key]?.parent?.children &&
    response.parent[key]?.parent?.children?.length &&
    response.parent[key]?.parent?.children[0].child &&
    response.parent[key]?.parent?.children[0].child.id
  );

  const dataCoupleParser = (people: People, item: Couple): Couple => {
    let couple = ({} as any);
    if (item.wife && item.wife.sure_name !== people.sure_name) {
      couple = {...item.wife, children: []}
    }
    if (item.husband && item.husband.sure_name !== people.sure_name) {
      couple = {...item.husband, children: []}
    }
    if (item.children && item.children.length && item.children[0].child) {
      item.children.forEach((children) => {
        if (children.child && children.child.id) {
          couple.children?.push(children)
        }
      })
    }
    return couple
  };

  const dataResultCoupleParser = useCallback((response: FindById) => {
    let result = ([{...response, couples: ([] as Array<People>)}] as Array<People>);
    if (response.couples && response.couples.length) {
      response.couples.forEach((item) => {
        const couple = dataCoupleParser(response, item);
        if (couple && couple.id) {
          result[0].couples.push(couple)
        }
      });
    }
    return result
  }, []);

  const dataParser = useCallback((response: FindById) => {
    let result: Array<People> = [{...({couples: ([] as Array<People>)} as People)}];
    if (response) {
      let couple: Couple;
      // Parent
      let parent = initialStatePeoples;
      let resParsed: any;
      if (hasParentBrother(ParentKey.husband, response) || hasParentBrother(ParentKey.wife, response)) {
        parent = [];
        response.parent.husband?.parent?.children?.forEach(({child}) => {
          if (child && child.id) {
            let couples = child.couples.map((itemCouple) => dataCoupleParser(child, itemCouple));
            // @ts-ignore
            parent.push({...child, couples})
          }
        });
      } else if (response.parent && response.parent.husband && response.parent.husband.id) {
        parent = [{...response.parent.husband, couples: [(response.parent.wife as Couple)]}];
        if (response.parent && response.parent.children && response.parent.children.length && response.parent.children[0].child && response.parent.children[0].child.id) {
          result = [];
          // Children
          response.parent.children.forEach(({child}) => {
            resParsed = {...child, couples: []} as any;
            if (child && "couples" in child && child.couples && child.couples.length) {
              child.couples.forEach((itemCouple) => {
                couple = dataCoupleParser(child, itemCouple);
                if (couple && couple.id) {
                  resParsed.couples.push(couple)
                }
              })
            }
            result.push(resParsed);
          });
          // Children
        } else {
          result = dataResultCoupleParser(response)
        }
      } else {
        result = dataResultCoupleParser(response)
      }
      // Parent

      if (parent && parent.length) {
        result = parent.map((item) => {
          if ((item.id === response?.parent?.husband?.id) || (item.id === response?.parent?.wife?.id)) {
            if (item.couples && item.couples.length) {
              item = {
                // @ts-ignore
                ...item, couples: item.couples.map((itemCouple) => {
                  if ((item.id === response?.parent?.husband?.id) || (item.id === response?.parent?.wife?.id)) {
                    const children = result.map((itemResult) => ({child: itemResult}));
                    return {...itemCouple, ...(children && children.length && children[0].child && children[0].child.id) ? {children} : {}}
                  }
                  return itemCouple
                })
              }
            }
          }
          return item;
        });
      }
    }
    // console.log(result);
    setPeoples(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (peopleID) {
      findById(peopleID).then((data) => {
        setPeoples(data);
        dataParser(data)
      })
    }
  }, [dataParser, peopleID]);

  if (isLoading) return (<div/>);

  return (
    <div>
      <Lineage list={peoples} selectedID={peopleID}/>
    </div>
  )
}
