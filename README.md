# Get started

Make sure you have newest version of Python 3.7.x and pip installed ([Guide]( https://www.makeuseof.com/tag/install-pip-for-python/))

## Installation

Clone the project to your machine with:


```bash
git clone https://github.com/tsm121/Lavabantur.git
```

### Setup and activate virtual environment
Locate the folder of the project and use cd in the command line (Example: /Users/Username/Lavabantur) and run the commands below  
```bash
pip install virtualenv
```
```bash
virtualenv -p python3 env
```
```bash
source env/bin/activate
```

### Install Python requirements
```bash
pip install -r requirements.txt
```
### Migrate database
cd into the lavabantur folder and run:
```bash
python manage.py migrate
```
### Start server
Check that everything so far is working by starting the Django server.
```bash
python manage.py runserver
```

### Install React for the frontend parts
Download Node.js from
[here]( https://nodejs.org/en/download/) and install it in Lavabantur/lavabantur/frontend
When installed run this command and check that the server starts
```bash
npm start
```
### Start React server
cd into the Lavabantur/lavabantur/frontend and run
```bash
npm start
```

## Git Guide
Try to always pull before pushing a commit.
Useful commands:
#### Download the latest version of the project from Github:
```bash
git pull
```
#### See status of local version vs. current version on git:
```bash
git status
```
#### Add changes ready for commit:

All files:
```bash
git add .
```
Specific file:
```bash
git add -p <file>
```

#### Commit changes with message:
```bash
git commit -m "Message here"
```

#### Push committed changes to git:
```bash
git push
```

## Django commands
Create a superuser (admin):
```bash
python manage.py createsuperuser
```
Add migrations to the database:
```bash
python manage.py makemigrations
```
Add migrate the database:
```bash
python manage.py migrate
```
