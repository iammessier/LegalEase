import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///legalease.db'  # Using SQLite for local dev
    SQLALCHEMY_TRACK_MODIFICATIONS = False
