// constants
const LOAD_CARDS = 'deck_card/LOAD';
const ADD_CARD = 'deck_card/ADD_CARD';
const REMOVE_CARD = 'deck_card/REMOVE_CARD';


const loadCards = (deckId) => ({
    type: LOAD_CARDS,
    deckId
});

const addCard = (deckId, cardId) => ({
  type: ADD_CARD,
  deckId, 
  cardId
});

const removeCard = (id) => ({
  type: REMOVE_CARD,
  id
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

// export const getDeck = (id) => async (dispatch) => {
//   const response = await fetch(`/api/decks/${id}`, {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//   });
  
//   if (response.ok) {
//       const data = await response.json();
//       dispatch(addDeck(data))
//       return data;
//   } else if (response.status < 500) {
//       const data = await response.json();
//       if (data.errors) {
//           return data.errors;
//       }
//   } else {
//       return ['An error occurred. Please try again.']
//   }
// }

// export const deleteDeck = (id) => async (dispatch) => {
//   const response = await fetch(`/api/decks/${id}/delete`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//   });
  
//   if (response.ok) {
//       const deckId = await response.json();
//       dispatch(removeDeck(deckId.id))
//       return deckId;
//   } else if (response.status < 500) {
//       const data = await response.json();
//       if (data.errors) {
//           return data.errors;
//       }
//   } else {
//       return ['An error occurred. Please try again.']
//   }
// }


const initialState = {  };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CARDS: {
          const allDecks = {};
          action.payload.decks.forEach(deck => {
            allDecks[deck.id] = deck;
          });
          return {
            ...allDecks,
            ...state,
          };
        }
        case ADD_CARD: {
            if (!state[action.deckId]) {
              const newState = {
                ...state,
                [action.deckId] : [action.cardId]
              };
              return newState;
            }
            return {
              ...state,
              [action.deckId]: 
                state[action.deckId].push(action.cardId)
            };
          }
        case REMOVE_CARD: {
            const newState = { ...state };
            delete newState[ action.id];
            return newState;
          }
          default: {
            return state;
        }
      }
    }