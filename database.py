from sqlalchemy import create_engine, Column, Integer, String, Date, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

class Movie(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    director = Column(String)
    release_date = Column(Date)
    rating = Column(Float)

def db_connect():
    return create_engine(os.getenv("DATABASE_URL"))

def create_movie_table(engine):
    Base.metadata.create_all(engine)

def initialize_db():
    engine = db_connect()
    create_movie_table(engine)
    Session = sessionmaker(bind=engine)
    return Session()