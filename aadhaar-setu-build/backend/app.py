from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp
from routes.api import api_bp
import os

import logging

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.abspath(
    os.path.join(BASE_DIR, os.pardir, "frontend", "dist")
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder=None)
app.config.from_object(Config)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(api_bp, url_prefix="/api")


def _index_response():
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(FRONTEND_DIST, "index.html")
    return (
        "Frontend build not found. Please run 'npm run build' in the frontend directory.",
        404,
    )


@app.route("/", strict_slashes=False)
def root():
    return _index_response()


@app.route("/assets/<path:filename>")
def serve_assets(filename):
    asset_dir = os.path.join(FRONTEND_DIST, "assets")
    logger.info(f"Serving asset: {filename} from {asset_dir}")
    return send_from_directory(asset_dir, filename)


@app.route("/<path:path>", strict_slashes=False)
def spa_routes(path):
    candidate_path = os.path.join(FRONTEND_DIST, path)
    logger.info(f"SPA route: {path}, candidate: {candidate_path}")
    if os.path.isfile(candidate_path):
        return send_from_directory(FRONTEND_DIST, path)
    return _index_response()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=False)
