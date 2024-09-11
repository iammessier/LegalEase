from flask import Blueprint, jsonify, request
from models import ChatMessage, db

chat_blueprint = Blueprint('chat', __name__)

@chat_blueprint.route('/messages', methods=['GET'])
def get_messages():
    messages = ChatMessage.query.all()
    return jsonify([{
        'sender': msg.sender,
        'message': msg.message,
        'timestamp': msg.timestamp
    } for msg in messages])

@chat_blueprint.route('/messages', methods=['POST'])
def post_message():
    data = request.get_json()
    new_message = ChatMessage(sender=data['sender'], message=data['message'])
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message': 'Message sent successfully'}), 201
