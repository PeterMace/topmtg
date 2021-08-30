from .db import db

class Deck(db.Model):
    __tablename__ = 'decks'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(450), nullable=True)
    commander = db.Column(db.Integer, db.ForeignKey('cards.id'))
    card = db.relationship("Card", back_populates="commander_card")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }