// constants
const LOAD_CARDS = 'deck_card/LOAD';
const ADD_CARD = 'deck_card/ADD_CARD';
const REMOVE_CARD = 'deck_card/REMOVE_CARD';


const loadCards = (payload) => ({
    type: LOAD_CARDS,
    payload
});

const addCard = (payload) => ({
  type: ADD_CARD,
  payload
});

const removeCard = (payload) => ({
  type: REMOVE_CARD,
  payload
});


export const addDeckCard = (cardId, deckId) => async (dispatch) => {
    const response = await fetch(`/api/decks/${deckId}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cardId, 
        }),
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(addCard(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getDeckCards = (id) => async (dispatch) => {
  const response = await fetch(`/api/decks/${id}/cards`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  
  if (response.ok) {
      const data = await response.json();
      dispatch(loadCards(data))
      return data;
  } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
          return data.errors;
      }
  } else {
      return ['An error occurred. Please try again.']
  }
}

export const deleteDeckCard = (cardId, deckId) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}/card/delete`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId, 
      }),
  });
  
  if (response.ok) {
      const data = await response.json();
      dispatch(removeCard(data))
      return null;
  } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
          return data.errors;
      }
  } else {
      return ['An error occurred. Please try again.']
  }
}


const initialState = {  };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CARDS: {
                const newState = {
                  ...state,
                  [action.payload.deckId] : action.payload.cardResults
                };
                return newState;
            }
        case ADD_CARD: {
            if (!state[action.payload.deckId]) {
              const newState = {
                ...state,
                [action.payload.deckId] : [action.payload.cardId]
              };
              return newState;
            }
            const newState = {
                ...state,
                [action.payload.deckId] : [action.payload.cardId, ...state[action.payload.deckId]]
              };
            return newState;
          }
        case REMOVE_CARD: {
            const newState = { ...state };
            const deletedIndex = newState[action.payload.deckId].indexOf(action.payload.cardId);
            newState[action.payload.deckId].splice(deletedIndex, 1);
            return newState;
          }
          default: {
            return state;
        }
      }
    }