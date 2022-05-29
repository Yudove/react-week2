import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loadCardFB } from "./Store"

import styled from 'styled-components';
import { IoIosAddCircle } from 'react-icons/io';

//파이어베이스 삭제용
import {db} from "./firebase"
import {  doc, deleteDoc } from "firebase/firestore"


const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.list);

  React.useEffect(() => {
    dispatch(loadCardFB());
    const docRef = doc(db, "dict", "2hhedxF7hZsedWDNKR67");
    deleteDoc(docRef)
  }, []);

  return (
    <div style={{textAlign: 'center', width: '100%'}}>
      <Header>
        <h1
          style={{ cursor: 'pointer', display: 'grid', textAlign: 'center', margin: '30px auto', background: '#fff'}}
          onClick={() => window.location.reload()}
        >
          My Dictionary
        </h1>
      </Header>
      <div style={{ marginTop: '130px', height: '100%' }}>
        <h3>단어 목록</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {list.map((a, i) => {
            return (
              <div key={i} style={{ width: '100%', display: 'flex' }}>
                {/* whiteSpace: 'nowrap',
                textCverflow: 'ellipsis', wordBreak: 'break-all' */}
                <WordCard>
                  <h2 style={{}}>{a.word}</h2>
                  <p>{a.meaning}</p>
                  <p style={{ color: '#0455BF' }}>{a.example}</p>
                </WordCard>
              </div>
            );
          })}
        </div>
      </div>
      <CircleButton>
        <IoIosAddCircle size={50} onClick={() => {
          history.push('/add');
        }} />
      </CircleButton>
     
    </div>
  );
};

const Header = styled.div`
  position: fixed;
  background-color: #fff;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #eee;
  z-index: 999;
`;

const WordCard = styled.div`
  font-size: 20px;
  width: 250px;
  height: 320px;
  text-align: left;
  width: 250px;
  /* overflow: hidden; 
  white-space: nowrap;
  text-overflow:ellipsis;
  word-break: break-all; */
  margin: 10px 20px;
  padding: 15px 15px;
  border: solid #eee 2px;
  border-radius: 10px;
  transition: 0.125s all ease;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 15px 0px;
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }
`;

const CircleButton = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  
  &:hover {
    transition: 0.4s ease-in-out;
    transform: rotate(90deg);
  }
`;

export default Main;