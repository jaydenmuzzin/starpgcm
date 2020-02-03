class GeneralInformation extends React.Component {
    render() {
        return (
            <section>
                <header className="justify-content-center">
                    <h3>General Information</h3>
                </header>

                <div className="flex-ctr-container">
                    <table id="gi-existing" className="gi">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="gi-name">Name:</label>
                                    <span name="gi-name">{this.props.generalInfo.name}</span>
                                </td>
                                <td>
                                    <label htmlFor="gi-height">Height:</label>
                                    <span name="gi-height">{this.props.generalInfo.height}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="gi-race">Race:</label>
                                    <span name="gi-race">{this.props.gameData.races[this.props.generalInfo.race].name}</span>
                                </td>
                                <td>
                                    <label htmlFor="gi-weight">Weight:</label>
                                    <span name="gi-weight">{this.props.generalInfo.weight}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="gi-profession">Profession:</label>
                                    <span name="gi-profession">{this.props.gameData.professions[this.props.generalInfo.profession].title}</span>
                                </td>
                                <td>
                                    <label htmlFor="gi-personality">Personality:</label>
                                    <span name="gi-personality">{this.props.gameData.personalities[this.props.generalInfo.personality].title}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="gi-upbringing">Upbringing:</label>
                                    <span name="gi-upbringing">{this.props.gameData.upbringings[this.props.generalInfo.upbringing].title}</span>
                                </td>
                                <td>
                                    <label htmlFor="gi-alignment">Alignment:</label>
                                    <span name="gi-alignment">{this.props.generalInfo.alignment}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class NewGeneralInformation extends React.Component {

    constructor(props) {
        super(props);

        var heightOptions = this.detHeightOptions(this.props.gameData.races[this.props.generalInfo.race]);
        var weightOptions = this.detWeightOptions(this.props.gameData.races[this.props.generalInfo.race]);

        this.state = {
            heightOptions: heightOptions,
            weightOptions: weightOptions,
        }
    }

    componentDidMount() {
        this.updateStats();
    }

    updateStats = () => {
        let name = document.getElementById("gi-name").value;
        let height = document.getElementById("gi-height").value;
        let weight = document.getElementById("gi-weight").value;
        let profession = Object.keys(this.props.gameData.professions).find(key => this.props.gameData.professions[key].title === document.getElementById("gi-profession").value);
        let personality = Object.keys(this.props.gameData.personalities).find(key => this.props.gameData.personalities[key].title === document.getElementById("gi-personality").value);
        let upbringing = Object.keys(this.props.gameData.upbringings).find(key => this.props.gameData.upbringings[key].title === document.getElementById("gi-upbringing").value);
        let alignment = document.getElementById("gi-alignment").value;

        this.props.onChange({
            name: name,
            height: height,
            weight: weight,
            profession: profession,
            personality: personality,
            upbringing: upbringing,
            alignment: alignment
        });
    }

    detHeightOptions = (race) => {
        let minHeightStr = race.physicals.height.minHeight;
        let maxHeightStr = race.physicals.height.maxHeight;

        let minHeightFeet = minHeightStr.split("\'")[0];
        let minHeightInches = minHeightStr.split("\'")[1].split("\"")[0];
        let maxHeightFeet = maxHeightStr.split("\'")[0];
        let maxHeightInches = maxHeightStr.split("\'")[1].split("\"")[0];

        let key = 1;
        let heights = [];

        for (let foot = maxHeightFeet; foot >= minHeightFeet; foot--){
            for (let inches = (foot == maxHeightFeet ? maxHeightInches : 11); inches >= 0; inches--){
                heights.push({
                    key: key,
                    value: `${foot}' ${inches}\"`
                });

                key++;

                if (foot == minHeightFeet && inches == minHeightInches) {
                    return heights;
                }
            }
        }
    }

    detWeightOptions = (race) => {
        let minWeightStr = race.physicals.weight.minWeight;
        let maxWeightStr = race.physicals.weight.maxWeight;

        let minWeight = minWeightStr.split("kg")[0];
        let maxWeight = maxWeightStr.split("kg")[0];

        let key = 1;
        let weights = [];

        for (let weight = minWeight; weight <= maxWeight; weight++){
            weights.push({
                key: key,
                value: `${weight} kg`
            });

            key++;
        }

        return weights;
    }

    handleRaceChange = (e) => {
        let race = Object.keys(this.props.gameData.races).find(key => this.props.gameData.races[key].name === e.target.value);

        let heightOptions = this.detHeightOptions(this.props.gameData.races[race]);
        let weightOptions = this.detWeightOptions(this.props.gameData.races[race]);

        this.props.onChange({
            race: race
        });

        this.setState({
            heightOptions: heightOptions,
            weightOptions: weightOptions
        });
    }

    render() {
        return (
            <section>
                <header>
                    <h3 className="align-center">General Information</h3>
                </header>

                <div className="flex-ctr-container">
                    <table className="gi">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="gi-name">Name:</label>
                                    <input id="gi-name" name="gi-name" type="text" onBlur={this.updateStats}/>
                                </td>
                                <td>
                                    <label htmlFor="gi-height">Height:</label>
                                    <select id="gi-height" name="gi-height" onChange={this.updateStats}>{this.state.heightOptions.map((h) => {
                                        return <option key={"h-" + h.key}>{h.value}</option>;
                                    })}</select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="gi-race">Race:</label>
                                    <select name="gi-race" onChange={(e) => this.handleRaceChange(e)}>{(Object.keys(this.props.gameData.races)).map((r) => {
                                        return <option key={"r-" + this.props.gameData.races[r].id} title={this.props.gameData.races[r].description}>{this.props.gameData.races[r].name}</option>;
                                    })}</select>
                                </td>
                                <td>
                                    <label htmlFor="gi-weight">Weight:</label>
                                    <select id="gi-weight" name="gi-weight" onChange={this.updateStats}>{this.state.weightOptions.map((w) => {
                                        return <option key={"w-" + w.key}>{w.value}</option>;
                                    })}</select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="gi-profession">Profession:</label>
                                    <select id="gi-profession" name="gi-profession" onChange={this.updateStats}>{(Object.keys(this.props.gameData.professions)).map((pro) => {
                                        return <option key={"pro-" + this.props.gameData.professions[pro].id}>{this.props.gameData.professions[pro].title}</option>;
                                    })}</select>
                                </td>
                                <td>
                                    <label htmlFor="gi-personality">Personality:</label>
                                    <select id="gi-personality" name="gi-personality" onChange={this.updateStats}>{(Object.keys(this.props.gameData.personalities)).map((per) => {
                                        return <option key={"per-" + this.props.gameData.personalities[per].id}>{this.props.gameData.personalities[per].title}</option>;
                                    })}</select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="gi-upbringing">Upbringing:</label>
                                    <select id="gi-upbringing" name="gi-upbringing" onChange={this.updateStats}>{(Object.keys(this.props.gameData.upbringings)).map((u) => {
                                        return <option key={"u-" + this.props.gameData.upbringings[u].id} title={this.props.gameData.upbringings[u].description}>{this.props.gameData.upbringings[u].title}</option>;
                                    })}</select>
                                </td>
                                <td>
                                    <label htmlFor="gi-alignment">Alignment:</label>
                                    <select id="gi-alignment" name="gi-alignment" onChange={this.updateStats}>
                                        <option key={"a-" + 1}>Lawful Good</option>
                                        <option key={"a-" + 2}>Neutral Good</option>
                                        <option key={"a-" + 3}>Chaotic Good</option>
                                        <option key={"a-" + 4}>Lawful Neutral</option>
                                        <option key={"a-" + 5}>Neutral</option>
                                        <option key={"a-" + 6}>Chaotic Neutral</option>
                                        <option key={"a-" + 7}>Lawful Evil</option>
                                        <option key={"a-" + 8}>Neutral Evil</option>
                                        <option key={"a-" + 9}>Chaotic Evil</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}
