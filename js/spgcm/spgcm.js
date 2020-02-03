function StarPGCharacterManager () {
    const destination = document.getElementById("app");

    document.onkeydown = function(e) {
        if (event.keyCode == 123) {
            return false;
        }

        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }

        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }

        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }

        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    }

    function CustomError(name, message) {
        return {
            name: name,
            message: message
        }
    }

    function extractJson(content) {
        let json = JSON.parse(content);

        let stats = json.stats;
        let skillPoints = json.skillPoints;
        let rep = json.rep;
        let inv = json.inv;
        let skillsnmods = json.skillsnmods;
        let skills;
        let mults;

        if (skillsnmods != undefined) {
            skills = json.skillsnmods.skills;
            mults = json.skillsnmods.mults;
        }

        if (stats == undefined || !(stats instanceof Object) ||
            skillPoints == undefined || typeof skillPoints != "number" ||
            rep == undefined || !(rep instanceof Object) ||
            inv == undefined || !(inv instanceof Array) ||
            !(skillsnmods instanceof Object) ||
            skills == undefined || !(skills instanceof Array) || skills.length > 2 ||
            mults == undefined || !(mults instanceof Array)
        ){
            throw new Error();
        }

        return json;
    }

    async function getCharacterSheet(content) {
        try {
            return await extractJson(content);
        }
        catch(err) {
            if (err.name == "SyntaxError") {
                throw new CustomError("FormatError", "Incompatible format. Please ensure the character sheet file is in JSON format e.g. characterSheet.json");
            } else {
                throw new CustomError("NotCharacterSheetFileError", "File loaded is not a StarPG character sheet. Please try loading again, or create a new character sheet.");
            }
        }
    }

    class StarPGCharacterManager extends React.Component {

        constructor() {
            super();

            let hasCharSheet = false;
            let showExChar = false;
            let stats = {};
            let skillPoints = 0;
            let rep = {};
            let inv = [];
            let skillsnmods = {
                skills: [{}, {}],
                mults: []
            };

            let cookieConsent = getCookie("cookieconsent_status");

            if (cookieConsent == "allow") {
                let charSheet = JSON.parse(localStorage.getItem('charSheet'));

                if (charSheet) {
                    hasCharSheet = true;
                    showExChar = true;
                    stats = charSheet.stats,
                    skillPoints = charSheet.skillPoints,
                    rep = charSheet.rep,
                    inv = charSheet.inv,
                    skillsnmods = charSheet.skillsnmods
                }
            }

            this.state = {
                menuActive: true,
                hasCharSheet: hasCharSheet,
                showExChar: showExChar,
                isFetchingGameData: true,
                errorMessage: "",
                stats: stats,
                skillPoints: skillPoints,
                rep: rep,
                inv: inv,
                skillsnmods: skillsnmods
            };
        }

        gameData = {};

        handleBackClick = () => {
            this.setState({
                menuActive: true
            });
        }

        handleNewChar = () => {
            this.setState({
                menuActive: false,
                showExChar: false
            });
        }

        handleNewCharCreation = (stats) => {
            let newCharStats = {
                generalInfo: stats.generalInfo,
                attributes: stats.attributes,
                abilities: stats.abilities
            };

            this.setState({
                stats: newCharStats,
                skillPoints: 0,
                rep: {},
                inv: [],
                skillsnmods: {
                    skills: [{}, {}],
                    mults: []
                },
                hasCharSheet: true,
                showExChar: true
            });
        }

        handleFileInputClick = () => {
            document.getElementById('charSheetFileInput').click();
        }

        handleFileUpload = () => {
            var fileInput = document.getElementById("charSheetFileInput");
            var charSheetFile = fileInput.files[0];
            var charSheetFileread = new FileReader();

            charSheetFileread.onload = (e) => {
                getCharacterSheet(e.target.result)
                .then((existingCharSheet) => {
                    this.setState({
                        menuActive: false,
                        hasCharSheet: true,
                        showExChar: true,
                        stats: existingCharSheet.stats,
                        skillPoints: existingCharSheet.skillPoints,
                        rep: existingCharSheet.rep,
                        inv: existingCharSheet.inv,
                        skillsnmods: existingCharSheet.skillsnmods
                    });
                })
                .catch((err) => {
                    if ((err.name == "FormatError") || (err.name == "NotCharacterSheetFileError")) {
                        //alert(err.message);
                        this.setState({
                            errorMessage: err.message
                        });
                    } else {
                        console.error(err);
                    }
                })

                fileInput.value = null;
            };

            charSheetFileread.readAsText(charSheetFile);
        }

        showChar = () => {
            this.setState({
                menuActive: false,
                showExChar: true
            });
        }

        ccLearnMoreHeading = "Cookie Policy";
        ccLearnMoreContent = "This application utilises cookies and the local storage of the browser to enhance the experience of the user.\n\nIn the event of the user allowing or denying the use of cookies, the application stores a cookie to indicate this allowance or denial. This allowed or denied consent informs the application whether it is allowed to use cookies and the local storage of the browser.\n\nIf allowed, the application stores the current data of the active character sheet being used in the local storage of the browser. This is done out of convenience for the user to prevent loss of new character sheet data should they reload or close the browser without having saved the character sheet to a file. It also affords the user the convenience of continuing with their character sheet when they next load the application without them having to load a saved character sheet file.\n\nIf the user denies the use of cookies, cookies (except the consent cookie) and the local storage of the browser are not used. The user can revoke their cookie consent at any time by clicking the tab at the top-left of the screen.";

        renderCCPopup = () => {
            return <Popup id="ccLearnMore" heading={this.ccLearnMoreHeading} content={this.ccLearnMoreContent} buttons="Okay" />;
        }

        renderErrPopup = () => {
            if (this.state.errorMessage) {
                let buttons = [
                    {
                        onClick: () => {this.setState({errorMessage: ""});}
                    }
                ];

                return <Popup id="errorPopup" heading="Error occured" content={this.state.errorMessage} buttons={buttons} />;
            }
            return "";
        }

        renderMenu = () => {
            return (
                <React.Fragment>
                    <nav className="flex-ctr-container">
                        {this.state.hasCharSheet ? <Button onClick={this.showChar} text="Continue" /> : "" }

                        <Button onClick={this.handleNewChar} text="Create character sheet" />

                        <Button onClick={this.handleFileInputClick} text="Load character sheet" />
                        <input id="charSheetFileInput" name="charSheetFileInput" className="d-none" type="file" onChange={this.handleFileUpload} />
                    </nav>
                </React.Fragment>
            );
        }

        componentDidMount() {
            fetch("js/spgcm/gameData.json")
            .then(response => response.json())
            .then(data => {
                this.gameData = data;
                this.setState({isFetchingGameData: false});
            })
            .catch(error => console.error(error));
        }

        componentDidUpdate() {
            if (this.state.errorMessage != "") {
                window.location.hash = "errorPopup";
            }
        }

        render() {
            if (this.state.isFetchingGameData) return null;
            return (
                <div className="justify-content-center">
                    <div className="spgcm">
                        {this.renderCCPopup()}
                        {this.renderErrPopup()}

                        <h1 className="align-center">StarPG Character Manager</h1>

                        {this.state.menuActive ? (
                            this.renderMenu()
                        ) : (
                            this.state.hasCharSheet && this.state.showExChar ?
                            <ExistingCharacterSheet gameData={this.gameData} charStats={this.state.stats} skillPoints={this.state.skillPoints} rep={this.state.rep} inv={this.state.inv} skillsnmods={this.state.skillsnmods} handleBackClick={this.handleBackClick} /> :
                            <NewCharacterSheet gameData={this.gameData} newCharCreation={this.handleNewCharCreation} handleBackClick={this.handleBackClick} />
                        )}
                    </div>
                </div>
            )
        }
    }

    ReactDOM.render(
        <StarPGCharacterManager />,
        destination
    );
}

if (document.readyState !== 'loading') {
    cookieConsent();
    StarPGCharacterManager();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        cookieConsent();
        StarPGCharacterManager();
    });
}
