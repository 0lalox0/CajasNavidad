from pymongo import MongoClient

db_client = MongoClient("mongodb://admin:adminpassword@mongodb:27017").local

# db_client = MongoClient()
