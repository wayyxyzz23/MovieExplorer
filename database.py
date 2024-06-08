from sqlalchemy import create_engine, Column, Integer, String, Date, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

Base = declarative_base()

class Movie(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primaryKey=True)
    title = Column(String)
    description = Column(String)
    director = Column(String)
    releaseDate = Column(Date)
    rating = Column(Float)

def connectToDatabase():
    return create_engine(os.getenv("DATABASE_URL"))

def createMoviesTable(databaseEngine):
    Base.metadata.createAll(databaseEngine)

def initializeDatabase():
    engine = connectToDatabase()
    createMoviesTable(engine)
    sessionFactory = sessionmaker(bind=engine)
    return sessionFactory()