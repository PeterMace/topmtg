"""added userId column to deck table

Revision ID: fef31cd461fa
Revises: a53c9e29e7df
Create Date: 2021-08-27 13:25:42.592374

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fef31cd461fa'
down_revision = 'a53c9e29e7df'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('decks', sa.Column('userId', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'decks', 'users', ['userId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    #op.drop_constraint(u'my_fkey', 'table1', type_='foreignkey')
    #op.drop_constraint(None, 'decks', type_='foreignkey')
    op.drop_column('decks', 'userId')
    # ### end Alembic commands ###
