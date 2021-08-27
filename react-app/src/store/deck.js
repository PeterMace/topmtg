// constants
const ADD_DECK = 'session/ADD_DECK';

const addDeck = (deck) => ({
  type: ADD_DECK,
  payload: deck
});

const initialState = { deck: null };

export const createDeck = (name, description, user) => async (dispatch) => {
  const response = await fetch('/api/decks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name, 
        description, 
        user
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DECK:
      return { deck: action.payload }
    default:
      return state;
  }
}
