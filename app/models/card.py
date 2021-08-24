from .db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    type = db.Column(db.String(55), nullable=False)
    price = db.Column(db.String(55), nullable=False)
    price_foil = db.Column(db.String(55), nullable=False)
    small_url = db.Column(db.String(130), nullable=False) 
    img_url = db.Column(db.String(130), nullable=False) 
    art_img = db.Column(db.String(130), nullable=False)

