import secrets
from flask_jwt_extended import JWTManager
from datetime import timedelta
from models import TokenBlocklist

jwt = JWTManager()

def init_jwt(app):
    app.config["JWT_SECRET_KEY"] = secrets.token_hex(16)
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt.init_app(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        jti = jwt_payload['jti']
        token = TokenBlocklist.query.filter_by(jti=jti).first()
        return token is not None