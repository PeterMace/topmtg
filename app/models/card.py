from .db import db

class Card(db.Model):
    __tablename__ = 'cards'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    type = db.Column(db.String(55), nullable=False)
    price = db.Column(db.Float, nullable=True)
    price_foil = db.Column(db.Float, nullable=True)
    small_url = db.Column(db.String(130), nullable=False) 
    img_url = db.Column(db.String(130), nullable=False) 
    art_img = db.Column(db.String(130), nullable=False)

