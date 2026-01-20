import os
import subprocess
import pickle
import sqlite3
import requests

def run_command():
    user_input = input("Enter a command: ")
    os.system(user_input)  # ⚠️ Command injection

def run_subprocess():
    cmd = input("Enter subprocess command: ")
    subprocess.call(cmd, shell=True)  # ⚠️ Shell injection

def insecure_deserialization():
    data = input("Enter serialized data: ")
    pickle.loads(data)  # ⚠️ Arbitrary code execution

def sql_injection():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    username = input("Enter username: ")
    query = f"SELECT * FROM users WHERE name = '{username}'"  # ⚠️ SQL injection
    cursor.execute(query)
    print(cursor.fetchall())

def insecure_request():
    url = input("Enter URL: ")
    response = requests.get(url, verify=False)  # ⚠️ Insecure HTTPS request
    print(response.text)

if __name__ == "__main__":
    run_command()
    run_subprocess()
    insecure_deserialization()
    sql_injection()
    insecure_request()
