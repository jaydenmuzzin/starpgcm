class NewCharacterSheet extends React.Component {

    showInvNamePopup = false;

    constructor(props) {
        super(props);

        let generalInfo = {
            race: "human",
            profession: "pilot",
            personality: "healer"
        };

        this.state = {
            generalInfo: generalInfo,
            attributes: {},
            abilities: {}
        };
    }

    handleGeneralInfoChanges = (generalInfo) => {
        let newGeneralInfo = Object.assign({...this.state.generalInfo}, generalInfo);

        this.setState({
            generalInfo: newGeneralInfo
        });
    }

    handleStatChanges = (stats) => {
        let newAttributes = Object.assign({...this.state.attributes}, stats.attrs);
        let newAbilities = Object.assign({...this.state.abilities}, stats.abils);

        this.setState({
            attributes: newAttributes,
            abilities: newAbilities
        });
    }

    createChar = () => {
        if (this.state.generalInfo.name) {
            this.props.newCharCreation(this.state);
        } else {
            this.showInvNamePopup = true;
            this.forceUpdate();
        }
    }

    renderInvNamePopup = () => {
        if (this.showInvNamePopup) {
            let buttons = [
                {
                    onClick: () => {this.showInvNamePopup = false;},
                    dismiss: true
                }
            ];

            return <Popup id="invNamePopup" heading="Invalid name" content="Please enter a valid name for your character." buttons={buttons} />;
        }
        return "";
    }

    componentDidUpdate() {
        if (this.showInvNamePopup) {
            window.location.hash = "invNamePopup";
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderInvNamePopup()}

                <header>
                    <Button onClick={this.props.handleBackClick} text="Back" classes="btn-back" />
                    <h2 className="view-heading">New character</h2>
                </header>

                <div id="first-row">
                    <NewGeneralInformation gameData={this.props.gameData} generalInfo={this.state.generalInfo} onChange={this.handleGeneralInfoChanges}/>
                </div>

                <div id="second-row" className="flex-ctr-container">
                    <NewAttributes gameData={this.props.gameData} generalInfo={this.state.generalInfo} onChange={this.handleStatChanges}/>
                    <NewCoreAbilities abilities={this.state.abilities} />
                </div>

                <div className="justify-content-center">
                    <Button onClick={this.createChar} text="Create" classes="btn-submit" />
                </div>
            </React.Fragment>
        )
    }
}
