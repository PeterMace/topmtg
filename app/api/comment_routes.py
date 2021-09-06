from flask import Blueprint, session, request
from sqlalchemy import func
from app.models import Comment, User, db
from app.forms import CommentForm
from flask_login import login_required, current_user
from app.api.error_handler import validation_errors_to_error_messages
comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET', 'POST'])
@login_required
def comment_form():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    content = request.json
    if form.validate_on_submit():
        content = request.json
        comment = Comment(
            content =  form.data['comment'],
            userId = content['userId'],
            deckId = content['deckId'],
        )
        db.session.add(comment)
        db.session.commit()
        user = User.query.get(content['userId'])
        return_dict = comment.to_dict()
        return_dict['userName'] = user.username
        return return_dict;
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:deck_id>/load', methods=['GET'])
@login_required
def deck_comments(deck_id):
    comments = Comment.query.filter(Comment.deckId == deck_id).all()
    print("commentsLoaded", comments);
    comments = {comment.id : comment.to_dict() for comment in comments}
    return comments

@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def edit_comments(comment_id):
    #form = CommentForm()
    #form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(comment_id)
    content = request.json
    #if form.validate_on_submit():
    print("requested dater", content['content'])
    comment.content =  content['content']
    comment_length = len(content['content'])
    if  comment_length < 450 and comment_length > 0:
        db.session.add(comment)
        db.session.commit()
        return {"comment": comment.to_dict()}
    return {'errors': {"comment" : "comment must be present and less than 450"}}, 500
    
    


@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment);
    db.session.commit()
    return {"commentId": comment_id}


