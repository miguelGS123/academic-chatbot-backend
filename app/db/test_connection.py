from sqlalchemy import text

from app.db.database import engine

try:
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT 1")
        )

        print("Database connected successfully")

except Exception as e:
    print("Connection error:", e)