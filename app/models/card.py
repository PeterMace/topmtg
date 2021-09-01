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
    commander_card = db.relationship("Deck", back_populates="card")

    def to_search_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'small_url' : self.small_url,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'price': self.price,
            'price_foil' : self.price_foil,
            'small_url' : self.small_url,
            'img_url' : self.img_url,
            'art_img' : self.art_img,
        }