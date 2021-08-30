from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Deck, Card, db
from app.forms import DeckForm
from app.api.error_handler import validation_errors_to_error_messages
deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/', methods=['GET', 'POST'])
@login_required
def deck_form():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        content = request.json
        deck = Deck(
            name =  form.data['name'],
            description = form.data['description'],
            userId = content['userId'],
        )
        db.session.add(deck)
        db.session.commit()
        return deck.to_dict();
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@deck_routes.route('/all/')
@login_required
def get_all_decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict() for deck in decks]}    


@deck_routes.route('/<int:id>')
@login_required
def get_deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()
