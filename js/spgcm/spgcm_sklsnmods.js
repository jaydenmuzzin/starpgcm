class SkillsModifications extends React.Component {

    static reqSPSecondSkill = 20;

    state = {
        firstSkill: "",
        secondSkill: ""
    }

    handleSkillSelection = (e) => {
        e.persist();

        let skillName = Object.keys(this.props.gameData.skills).find(key => this.props.gameData.skills[key].displayName === e.target.value);

        if (e.target.id == "fskillList") {
            this.setState({
                firstSkill: skillName
            });
        } else {
            this.setState({
                secondSkill: skillName
            });
        }
    }

    handleSkillFormSubmission = (skillForm, skill) => {
        let skillsnmods = {...this.props.skillsnmods};

        if (skillForm == "fskillForm") {
            skillsnmods.skills[0] = skill;
            skillsnmods.firstSkillSelected = true;
        } else {
            skillsnmods.skills[1] = skill;
            skillsnmods.secondSkillSelected = true;
        }

        this.props.onChange(skillsnmods);
    }

    handleMultSelection = (mult) => {
        let skillsnmods = {...this.props.skillsnmods};

        skillsnmods.mults.push(mult);

        this.props.onChange(skillsnmods);
    }

    render() {
        return (
            <section>
                <h3 className="align-center">Skills and Modifications</h3>

                <div className="flex-ctr-container align-center">
                    <Skill id={0} skillName={this.props.skillsnmods.firstSkillSelected ? this.props.skillsnmods.skills[0].name : this.state.firstSkill} selected={this.props.skillsnmods.firstSkillSelected} onSelection={this.handleSkillSelection} onSubmit={this.handleSkillFormSubmission} onMultSelection={this.handleMultSelection} gameData={this.props.gameData} skillsnmods={this.props.skillsnmods} />

                    {this.props.skillPoints >= SkillsModifications.reqSPSecondSkill ?
                        <Skill id={1} skillName={this.props.skillsnmods.secondSkillSelected ? this.props.skillsnmods.skills[1].name : this.state.secondSkill} selected={this.props.skillsnmods.secondSkillSelected} onSelection={this.handleSkillSelection} onSubmit={this.handleSkillFormSubmission} onMultSelection={this.handleMultSelection} gameData={this.props.gameData} skillsnmods={this.props.skillsnmods} /> : ""
                    }
                </div>
            </section>
        )
    }

    // renderSM = () => {
    //     let sm = [];
    //
    //     for (let i = 0; i < this.props.skillsnmods.length - 1; i++) {
    //         sm.push(
    //             <div key={"sm-" + i}>
    //                 <label htmlFor={"sm-" + i}>Skill or modification {i + 1}</label>
    //                 <input id={"sm-" + i} name={"sm-" + i} type="text" defaultValue={this.props.skillsnmods[i]} onBlur={(e) => this.props.onChange(e)} />
    //             </div>
    //         );
    //     }
    //
    //     return sm;
    // }

    // render() {
    //     return (
    //         <section>
    //             <h3 className="align-center">Skills and Modifications</h3>
    //
    //             <div className="accessible align-center">
    //                 <Skills gameData={this.props.gameData} skillPoints={this.props.skillPoints} skillsnmods={this.props.skillsnmods} onChange={this.handleSkillFormSubmission} />
    //             </div>
    //
    //             <div className="accessible align-center">
    //                 {this.props.skillsSelected.firstSkill ? this.renderSkill("f") : ""}
    //                 {this.props.skillPoints >= SkillsModifications.reqSPSecondSkill && !this.props.skillsSelected.secondSkill ? this.renderSkill("s") : ""}
    //
    //                 {this.renderSM()}
    //             </div>
    //
    //             <div className="accessible align-center">
    //                 {this.renderSM()}
    //             </div>
    //         </section>
    //     )
    // }
}
