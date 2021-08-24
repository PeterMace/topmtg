#from app.models import db, Card
import requests
import os


# Adds a demo user, you can add other users here if you want
def seed_cards():
    data_source_url = os.environ.get('DATA_SOURCE_URL')
    r = requests.get(data_source_url)
    cards = r.json()
    #for card in cards:
        #print(card['name'], card['type_line']) 
    print(cards[0]['image_uris'])
    print(len('https://c1.scryfall.com/file/scryfall-cards/border_crop/front/0/0/0000579f-7b35-4ed3-b44c-db2a538066fe.jpg?1562894979'))

seed_cards()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    pass
