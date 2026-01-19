import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-prod'
    DATA_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
    USERS_FILE = os.path.join(DATA_FOLDER, 'users.csv')
    RECORDS_FILE = os.path.join(DATA_FOLDER, 'records.csv')
    CENTRES_FILE = os.path.join(DATA_FOLDER, 'centres.csv')
