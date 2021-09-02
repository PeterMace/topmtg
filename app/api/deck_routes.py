from flask import Blueprint, session, request
from flask_login import login_required, current_user
from sqlalchemy import select
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
def get_all_decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict() for deck in decks]}    


@deck_routes.route('/<int:deck_id>/cards', methods=['GET'])
@login_required
def get_deck_card(deck_id):
    print("deck result",deck_id)
    #the c in the filter stands for criteria and must be present
    card_results = []
    #Loop through results to pull the cardId value of each tuple in the query result.
    for result in db.session.query(deck_cards.c.card_id).filter(deck_cards.c.deck_id==deck_id).all():
        card_results.append(result[0])
    
    #result the normalized data for redux. {15: [204, 1652, 1332, 2763, 2559, 3134, 3627, 5027, 1549, 3005, 84, 1420, 3234, 6142, 6619, 504, 2038, 6882, 2914, 6912, 130, 1727, 1438, 2195, 8012, 275, 634, 1134, 1100, 4486]}
    return {"deckId": deck_id, "cardResults": card_results}   


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
    deck_card_insert = deck_cards.insert().values(
        card_id = content['cardId'], 
        deck_id = deckId
    )

    deck = Deck.query.get(deckId)
    if current_user.id == deck.userId:
        db.session.execute(deck_card_insert) 
        db.session.commit()
        return {'cardId':content['cardId'],'deckId':deckId}


