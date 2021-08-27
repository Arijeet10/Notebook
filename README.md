# Notebook

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/87312638/131119395-6eb21199-48f9-4b90-beb0-df9986c5b27e.gif)

# How to run the app

-install node.js in the pc

-create a MongoDB Atlas cluster(free or paid as your choice)

-download the project zip file and extract it

-open the project in code editor

-open the backend folder

-create a environment variable for connecting to your mongoDB database
  
    touch .env
    
-open the .env file and enter your database uri in MONGODB_SERVER variable

    MONGODB_SERVER="<your database uri>"
 
-after saving the environment variable, install required dependencies in backend folder
  
    npm install
    
-after installing run the server
  
    npm start

-go to frontend folder and install required dependencies
  
    cd frontend

    npm install
    
-run the react app in frontend folder
  
    npm start

