from flask import Blueprint
from flask_login import login_required
from app.models import Deck, Card

deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/', methods=['GET', 'POST'])
@login_required
def deck_form():
    users = Card.query.all()
    return {'users': [user.to_dict() for user in users]}


@deck_routes.route('/all')
@login_required
def get_all_decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict() for deck in decks]}    


@deck_routes.route('/<int:id>')
@login_required
def get_deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()
