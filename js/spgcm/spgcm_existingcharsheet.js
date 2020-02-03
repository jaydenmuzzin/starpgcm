class ExistingCharacterSheet extends React.Component {

    static reqSPFirstSkill = 10;

    constructor(props) {
        super(props);

        try {
            let skillPoints = this.props.skillPoints;
            let rep = this.props.rep;
            let inv = this.setInv(this.props.inv);
            let skillsnmods = this.props.skillsnmods;

            this.state = {
                skillPoints: skillPoints,
                rep: rep,
                inv: inv,
                skillsnmods: skillsnmods
            }
        } catch (err) {
            console.error(err);
        }
    }

    storeCharSheet = () => {
        let cookieConsent = getCookie("cookieconsent_status");

        if (cookieConsent == "allow") {
            let charSheet = {
                stats: this.props.charStats,
                skillPoints: this.state.skillPoints,
                rep: this.state.rep,
                inv: this.state.inv,
                skillsnmods: this.state.skillsnmods
            };

            localStorage.setItem('charSheet', JSON.stringify(charSheet));
        }
    }

    componentDidMount() {
        this.storeCharSheet();
    }

    componentDidUpdate() {
        this.storeCharSheet();
    }

    setInv = (propData) => {
        let gameData = [];
        let gameDataLength = 9;

        if ((propData.length != gameDataLength) && (propData.length > 0)) {
            gameDataLength = propData.length;
        }

        for (let i = 0; i < gameDataLength; i++) {
            gameData.push(propData[i] ? propData[i] : "");
        }

        return gameData;
    }

    handleSPChange = (e) => {
        this.setState({
            skillPoints: parseInt(e.target.value)
        });
    }

    saveChar = (e) => {
        let charSheet = {
            stats: this.props.charStats,
            skillPoints: this.state.skillPoints,
            rep: this.state.rep,
            inv: this.state.inv,
            skillsnmods: this.state.skillsnmods
        };

        e.target.href = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(charSheet));
        e.target.download = (`${this.props.charStats.generalInfo.name}_${this.props.charStats.generalInfo.race}_${this.props.charStats.generalInfo.profession}_${this.props.charStats.generalInfo.personality}`).replace(/\s/g, '').toLowerCase();
    }

    modifyRep = (e) => {
        e.persist();

        let rep = {...this.state.rep};
        let itemName = e.target.id.replace("rep-","");

        rep[itemName] = e.target.value;

        this.setState({
            rep: rep
        });
    }

    modifyInvItem = (e) => {
        e.persist();

        let inv = [...this.state.inv];
        let itemNo = e.target.id.replace("invItem-","");

        inv[itemNo] = e.target.value;

        this.setState({
            inv: inv
        });
    }

    modifySkillsnMods = (skillsnmods) => {
        let newSkillsnMods = Object.assign({...this.state.skillsnmods}, skillsnmods);

        this.setState({
            skillsnmods: newSkillsnMods
        });
    }

    handleKeypress = (e) => {
        if (e.key != "Down" && e.key != "ArrowDown" && e.key != "Up" && e.key != "ArrowUp" && e.key != "Tab" && e.key != "Shift") {
            e.preventDefault();
        }
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <Button onClick={this.props.handleBackClick} text="Back" classes="btn-back" />
                    <h2 className="view-heading">{this.props.charStats.generalInfo.name}</h2>
                </header>

                <GeneralInformation gameData={this.props.gameData} generalInfo={this.props.charStats.generalInfo} />

                <div id="second-row" className="flex-ctr-container">
                    <Attributes attributes={this.props.charStats.attributes} />
                    <CoreAbilities abilities={this.props.charStats.abilities} />
                </div>

                <div className="spacer flex-center">
                    <label htmlFor="numSkillPoints"><h3>Skill Points</h3></label>
                    <input id="numSkillPoints" name="numSkillPoints" type="number" min="0" defaultValue={this.state.skillPoints} onKeyDown={(e) => this.handleKeypress(e)} onBlur={(e) => this.handleSPChange(e)} />
                </div>

                <div id="third-row" className="half-spacer">
                    <Reputations gameData={this.props.gameData} rep={this.state.rep} onKeyDown={this.handleKeypress} onChange={this.modifyRep} />
                    <Inventory inv={this.state.inv} onChange={this.modifyInvItem} />
                </div>

                <div id="fourth-row" className="spacer">
                    {this.state.skillPoints >= ExistingCharacterSheet.reqSPFirstSkill ?
                        <SkillsModifications gameData={this.props.gameData} skillPoints={this.state.skillPoints} skillsnmods={this.state.skillsnmods} onChange={this.modifySkillsnMods} /> :
                        ""
                    }
                </div>

                <div className="justify-content-center">
                    <a type="button" role="button" className="btn btn-submit" onClick={(e) => {this.saveChar(e)}}>
                        Save
                    </a>
                </div>
            </React.Fragment>
        )
    }
}
