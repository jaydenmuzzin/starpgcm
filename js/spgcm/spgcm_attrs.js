class Attributes extends React.Component {
    render() {
        return (
            <section>
                <header>
                    <h3>Attributes</h3>
                </header>

                <table id="attributes">
                    <thead>
                        <tr>
                            <th id="category">Category</th>
                            <th className="str">Str</th>
                            <th className="agi">Agi</th>
                            <th className="int">Int</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Racial</th>
                            <td>{this.props.attributes.raceStr}</td>
                            <td>{this.props.attributes.raceAgi}</td>
                            <td>{this.props.attributes.raceInt}</td>
                        </tr>
                        <tr>
                            <th>Profession</th>
                            <td>{this.props.attributes.profStr}</td>
                            <td>{this.props.attributes.profAgi}</td>
                            <td>{this.props.attributes.profInt}</td>
                        </tr>
                        <tr>
                            <th>Personality</th>
                            <td>{this.props.attributes.persStr}</td>
                            <td>{this.props.attributes.persAgi}</td>
                            <td>{this.props.attributes.persInt}</td>
                        </tr>
                        <tr>
                            <th>Skill Points</th>
                            <td>{this.props.attributes.skillStr}</td>
                            <td>{this.props.attributes.skillAgi}</td>
                            <td>{this.props.attributes.skillInt}</td>
                        </tr>
                    </tbody>
                    <tfoot id="attrTotals">
                        <tr>
                            <th>Total</th>
                            <td>{this.props.attributes.totalStr}</td>
                            <td>{this.props.attributes.totalAgi}</td>
                            <td>{this.props.attributes.totalInt}</td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        )
    }
}

class NewAttributes extends React.Component {
    constructor(props) {
        super(props);

        this.observer = new MutationObserver(this.mCallback);

        let race = this.props.gameData.races[this.props.generalInfo.race];
        let prof = this.props.gameData.professions[this.props.generalInfo.profession];
        let pers = this.props.gameData.personalities[this.props.generalInfo.personality];

        let totalStr = race.attributes.strength + prof.bonuses.strength + pers.bonuses.strength;
        let totalAgi = race.attributes.agility + prof.bonuses.agility + pers.bonuses.agility;
        let totalInt = race.attributes.intelligence + prof.bonuses.intelligence + pers.bonuses.intelligence;

        this.state = {
            raceStr: race.attributes.strength,
            raceAgi: race.attributes.agility,
            raceInt: race.attributes.intelligence,
            profStr: prof.bonuses.strength,
            profAgi: prof.bonuses.agility,
            profInt: prof.bonuses.intelligence,
            persStr: pers.bonuses.strength,
            persAgi: pers.bonuses.agility,
            persInt: pers.bonuses.intelligence,
            skillStr: 0,
            skillAgi: 0,
            skillInt: 0,
            totalStr: totalStr,
            totalAgi: totalAgi,
            totalInt: totalInt
        }

        this.handleAttrChanges();
    }

    componentDidMount() {
        let attrTotals = document.getElementById("attrTotals");

        let options = {
            characterData: true,
            subtree: true
        };

        this.observer.observe(attrTotals, options);

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let race = this.props.gameData.races[this.props.generalInfo.race];
            let prof = this.props.gameData.professions[this.props.generalInfo.profession];
            let pers = this.props.gameData.personalities[this.props.generalInfo.personality];

            let totalStr = race.attributes.strength + prof.bonuses.strength + pers.bonuses.strength;
            let totalAgi = race.attributes.agility + prof.bonuses.agility + pers.bonuses.agility;
            let totalInt = race.attributes.intelligence + prof.bonuses.intelligence + pers.bonuses.intelligence;

            this.setState({
                raceStr: race.attributes.strength,
                raceAgi: race.attributes.agility,
                raceInt: race.attributes.intelligence,
                profStr: prof.bonuses.strength,
                profAgi: prof.bonuses.agility,
                profInt: prof.bonuses.intelligence,
                persStr: pers.bonuses.strength,
                persAgi: pers.bonuses.agility,
                persInt: pers.bonuses.intelligence,
                skillStr: 0,
                skillAgi: 0,
                skillInt: 0,
                totalStr: totalStr,
                totalAgi: totalAgi,
                totalInt: totalInt
            });
        }
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    mCallback = (mutations) => {
        if (mutations[0].type === 'characterData') {
          this.handleAttrChanges();
        }
    }

    handleAttrChanges = () => {
        this.props.onChange({
            attrs: {
                raceStr: this.state.raceStr,
                raceAgi: this.state.raceAgi,
                raceInt: this.state.raceInt,
                profStr: this.state.profStr,
                profAgi: this.state.profAgi,
                profInt: this.state.profInt,
                persStr: this.state.persStr,
                persAgi: this.state.persAgi,
                persInt: this.state.persInt,
                skillStr: this.state.skillStr,
                skillAgi: this.state.skillAgi,
                skillInt: this.state.skillInt,
                totalStr: this.state.totalStr,
                totalAgi: this.state.totalAgi,
                totalInt: this.state.totalInt
            },
            abils: {
                health: this.state.totalStr * 10,
                damage: this.state.totalStr * 3,
                initiative: this.state.totalAgi,
                movement: this.state.totalAgi * 2,
                perception: this.state.totalInt * 2,
                science: this.state.totalInt * 2
            }
        });
    }

    render() {
        return (
            <section>
                <header>
                    <h3>Attributes</h3>
                </header>

                <table id="attributes">
                    <thead>
                        <tr>
                            <th id="category">Category</th>
                            <th className="str">Str</th>
                            <th className="agi">Agi</th>
                            <th className="int">Int</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Racial</th>
                            <td>{this.state.raceStr}</td>
                            <td>{this.state.raceAgi}</td>
                            <td>{this.state.raceInt}</td>
                        </tr>
                        <tr>
                            <th>Profession</th>
                            <td>{this.state.profStr}</td>
                            <td>{this.state.profAgi}</td>
                            <td>{this.state.profInt}</td>
                        </tr>
                        <tr>
                            <th>Personality</th>
                            <td>{this.state.persStr}</td>
                            <td>{this.state.persAgi}</td>
                            <td>{this.state.persInt}</td>
                        </tr>
                        <tr>
                            <th>Skill Points</th>
                            <td>{this.state.skillStr}</td>
                            <td>{this.state.skillAgi}</td>
                            <td>{this.state.skillInt}</td>
                        </tr>
                    </tbody>
                    <tfoot id="attrTotals">
                        <tr>
                            <th>Total</th>
                            <td>{this.state.totalStr}</td>
                            <td>{this.state.totalAgi}</td>
                            <td>{this.state.totalInt}</td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        )
    }
}
