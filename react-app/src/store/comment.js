const LOAD = 'comments/LOAD';
const ADD_ONE = 'comments/ADD_ONE';
const REMOVE_ONE = 'comments/REMOVE_ONE'
const UPDATE_ONE = 'comments/UPDATE_ONE'

const loadComments = comments => ({
    type: LOAD,
    comments,
  });
  
const addComment = comment => ({
    type: ADD_ONE,
    comment,
  });

const removeComment = commentId => ({
    type: REMOVE_ONE,
    commentId,
  });

export const fetchComments = (deckId) => async dispatch => {
    const response = await fetch(`/api/comments/${deckId}/load`);
    if (response.ok) {
      const comments = await response.json();
      dispatch(loadComments(comments));
    }
  };

  
export const retrieveComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`)
    if (response.ok) {
      const comment = await response.json();
      dispatch(addComment(comment))
    }
  }

export const createComment = (comment, userId, deckId) => async dispatch => {
  const response = await fetch(`/api/comments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({comment, userId, deckId}),
  })
  if (response.ok) {
    const newComment = await response.json();
    const commentResult = await dispatch(addComment(newComment))
    return commentResult;
  }
  else{
    const errorResponse = await response.json();
    return errorResponse;
  }
}

export const editComment = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      const editedComment = await response.json();
      dispatch(addComment(editedComment))
      return editedComment;
    }
  }

export const deleteComment = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      dispatch(removeComment(comment.id))
      return true;
    }
  }


  const initialState = {};

export default function comment(state = initialState, action) {
    switch (action.type) {
     case LOAD: {
            const allComments = {...action.comments};
            return {
              ...allComments,
              ...state,
        };
        }
      case ADD_ONE: {
        if (!state[action.comment.id]) {
          const newState = {
            ...state,
            [action.comment.id]: action.comment
          };
          return newState;
        }
        return {
          ...state,
          [action.comment.id]: {
            ...action.comment,
          }
        };
      }
      case REMOVE_ONE: {
          const newState = { ...state };
          delete newState[ action.commentId];
          return newState;
        }
      case UPDATE_ONE:{
        return {
            ...state,
            [action.comment.id]: {
              ...state[action.comment.id],
              ...action.comment,
            }
          };
      }
      default: {
        return state;
    }
  }
}