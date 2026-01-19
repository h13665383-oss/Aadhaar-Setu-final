from flask import Blueprint, jsonify, current_app
from utils import read_csv

api_bp = Blueprint('api', __name__)

@api_bp.route('/dashboard/data', methods=['GET'])
def get_dashboard_data():
    records = read_csv(current_app.config['RECORDS_FILE'])
    users = read_csv(current_app.config['USERS_FILE'])
    
    # Map user id to user info for aggregation
    user_map = {u['id']: u for u in users}
    
    state_counts = {}
    district_counts = {}
    
    for r in records:
        u_id = r.get('user_id')
        user = user_map.get(u_id)
        if user:
            st = user.get('state')
            if not st: st = 'Unknown'
            dist = user.get('district')
            if not dist: dist = 'Unknown'
            
            state_counts[st] = state_counts.get(st, 0) + 1
            district_counts[dist] = district_counts.get(dist, 0) + 1
            
    states_data = []
    for st, count in state_counts.items():
        states_data.append({
            "name": st,
            "enrollments": count,
            "age_0_5": int(count * 0.1),
            "age_5_17": int(count * 0.3),
            "age_18_greater": int(count * 0.6),
            "districts": 1
        })
        
    districts_data = []
    for d, count in district_counts.items():
        districts_data.append({
            "name": d,
            "state": "Unknown", # Simplified
            "enrollments": count,
            "age_0_5": int(count * 0.1),
            "age_5_17": int(count * 0.3),
            "age_18_greater": int(count * 0.6),
        })
    
    # Ensure at least some data structure matches what frontend expects even if empty
    if not states_data:
        states_data = []
    if not districts_data:
        districts_data = []

    # Simple trend
    trends = [{"name": "Current", "value": len(records)}]

    return jsonify({
        "states": states_data,
        "districts": districts_data,
        "trends": trends
    })
