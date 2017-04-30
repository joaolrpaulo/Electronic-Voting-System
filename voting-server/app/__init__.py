import sys
import sqlite3
from flask import Flask
from sqlalchemy import create_engine

from app import configs


# Initialize the app
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False


# Parse app configs
config = configs.parser(sys.argv[1])


# Connect to database
db = create_engine('sqlite:///' + config.database.location)

# Setup database
with open(config.database.schema, mode = 'r') as schema, sqlite3.connect(config.database.location) as conn:
    cursor = conn.cursor()
    cursor.executescript(schema.read())


# noinspection PyUnresolvedReferences
from app import errors
# noinspection PyUnresolvedReferences
from app import views
