# StarPGCM
StarPG Character Manager prototype for StarPG Roleplaying game created by Lachlan Spears

## License
Please acknowledge the license of this software outlined in the "LICENSE.md" file located in the root of this repository.

## Requirements
To use this application, you will require a web server. You can then access the application by running the HTML file on that server.

[This guide](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server) demonstrates how you can install a local web server on your machine and run a HTML file on the server.

## Cookie Usage
The application utilizes cookies and the local storage of the browser. The reasons for this are explained in detail in the cookie policy modal reachable via the cookie consent bar of the application. The cookiepolicy.md file in the root of this repository also contains a copy of the text.

However, if your website utilizes cookies from third-party services, it is your responsibility to provide a separate or extended cookie consent solution. I, Jayden Muzzin, Lachlan Spears and the associates of this application and repository are by no means liable for the consequences pertaining to not providing an adeqaute cookie consent solution.

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
