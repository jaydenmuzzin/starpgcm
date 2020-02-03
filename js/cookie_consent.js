function cookieConsent() {

    /* Cookie Consent
        The MIT License (MIT)

        Copyright © 2016 - 2019 · Osano, Inc., a Public Benefit Corporation

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */

    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#132442"
            },
            "button": {
                "background": "transparent",
                "text": "#f3cf22",
                "border": "#f3cf22"
            }
        },
        "content": {
            "message": "StarPG Character Manager uses cookies and browser local storage to ensure you have the best experience with the application.",
            "href": "#ccLearnMore",
            "target": '_self',
        },
        elements: {
            allow: '<button class="cc-btn cc-allow">Allow</button>',
            deny: '<button class="cc-btn cc-deny">Deny</button>',
        },
        revokeBtn:'<button class="cc-revoke cc-top cc-animate cc-color-override--508608226">Cookie Policy</button>',
        "position": "top",
        "static": true,
        "type": "opt-in",
        onInitialise: function (status) {
            var didConsent = this.hasConsented();
            if (!didConsent) {
                deleteCookies();
                localStorage.clear();
            }
        },
        onStatusChange: function(status, chosenBefore) {
            var didConsent = this.hasConsented();
            if (!didConsent) {
                deleteCookies();
                localStorage.clear();
            }
        },
        onRevokeChoice: function() {
            var type = this.options.type;
            if (type == 'opt-in') {
                deleteCookies();
                localStorage.clear();
            }
        }
    });

    /* End Cookie Consent */
}

function getCookie(name) {
    name = name + "=";
    let cookies = decodeURIComponent(document.cookie).split(';');

    for (const cookie of cookies) {
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
}

/* Delete cookies
    Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
    Modification of code by user Jan on StackOverflow / Named function, included cookieconsent_status check, small variable name and value changes
    Original code: https://stackoverflow.com/a/33366171
    Code author: https://stackoverflow.com/users/78639/jan
    Licensed under CC-Wiki: https://creativecommons.org/licenses/by-sa/3.0/
*/

function deleteCookies() {
    let cookies = decodeURIComponent(document.cookie).split('; ');

    for (let i = 0; i < cookies.length; i++) {
        let domain = window.location.hostname.split(".");

        while (domain.length > 0) {
            let cookieName = encodeURIComponent(cookies[i].split(";")[0].split("=")[0]);

            if (cookieName !== "cookieconsent_status") {
                let cookieBase = cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + domain.join('.') + ' ; path=';
                let path = location.pathname.split('/');

                document.cookie = cookieBase + '/';

                while (path.length > 0) {
                    document.cookie = cookieBase + path.join('/');
                    path.pop();
                };
            }

            domain.shift();
        }
    }
}

/* End delete cookies */
