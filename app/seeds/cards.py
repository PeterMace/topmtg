from app.models.card import db, Card
import requests
import os


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
    


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
