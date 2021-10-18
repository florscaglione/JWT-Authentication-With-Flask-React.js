"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS

from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Create flask app
api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None: # si no encuentra al user en la BBDD:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Quiero crear usuarios:
@api.route('/register', methods=['POST'])
def register():
    json = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar qué usuario estamos creando
    
    if json is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

    email = json.get("email") # cogemos el email QUE HA INTRODUCIDO el usuario (lo mismo con el password)
    password = json.get("password")

    user = User(email=email, password=password, is_active=True) # creamos el usuario: significa que llene la columna email (1er "email") con lo que se haya escrito como email (2o email), y lo mismo con el password

    user.save()  # llamo a la función "save" (está en los modelos) para guardar el usuario en la BBDD

    return jsonify(user.serialize()), 200 



@api.route("/hello", methods=["GET"])
@jwt_required()   #con este decorador consigo que sólo puedan acceder las personas que envían un token en la solicitud (GET)
def get_hello():
    email = get_jwt_identity()  #busca el email que coincida con el "identity" que hemos usado en el create_access_token
    
    return jsonify({"message": "Hello " + email}) 