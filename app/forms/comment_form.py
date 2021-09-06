from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def content_validation(form, field):
    # Checking if description is valid length
    comment = field.data
    length = len(comment) 
    if length > 450:
        raise ValidationError('Comment must be less than 450 characters')

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), content_validation])
