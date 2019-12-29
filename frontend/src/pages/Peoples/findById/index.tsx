import React, {useCallback, useEffect, useState} from 'react'

import './style.css';
import findById from "./graphql";

import {useParams} from 'react-router-dom'
import {Parent, People} from "../interface";
import Card from "../../../component/Card";
import LineageCouple from "../../../component/Lineage/Couple";
import {Couple} from "../../Couples/interface";

interface FindById extends People {
  parent: Parent
  couples: [Couple]
}

export default () => {
  const [isLoading, setLoading] = useState(true);
  const [parent, setParent] = useState({
    father: ({} as People),
    mother: ({} as People)
  });
  const [peoples, setPeoples] = useState([{
    id: "",
    sure_name: "",
    couples: [{id: "", sure_name: "", children: [{id: ""}]}]
  }]);
  const {peopleID} = useParams();

  const dataCoupleParser = (people: People, item: Couple) => {
    let couple: any = {...({} as People), children: []};
    if (item.wife && item.wife.sure_name !== people.sure_name) {
      couple = {...item.wife, children: []}
    }
    if (item.husband && item.husband.sure_name !== people.sure_name) {
      couple = {...item.husband, children: []}
    }
    if (item.children && item.children.length && item.children[0].child) {
      item.children.forEach((children) => {
        couple.children.push(children.child)
      })
    }
    return couple
  };

  const dataParser = useCallback((response: FindById) => {
    let result = [{...response, couples: []}] as any;
    if (response) {
      // Parent
      let parent = {
        father: {
          id: "",
          sure_name: "",
        },
        mother: {
          id: "",
          sure_name: "",
        }
      };
      if (response.parent && response.parent.husband && response.parent.husband.id) {
        parent.father = response.parent.husband;
      }
      if (response.parent && response.parent.wife && response.parent.wife.id) {
        parent.mother = response.parent.wife;
      }
      setParent(parent);
      // Parent

      let couple;
      if (response.parent && response.parent.children && response.parent.children.length && response.parent.children[0].child && response.parent.children[0].child.id) {
        let resParsed: any;
        result = [];
        response.parent.children.forEach(({child: item}) => {
          resParsed = {...item, couples: []} as any;
          if (item && "couples" in item && item.couples && item.couples.length) {
            item.couples.forEach((itemCouple) => {
              couple = dataCoupleParser(item, itemCouple);
              if (couple && couple.id) {
                resParsed.couples.push(couple)
              }
            })
          }
          result.push(resParsed)
        })
      } else if (response.couples) {
        response.couples.forEach((item) => {
          couple = dataCoupleParser(response, item);
          if (couple && couple.id) {
            result[0].couples.push(couple)
          }
        });
      }
    }
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
  const peopleList = (peoples && peoples.length && peoples[0].id)
    ? (<ul>
      {peoples.map((people, ip) =>
        <li key={`people${ip + people.id}`} className='wrapper-card'>
          <Card title={people.sure_name} link={`/peoples/${people.id}`} selected={peopleID === people.id}/>
          {/*Couple*/}
          {(people.couples && people.couples.length && people.couples[0].id)
            ? people.couples.map((couple: { id: string, sure_name: string, children: Array<any> }) =>
              <LineageCouple key={`couple${ip + people.id + couple.id + (
                (couple.children && couple.children.length && couple.children[0].id) ? couple.children[0].id : 0
              )}`} item={couple}>
                {/*Children*/}
                {(couple.children && couple.children.length && couple.children[0].id)
                  ? (<ul>
                    {
                      couple.children.map((child: People) =>
                        <li key={`children${ip + people.id + couple.id + child.id}`}>
                          <Card title={child.sure_name} link={`/peoples/${child.id}`}/>
                        </li>
                      )
                    }
                  </ul>)
                  : null}
                {/*Children*/}
              </LineageCouple>
            )
            : null}
          {/*Couple*/}
        </li>)}
    </ul>)
    : (<li>Not found</li>);
  return (
    <div>
      {
        (parent && parent.mother.id && parent.father.id)
          ?
          <ul>
            <li className='wrapper-card'>
              <Card title={parent.father.sure_name} link={`/peoples/${parent.father.id}`}/>
              <ul>
                <li className='wrapper-card'>
                  <Card title={parent.mother.sure_name} link={`/peoples/${parent.mother.id}`}/>
                </li>
                <li>{peopleList}</li>
              </ul>
            </li>
          </ul>
          : peopleList
      }
    </div>
  )
}
