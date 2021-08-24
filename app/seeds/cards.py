from app.models.card import db, Card
import requests
import os


# Adds a demo user, you can add other users here if you want
def seed_cards():
    pass
    # data_source_url = os.environ.get('DATA_SOURCE_URL')
    # r = requests.get(data_source_url)
    # cards_data = r.json()
    # for card_data in cards_data:
    #     card = Card(
    #         name = card_data['name'],
    #         type = card_data['type_line'],
    #         price = card_data['prices']['usd'],
    #         price_foil = card_data['prices']['usd_foil'],
    #         small_url = card_data['image_uris']['small'],
    #         img_url = card_data['image_uris']['border_crop'],
    #         art_img = card_data['image_uris']['art_crop']
    #     )
    #     db.session.add(card)
    # db.session.commit()


seed_cards()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
