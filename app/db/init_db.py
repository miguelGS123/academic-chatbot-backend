from app.db.database import Base, engine

from app.models.user_model import User

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully")