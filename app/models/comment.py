from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    deckId = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
    content = db.Column(db.String(450), nullable=False)
    user = db.relationship("User", back_populates="comments")
    deck = db.relationship("Deck", back_populates="comments")
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'deckId': self.deckId,
            'content': self.content,
        }
