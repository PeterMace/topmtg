from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def name_validation(form, field):
    # Checking if name exists and is valid length
    name = field.data
    length = len(name) 
    if length == 0 or length > 55:
        raise ValidationError('Deck must have a name and be less or equal to 55 characters')


def description_validation(form, field):
    # Checking if description is valid length
    description = field.data
    length = len(description) 
    if length > 500:
        raise ValidationError('Deck description must be less than or equal to 500 characters')

class DeckForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_validation])
    description = StringField('description', validators=[ description_validation])
