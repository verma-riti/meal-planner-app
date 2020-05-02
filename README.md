## Tata aig
###Purpose of this project is token based authentication and maintain the user's daily meal plan .

##PRoject setup Backend

###PRoject setup locally
        ## Create django project 
        `django-admin startproject dashboard`

        ## Clone the Repository
        `git clone https://github.com/riti12345/token_based_authentication.git`

        ## SetUp projects development environment
        - Create Virtualenv
        `mkvirtualenv --python=`which python3` dash_venv`

        - Activate virtual environment
        `workon dash_venv`

        - Install pip requirements
        `pip install -r requirements.txt`


        - Run project locally
        `python manage.py runserver

        - Run project on staging server
        `python manage.py runserver --settings=config.settings.base`

        - Run project on production server
        `python manage.py runserver --settings=config.settings.production`



##PRoject setup Frontend

###PRoject setup locally
     ## Create react  project 
    `npx create-react-app dashboard`

    ## Clone the Repository
        `git clone https://github.com/riti12345/token_based_authentication.git`

    ## install all the npm files and run on local server
    `npm i && npm start`

