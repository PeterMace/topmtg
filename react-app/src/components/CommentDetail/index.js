
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../store/comment';
import { useHistory } from 'react-router-dom';
import EditCommentForm from '../EditCommentForm';

const CommentDetail = ({comment}) => {
    //const photos = useSelector(state => state.photos);
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [showEditForm, setShowEditForm] = useState(false);

    const ownerPermission = userId === comment?.userId;
    
    const handleDelete = async (e) => {
        e.preventDefault();
        const dispatchPhoto = await dispatch(deleteComment(comment));
        history.push('/');
        history.push(`/decks/${comment.deckId}`);
    }
    
    if (!comment) {
        return null;
    }

    let content = null;
    if (showEditForm){
        content = (
            <EditCommentForm comment={comment} hideForm={() => setShowEditForm(false)} />
          )
        }
    console.log(comment);
    if(!comment){
        return null;
    }
    return (
      <main>
        <div id="comment">
            {!showEditForm &&
              <p key={comment.id}> 
                {comment.content}
              </p>}
            {(ownerPermission && !showEditForm) ? <button onClick={() => setShowEditForm(!showEditForm)}>Edit Comment</button> : null}
            {(ownerPermission && !showEditForm) ? <button onClick={handleDelete}>Delete Comment</button> : null}
            {content}
              <br />
        </ div>
      </main>
    );
};

export default CommentDetail;