class Reputations extends React.Component {

    renderRep = () => {
        let rep = [];

        Object.keys(this.props.gameData.reputation.factions).forEach((key) => {
            rep.push(
                <div key={"rep-" + key}>
                    <label htmlFor={"rep-" + key}>{this.props.gameData.reputation.factions[key].name}</label>
                    <input id={"rep-" + key} name={"rep-" + key} type="number" min={this.props.gameData.reputation.limits.minRep} max={this.props.gameData.reputation.limits.maxRep} defaultValue={this.props.rep[key] ? this.props.rep[key] : 0} onKeyDown={(e) => this.props.onKeyDown(e)} onBlur={(e) => this.props.onChange(e)} />
                </div>
            );
        });

        return rep;
    }

    render() {
        return (
            <section id="reputations">
                <h3 className="align-center">Reputations</h3>

                <div id="rep-grid" className="flex-ctr-container">
                    {this.renderRep()}
                </div>
            </section>
        )
    }

    // render() {
    //     return (
    //         <section>
    //             <h3 className="align-center">Reputations</h3>
    //
    //             <div id="rep-grid">
    //                 <div>
    //                     <label htmlFor="rep-guardian">Guardian</label>
    //                     <input id="rep-guardian" name="rep-guardian" type="text" defaultValue={this.props.rep["guardian"]} onBlur={(e) => this.props.onChange(e)}/>
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-zirindustries">Zir Industries</label>
    //                     <input id="rep-zirindustries" name="rep-zirindustries" type="text" defaultValue={this.props.rep["zirindustries"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-peacekeepers">Peacekeepers</label>
    //                     <input id="rep-peacekeepers" name="rep-peacekeepers" type="text" defaultValue={this.props.rep["peacekeepers"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-surface">Surface</label>
    //                     <input id="rep-surface" name="rep-surface" type="text" defaultValue={this.props.rep["surface"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-landercorp">Lander Corp.</label>
    //                     <input id="rep-landercorp" name="rep-landercorp" type="text" defaultValue={this.props.rep["landercorp"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-pioneerx">Pioneer X</label>
    //                     <input id="rep-pioneerx" name="rep-pioneerx" type="text" defaultValue={this.props.rep["pioneerx"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-banking">Banking</label>
    //                     <input id="rep-banking" name="rep-banking" type="text" defaultValue={this.props.rep["banking"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-herald">Herald</label>
    //                     <input id="rep-herald" name="rep-herald" type="text" defaultValue={this.props.rep["herald"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //
    //                 <div>
    //                     <label htmlFor="rep-terranostra">Terra Nostra</label>
    //                     <input id="rep-terranostra" name="rep-terranostra" type="text" defaultValue={this.props.rep["terranostra"]} onBlur={(e) => this.props.onChange(e)} />
    //                 </div>
    //             </div>
    //         </section>
    //     )
    // }
}
