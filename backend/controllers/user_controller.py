from models.realtimeDB_access import UserDB

def add_user(data):
    new_user_id = UserDB.add(data)
    return new_user_id


