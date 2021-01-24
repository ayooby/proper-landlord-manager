# LANDLORD Manager#

Modern property management tool for landlords, property managers, and renters. It allows landlords to track thier buildings, apartments and tenants information in much better way.

**Stack**

* Backend: [Django REST Framework](http://www.django-rest-framework.org/)
* React [React](https://reactjs.org/) on the client side
* React-Strap [Based on Twitter's Boostrap 4](https://reactstrap.github.io/)

# Getting started #

Install [python3](http://python.org/) and [nodejs](http://nodejs.org/)  globally, then perform the below steps to setup the backend.

```
git clone https://github.com/ayooby/proper-landlord-manager.git
```

**Backend**

```
cd server
pip install -r requirements.txt
python manage.py runserver
```

To make sure everything is running, go to [Api-docs](http://localhost:8000/docs/) to see Api documentations.

**Frontend**

```
cd frontend
yarn install
yarn start
```

Navigate to `http://localhost:3000/`.
You can login with the default landlord user/pass `user/123` to see landlord dashboard.

**Frontend Testing**

To run tests for frontend application you just have to run `yarn test` command.