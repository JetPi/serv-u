"""empty message

Revision ID: 272079a2a0c5
Revises: 
Create Date: 2022-09-22 20:20:08.261401

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '272079a2a0c5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('profile_photo_url', sa.String(length=500), nullable=True),
    sa.Column('cloudinary_id_profile', sa.String(length=500), nullable=True),
    sa.Column('banner_photo_url', sa.String(length=500), nullable=True),
    sa.Column('cloudinary_id_banner', sa.String(length=500), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('role', sa.Enum('comprador', 'vendedor', name='role'), nullable=False),
    sa.Column('salt', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('banner_photo_url'),
    sa.UniqueConstraint('cloudinary_id_banner'),
    sa.UniqueConstraint('cloudinary_id_profile'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('profile_photo_url')
    )
    op.create_table('service',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('type', sa.Enum('electricidad', 'plomeria', 'hogar', name='servicetype'), nullable=False),
    sa.Column('home_delivery', sa.Boolean(), nullable=False),
    sa.Column('location', sa.String(length=200), nullable=False),
    sa.Column('clients', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('base_price', sa.Integer(), nullable=False),
    sa.Column('service_photo_url', sa.String(length=500), nullable=True),
    sa.Column('cloudinary_id_service', sa.String(length=500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cloudinary_id_service'),
    sa.UniqueConstraint('service_photo_url')
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
    op.drop_table('service')
    op.drop_table('user')
    # ### end Alembic commands ###
