from flask import Blueprint, jsonify
from models import LegalAdvice

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/advices', methods=['GET'])
def get_advices():
    advices = LegalAdvice.query.all()
    return jsonify([{
        'title': advice.title,
        'content': advice.content,
        'lawyer': advice.lawyer_name
    } for advice in advices])
