from flask import request, jsonify
from models.realtimeDB_access import DBAccess

def add_user(data):
    db_access = DBAccess()
    
    new_user_id = db_access.add_user(data)
    return new_user_id
