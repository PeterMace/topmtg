from .db import db

class Deck(db.Model):
    __tablename__ = 'decks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(55), nullable=False)
    commander = db.Column(db.Integer, db.ForeignKey('cards.id'))
    card = db.relationship("Card", back_populates="commander_card")

