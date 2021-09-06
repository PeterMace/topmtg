# Introduction

[TopMTG](https://topmtg.herokuapp.com/) is an application for Magic The Gathering players to build their own trading card decks. This app caters to building Commander decks, which is the most popular playing format of the most popular card game. Commander restricts players to have only one copy of each card. Users are able to search all 29000+ cards pulled from the scryfall API to quickly add cards to their deck. They can also create their own decks, and comment on others. This project was created by Peter Mace as a full stack capstone project for App Academy.

[Click here to view the live project.](https://topmtg.herokuapp.com/)
[Wiki](https://github.com/PeterMace/topmtg/wiki)

#  Technologies Used
## Frontend
### [React](https://reactjs.org/docs/react-api.html)
### [Redux](https://redux.js.org/api/api-reference)
## Backend
### [Flask](https://flask.palletsprojects.com/en/2.0.x/)
### [Postgres](https://www.postgresql.org/docs/)
### [Sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
## Data sources
### [Scryfall API](https://scryfall.com/docs/api) 


# Documentation
## [Database Schema](https://github.com/PeterMace/topmtg/wiki/Database-Schema)
## [User Stories](https://github.com/PeterMace/topmtg/wiki/User-Stories)
## [Feature List](https://github.com/PeterMace/topmtg/wiki/Features0)
## [Deployment Guide](https://github.com/PeterMace/topmtg/wiki/Deployment-Guide)

# Code Snippets

###Card Search
Location: topmtg/app/api/card_routes.py/
```
@card_routes.route('/search/<cardName>')
def search_cards(cardName):
    cardName = cardName.lower()
    search = "%{}%".format(cardName)

    #The following query searchs for cards for names based on substring logic. 
    #The func.lower makes the search case agnostic as both values in the comparision are cast to be lowercase. 
    #We limit the response size to improve result load times when results are massive(1000+ records).
    cards = Card.query.filter(func.lower(Card.name).like(func.lower(search))).limit(20).all()
    return {'cards': [card.to_search_dict() for card in cards]}   

```
Description:
This handles the card search input from the frontend. Converting to lowercase improves ease of use and limits results to 20(out of 29000+) cards making response times much faster.

###Scryfall API - Card seeding
Location: topmtg/app/seeds/cards.py/
```
# pull the external url of the bulk data store from Scryfall API. Then pulls out card data, and adds to database.
# It takes up to an hour and half to create all the database records. 
def seed_cards():
    cards = []
    data_source_url = os.environ.get('DATA_SOURCE_URL')
    r = requests.get(data_source_url)
    cards_data = r.json()
    for card in cards_data:
        if card.get('image_uris'):
            cards.append(
                Card(
                    name = card['name'],
                    type = card['type_line'],
                    price = card['prices']['usd'],
                    price_foil = card['prices']['usd_foil'],
                    small_url = card['image_uris']['small'],
                    img_url = card['image_uris']['border_crop'],
                    art_img = card['image_uris']['art_crop']
                )
            )
            db.session.add_all(cards)
            db.session.commit()
```

Description:A
This uses an environment variable set to the url of the Scryfall bulkdata. The requests python library pulls the data and we insert using the add_all. This can take upwards of an hour to generate all 29000+ card records. This is dramatically faster when run in a detached shell.  
  
