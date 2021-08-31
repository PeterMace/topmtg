// constants
const LOAD = 'decks/LOAD';
const ADD_DECK = 'decks/ADD_DECK';
const REMOVE_DECK = 'decks/REMOVE_DECK';

const addDeck = (deck) => ({
  type: ADD_DECK,
  payload: deck
});

const loadDecks = (decks) => ({
  type: LOAD,
  payload: decks
});

const removeDeck = (id) => ({
  type: REMOVE_DECK,
  id
});


export const createDeck = (name, description, user) => async (dispatch) => {
    const response = await fetch('/api/decks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name, 
            description, 
            "userId" : user.id
        }),
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(addDeck(data))
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

export const updateDeck = (deckId, name, description, user) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name, 
          description, 
          "userId" : user.id
      }),
  });
  if (response.ok) {
      const data = await response.json();
      dispatch(addDeck(data))
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



export const getDecks = () => async (dispatch) => {
  const response = await fetch('/api/decks/all/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  
  if (response.ok) {
      const data = await response.json();
      dispatch(loadDecks(data))
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

export const getDeck = (id) => async (dispatch) => {
  const response = await fetch(`/api/decks/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  
  if (response.ok) {
      const data = await response.json();
      dispatch(addDeck(data))
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

export const deleteDeck = (id) => async (dispatch) => {
  const response = await fetch(`/api/decks/${id}/delete`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  
  if (response.ok) {
      const deckId = await response.json();
      dispatch(removeDeck(deckId.id))
      return deckId;
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
        case LOAD: {
          const allDecks = {};
          action.payload.decks.forEach(deck => {
            allDecks[deck.id] = deck;
          });
          return {
            ...allDecks,
            ...state,
          };
        }
        case ADD_DECK: {
            if (!state[action.payload.id]) {
              const newState = {
                ...state,
                [action.payload.id]: action.payload
              };
              return newState;
            }
            return {
              ...state,
              [action.payload.id]: {
                ...action.payload,
              }
            };
          }
        case REMOVE_DECK: {
            const newState = { ...state };
            delete newState[ action.id];
            return newState;
          }
          default: {
            return state;
        }
      }
    }