from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Deck, deck_cards, db
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


@deck_routes.route('all/')
@login_required
def get_all_decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict() for deck in decks]}    


@deck_routes.route('/<int:id>')
@login_required
def get_deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()


@deck_routes.route('/<int:id>', methods=['POST'])
@login_required
def update_deck(id):
    form = DeckForm()
    deck = Deck.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        content = request.json
        
        deck.name =  form.data['name'],
        deck.description = form.data['description'],

        db.session.add(deck)
        db.session.commit()
        return deck.to_dict();
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@deck_routes.route('/<int:id>/delete', methods=['POST'])
@login_required
def delete_deck(id):
    deck = Deck.query.get(id)
    if current_user.id == deck.userId:
        db.session.delete(deck)
        db.session.commit()
        return {"id":id}


@deck_routes.route('/<int:deckId>/add', methods=['POST'])
@login_required
def add_deck_card(deckId):
    content = request.json
    deck_card = deck_cards(
        card_id = content['cardId'],
        deck_id = deckId
    )
    deck = Deck.query.get(deckId)
    if current_user.id == deck.userId:
        db.session.add(deck_card)
        db.session.commit()
        return {'cardId':content['cardId'],'deckId':deckId}