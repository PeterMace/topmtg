// constants
const ADD_DECK = 'session/ADD_DECK';

const addDeck = (deck) => ({
  type: ADD_DECK,
  payload: deck
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
    console.log({
        name, 
        description, 
        "userId" : user.id
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
const initialState = { deck: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
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
          default: {
            return state;
        }
      }
    }