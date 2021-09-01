// constants
const LOAD_CARDS = 'cards/LOAD';

const loadCards = (payload) => ({
    type: LOAD_CARDS,
    payload
});


export const fetchCards = (cardIds) => async (dispatch) => {
    const response = await fetch(`/api/cards/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cardIds, 
        }),
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCards(data))
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
    console.log("where's my payload", action)
    switch (action.type) {
        case LOAD_CARDS: {
                const newState = {
                  ...state,
                  ...action.payload
                };
                return newState;
            }
          default: {
            return state;
        }
      }
    }