from .db import db

deck_cards = db.Table('deck_cards',
    db.Column('card_id', db.Integer, db.ForeignKey('cards.id'), primary_key=True),
    db.Column('deck_id', db.Integer, db.ForeignKey('decks.id'), primary_key=True)
)

class Deck(db.Model):
    __tablename__ = 'decks'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(55), nullable=False)
    description = db.Column(db.String(450), nullable=True)
    commander = db.Column(db.Integer, db.ForeignKey('cards.id'))
    card = db.relationship("Card", back_populates="commander_card")
    deck_cards = db.relationship('Card', secondary=deck_cards, lazy='subquery',
        backref=db.backref('decks', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'userId': self.userId,
        }


