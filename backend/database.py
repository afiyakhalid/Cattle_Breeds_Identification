import asyncpg

async def connect_to_database():
    conn = await asyncpg.connect(
        user="your_user",
        password="your_password",
        database="your_database",
        host="localhost",
    )
    return conn