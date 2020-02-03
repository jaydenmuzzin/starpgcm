# StarPGCM
StarPG Character Manager prototype for StarPG Roleplaying game created by Lachlan Spears

## Requirements
To use this application, you will require a web server. You can then access the application by running the HTML file on that server.

[This guide](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server) demonstrates how you can install a local web server on your machine and run a HTML file on the server.

## Using the application
To use the application:
  1. Ensure the active branch of this repository is 'master'
  2. Click the 'Clone or download' dropdown
  3. Click 'Download ZIP'
  4. Download the repo to your chosen destination
  5. Extract the contents of the file to your chosen destination
  6. Open your desired terminal application and navigate to the extracted repository directory
  7. Run your server (If using the python http.server mentioned in the guide above, it will be the following command: python -m http.server)
  8. Run the HTML document (If using the python http.server mentioned in the guide above, it will be accessible at the following address: localhost:8000/starpgcharmanager.html)

## Known issues
- The application is incompatible with all versions of Internet Explorer. Being a purely front-end application, I am unable to install a polyfill that would fix this issue. However, plans are in place to convert the manager into a full-stack application. In the meanwhile, please use another web browser.
- There is currently a bug whereby the weight range does not load for the Aquarines race. This is being investigated.
- There is currently a bug with the loading of skills in Microsoft Edge. This is being investigated.
