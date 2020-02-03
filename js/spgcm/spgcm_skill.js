class Skill extends React.Component {

    state = {};

    setMultipliers = (checkedMult) => {
        let mults = {};

        if (checkedMult) {
            mults[checkedMult + "-disabled"] = true;
        } else {
            let multInputs = document.getElementById(this.props.skillName).querySelectorAll("input");

            let firstMultInputs = [].slice.call(multInputs).filter(multInput => multInput.id.slice(-1) == '0');

            firstMultInputs.forEach((mult) => {
                if (this.state[mult.id + "-disabled"]) {
                    mults[mult.id + "-disabled"] = !this.state[mult.id + "-disabled"];
                } else {
                    mults[mult.id + "-disabled"] = false;
                }
            });

            this.props.skillsnmods.mults.forEach(multName => {
                mults[multName + "-disabled"] = true;

                let multInput = document.getElementById(multName);

                multInput.checked = true;

                let nextMult = multInput.parentNode.nextElementSibling;

                if (nextMult != null) {
                    let nextMultInput = nextMult.querySelector("input");
                    mults[nextMultInput.id + "-disabled"] = false;
                }
            });
        }

        this.setState(mults);
    }

    checkMultApplied = (multName) => {
        return this.props.skillsnmods.mults.find(mult => mult === multName);
    }

    componentDidMount() {
        if (this.props.selected) {
            this.setMultipliers();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selected && this.props !== prevProps) {
            this.setMultipliers();
        }
    }

    handleSkillSubmission = (e) => {
        e.preventDefault();

        if (e.target.id == "fskillForm") {
            if (this.props.skillName != "") { // i.e. Select a skill...
                let skill = this.props.gameData.skills[this.props.skillName];

                this.props.onSubmit(e.target.id, skill);
            } else {
                alert("Please select a skill");
            }
        } else {
            if (this.props.skillName != "") { // i.e. Select a skill...
                let skill = this.props.gameData.skills[this.props.skillName];

                this.props.onSubmit(e.target.id, skill);
            } else {
                alert("Please select a skill");
            }
        }
    }

    handleMultClick = (e) => {
        this.setMultipliers(e.target.id);
        this.props.onMultSelection(e.target.id);
    }

    renderMods = (skill) => {
        if (skill == undefined) return null;

        return (
            <React.Fragment>
                <h5>Boons</h5>
                <ul>
                    {(Object.keys(this.props.gameData.skills[skill.name].mods.boons)).map((b) => {
                        let mults = [];

                        for (let i = 0; i < this.props.gameData.skills[skill.name].mods.boons[b].maxMultipliers; i++) {
                            let multName = ("boon-" + this.props.gameData.skills[skill.name].mods.boons[b].name + "-" + skill.name + "-" + i).replace(" ", "").toLowerCase();

                            mults.push(
                                <div className="mult" key={("boon-" + this.props.gameData.skills[skill.name].mods.boons[b].id + "-" + skill.name + "-" + i).replace(" ", "").toLowerCase()}>
                                    <input id={multName} name={multName} type="checkbox" disabled={this.state[multName + "-disabled"] != undefined ? this.state[multName + "-disabled"] : true} onClick={(e) => this.handleMultClick(e)} />
                                    <label htmlFor={multName}>
                                        <span className="hidden">{this.props.gameData.skills[skill.name].mods.boons[b].name + "-" + i}</span>
                                    </label>
                                </div>
                            );
                        }

                        return (<li key={"boon-" + skill.name + this.props.gameData.skills[skill.name].mods.boons[b].name}>
                                    <h6>{this.props.gameData.skills[skill.name].mods.boons[b].name}</h6>
                                    {mults}
                                </li>);
                    })}
                </ul>

                <h5>Upgrades</h5>
                <ul>
                    {(Object.keys(this.props.gameData.skills[skill.name].mods.upgrades)).map((u) => {
                        let mults = [];

                        for (let i = 0; i < this.props.gameData.skills[skill.name].mods.upgrades[u].maxMultipliers; i++) {
                            let multName = ("upgrade-" + this.props.gameData.skills[skill.name].mods.upgrades[u].name + "-" + skill.name + "-" + i).replace(" ", "").toLowerCase();

                            mults.push(
                                <div className="mult" key={("upgrade-" + this.props.gameData.skills[skill.name].mods.upgrades[u].id + "-" + skill.name + "-" + i).replace(" ", "").toLowerCase()}>
                                    <input id={multName} name={multName} type="checkbox" disabled={this.state[multName + "-disabled"] != undefined ? this.state[multName + "-disabled"] : true} onClick={(e) => this.handleMultClick(e)} />
                                    <label htmlFor={multName}>
                                        <span className="hidden">{this.props.gameData.skills[skill.name].mods.upgrades[u].name + "-" + i}</span>
                                    </label>
                                </div>
                            );
                        }

                        return (<li key={"upgrade-" + skill.name + this.props.gameData.skills[skill.name].mods.upgrades[u].name}>
                                    <h6>{this.props.gameData.skills[skill.name].mods.upgrades[u].name}</h6>
                                    {mults}
                                </li>);
                    })}
                </ul>
            </React.Fragment>
        );
    }

    renderSkill = (nth) => {
        return (
            <div id={this.props.skillsnmods.skills[nth].name}>
                <h4 className={this.props.skillsnmods.skills[nth].name}>{this.props.skillsnmods.skills[nth].displayName}</h4>
                {this.renderMods(this.props.skillsnmods.skills[nth])}
            </div>
        );
    }

    renderSkillForm = (nth, skill) => {
        return (
            <React.Fragment>
                <form id={nth + "skillForm"} className="accessible justify-content-center" onSubmit={(e) => this.handleSkillSubmission(e)}>
                    <label htmlFor={nth + "skillList"}>Skill:</label>
                    <select id={nth + "skillList"} name={nth + "skillList"} onChange={(e) => this.props.onSelection(e)}>
                        <option key={nth + "s-unselected"}>Select a skill...</option>
                        {(Object.keys(this.props.gameData.skills)).map((s) => {
                            return <option key={nth + "s-" + this.props.gameData.skills[s].id} className={this.props.gameData.skills[s].name} title={this.props.gameData.skills[s].description}>{this.props.gameData.skills[s].displayName}</option>;
                        })}
                    </select>
                    <input type="submit" value="Choose" />
                </form>
                {this.renderMods(this.props.gameData.skills[skill])}
            </React.Fragment>
        );
    }

    render() {
        console.log("skill render");
        return (
            <div className="skill">
                {this.props.selected ? this.renderSkill(this.props.id) : this.renderSkillForm(this.props.id == 0 ? "f" : "s", this.props.skillName)}
            </div>
        )
    }
}
