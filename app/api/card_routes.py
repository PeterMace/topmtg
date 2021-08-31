from flask import Blueprint, session, request
from sqlalchemy import func
from app.models import Card, db
card_routes = Blueprint('cards', __name__)

@card_routes.route('/search/<cardName>')
def search_cards(cardName):
    cardName = cardName.lower()
    search = "%{}%".format(cardName)

    #The following searchs for cards for names based on substring logic. 
    #The func.lower makes the search case agnostic as both values in the comparision are cast to be lowercase. 
    #We limit the response size to improve result load times when results are massive(1000+ records).
    cards = Card.query.filter(func.lower(Card.name).like(func.lower(search))).limit(20).all()
    return {'cards': [card.to_search_dict() for card in cards]}   


@card_routes.route('/load')
def get_cards():
    content = request.json
    IDs = content['cardIds']
    cardData = Card.query.filter(Card.id.in_(IDs)).all()
    #The following searchs for cards for names based on substring logic. 
    #The func.lower makes the search case agnostic as both are cast to be lowercase. 
    #We limit the response size to improve result load times when results are massive(1000+ records).
    
    return {'cards': [card.to_dict() for card in cardData]}   