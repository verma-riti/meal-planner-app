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

## Project Permission 
    If User is not logged in he can see list of all the meals but he can't do any actions: 
        1. User can not add meal (he will not able to see add button)
        2. User can not edit or delete meals (he will only see login link in actions column)
        3. User can search the meals

    If User is logged in : 
        1. User can Add meals (he/she can be able see the add meal button )
        2. User can edit or delete his/her meals (he/she will be able to see edit/delete button) 
        3. User can not edit or delete others meals (in actions buttons he will see you don't have permissions button)

