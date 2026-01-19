from flask import Blueprint, request, jsonify, current_app
from utils import read_csv, append_csv
import uuid

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    users = read_csv(current_app.config['USERS_FILE'])
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    
    if user:
        return jsonify({'success': True, 'user': user})
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400
        
    users = read_csv(current_app.config['USERS_FILE'])
    if any(u['email'] == data['email'] for u in users):
        return jsonify({'error': 'User already exists'}), 400
        
    new_user = {
        'id': str(uuid.uuid4()),
        'name': data.get('name', ''),
        'email': data.get('email'),
        'password': data.get('password'),
        'role': data.get('role', 'public'),
        'state': data.get('state', ''),
        'district': data.get('district', ''),
        'block': data.get('block', ''),
        'location': data.get('location', '')
    }
    
    # Ensure we use the correct fieldnames expected by the CSV
    fieldnames = ['id', 'name', 'email', 'password', 'role', 'state', 'district', 'block', 'location']
    
    # We might need to ensure the order or just pass the dict if DictWriter handles it (it does if keys match fieldnames)
    # But clean the dict to only have known keys
    row = {k: new_user.get(k, '') for k in fieldnames}
    
    append_csv(current_app.config['USERS_FILE'], row, fieldnames)
    
    return jsonify({'success': True, 'user': new_user})
