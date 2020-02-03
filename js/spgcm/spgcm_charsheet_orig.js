class CharacterSheet extends React.Component {
    /* newlyCreated flag
      newCharacter object,
      updates to child components updated here
     */
     constructor(props) {
         super(props);

         let selectedStats = {
             race: "Human"
         }

         this.state = {
             isFetching: true,
             selectedStats: selectedStats
         }
     }

    creationStats = {}

    componentDidMount() {/* To be moved inside NewCharacterSheet component */
        if (this.props.existingStats == "") {
            fetch("/js/spgcm/creation_stats.json")
            .then(response => response.json())
            .then(data => {
                this.creationStats = data;
                //console.log(this.creationStats);
                this.setState({isFetching: false});
            })
            .catch(error => console.error(error));
        } else {
            this.setState({isFetching: false});
            console.log("Didn't load creation stats");
            console.log(this.props.existingStats);
        }
    }

    handleSelectedStatChanges = (stats) => {
        let newSelectedStats = Object.assign(this.state.selectedStats, stats);

        this.setState({
            selectedStats: newSelectedStats
        });
        console.log(this.state);
    }

    render() {
        console.log(this.state);
        if (this.state.isFetching) return null;
        return (
            <div>
                <h2>{this.props.existingStats != "" ? "Name" : "New character" }</h2>
                {this.props.existingStats != "" ? (
                    <React.Fragment>
                        {/*ExistingCharacterSheet component - newlyCreated flag, save functionality within*/}
                        {/*<GeneralInformation name={this.props.existingStats.gi.name} />*/}
                        <GeneralInformation name="John" />
                        <Attributes />
                        <CoreAbilities />
                        <Reputations />
                        <Inventory />
                        <SkillsModifications />
                    </React.Fragment>
                 ) : (
                    <React.Fragment> {/*NewCharacterSheet component - create functionality within*/}
                        <NewGeneralInformation initStats={this.creationStats} selectedStats={this.state.selectedStats} onChange={this.handleSelectedStatChanges}/>
                        <NewAttributes />
                        <NewCoreAbilities />
                    </React.Fragment>
                 )}
            </div>
        )
    }
}
