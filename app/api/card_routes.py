from flask import Blueprint, session, request
from sqlalchemy import func
from app.models import Card, db
card_routes = Blueprint('cards', __name__)

@card_routes.route('/search/<cardName>')
def search_cards(cardName):
    cardName = cardName.lower()
    print(cardName)
    search = "%{}%".format(cardName)
    cards = Card.query.filter(func.lower(Card.name).like(func.lower(search))).all()
    print(cards)
    return {'cards': [card.to_search_dict() for card in cards]}   