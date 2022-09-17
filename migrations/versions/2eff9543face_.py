"""empty message

Revision ID: 2eff9543face
Revises: 
Create Date: 2022-09-16 00:32:37.607172

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2eff9543face'
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
    sa.Column('provider_id', sa.Integer(), nullable=False),
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
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('pendiente', 'culminado', name='orderstatus'), nullable=False),
    sa.Column('services_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['services_id'], ['service.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order')
    op.drop_table('user')
    op.drop_table('service')
    # ### end Alembic commands ###
