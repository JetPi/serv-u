"""empty message

Revision ID: 3bed90248860
Revises: 
Create Date: 2022-09-15 12:30:41.336897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3bed90248860'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('service',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('type', sa.Enum('electricidad', 'plomeria', 'hogar', name='servicetype'), nullable=False),
    sa.Column('home_delivery', sa.Boolean(), nullable=False),
    sa.Column('location', sa.String(length=200), nullable=False),
    sa.Column('clients', sa.String(length=100), nullable=True),
    sa.Column('base_price', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('role', sa.Enum('comprador', 'vendedor', name='role'), nullable=False),
    sa.Column('salt', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('service')
    # ### end Alembic commands ###
