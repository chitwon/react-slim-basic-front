demo:  http://mathcart.com/react-slim-basic-front/student-hw   

# MathCart React Slim Skeleton - A good starting point for react front end with google login to protect routes from a slim php backend API

  - Started with Create React App
  - Added Material UI for style components
  - Set up to work with
    - react-google-login maintained through redux-thunk
    - Easily integrate with SLIM PHP backend API including protected routes (the slim API is a separate repo)
  
# Motivation to create this repo? 
I develop applications for students to learn math. React is great for creating interactive pages in the front, and works well with a JSON API to transfer data to the backend. One basic functionality that most every site desires is to manage user access to resources. So I wanted to develop a good starting point to do just that. Once established, back end routes can be protected by verifying the API token per request. 

# Meant to serve as a basic starting point with...
react-google-login (which I exchange for SLIM PHP token)
redux-thunk
material-ui
react-router

# Connect to the backend

The react front end is agnostic to the API backend, however I have set up another repo with a SLIM PHP instance that works seamlessly. The user initiates a google authorization through the front end. The front end sends a request to the SLIM backend. The SLIM backend behind the scenes communicates with google to verify the request, and then produces its own token to pass back down to the client. 


# make it work for you

Should be easy, although I have never tried it. For this front end react part, I would think..clone it, npm install it,  set up  https://console.developers.google.com  OAuth 2.0 web client for your conditions, add your client id in src\services\google.js.  

After that, you need to set up the backend. I used a SLIM application  that I have linked, you can view that repo for more information. Whatever backend API you set up, you need to include the appropriate URLs in the .env files here, both production and development. 
 
