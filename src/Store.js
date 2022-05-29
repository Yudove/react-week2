import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { db } from "./firebase";
import { collection, getDoc, getDocs, addDoc } from "firebase/firestore"

const initialState = {
  list: [{ word: '단어', meaning: '의미', example: '예문' }]};

// ACTIONS
const CREATE = 'store/CREATE';
const LOAD = 'store/LOAD';


// ACTION CREATORS
export function createCard(card) {
  return { type: CREATE, card };
  //card = { card: card } 
}

export function loadCard(card_list) {
  return { type: LOAD, card_list };
}

//MIDDLEWEARS
const middlewears = [thunk];
const enhancer = applyMiddleware(...middlewears);

//카드 추가하기(Add)
export const createCardFB = (card) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "dict"), card);
    const _card = await getDoc(docRef);
    const card_data = {id: _card.id, ..._card.data()}
    dispatch(createCard(card_data));
  }
};

//카드 보여주기(Main)
export const loadCardFB = () => {
  return async function (dispatch) {
    const card_data = await getDocs(collection(db, "dict"))
    console.log(card_data);

    let empty_list = [];

    card_data.forEach((data_list)=> {
      // data_list = [...data_list, {...data_list.data()}] 밑에랑 같음
      empty_list.push({id:data_list.id, ...data_list.data()})
    })
    dispatch(loadCard(empty_list));
  }
}

// REDUCER
const myReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD: {
      return {list: action.card_list};
    }
    default:
      return state;
  }
};

const myStore = createStore(myReducer, enhancer);

export default myStore;