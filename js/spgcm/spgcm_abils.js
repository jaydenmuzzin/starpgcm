class CoreAbilities extends React.Component {

    render() {
        return (
            <section>
                <header>
                    <h3>Core Abilities</h3>
                </header>

                <table id="abilities">
                    <tbody>
                        <tr>
                            <th className="str">Health</th>
                            <td className="str">STR x 10</td>
                            <td>{this.props.abilities.health}</td>
                        </tr>
                        <tr>
                            <th className="str">Damage</th>
                            <td className="str">STR x 3</td>
                            <td>{this.props.abilities.damage}</td>
                        </tr>
                        <tr>
                            <th className="agi">Initiative</th>
                            <td className="agi">AGI x 1</td>
                            <td>{this.props.abilities.initiative}</td>
                        </tr>
                        <tr>
                            <th className="agi">Movement</th>
                            <td className="agi">AGI x 2</td>
                            <td>{this.props.abilities.movement}</td>
                        </tr>
                        <tr>
                            <th className="int">Perception</th>
                            <td className="int">INT x 2</td>
                            <td>{this.props.abilities.perception}</td>
                        </tr>
                        <tr>
                            <th className="int">Science</th>
                            <td className="int">INT x 2</td>
                            <td>{this.props.abilities.science}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}

class NewCoreAbilities extends React.Component {

    render() {
        return (
            <section>
                <header>
                    <h3>Core Abilities</h3>
                </header>

                <table id="abilities">
                    <tbody>
                        <tr>
                            <th className="str">Health</th>
                            <td className="str">STR x 10</td>
                            <td>{this.props.abilities.health}</td>
                        </tr>
                        <tr>
                            <th className="str">Damage</th>
                            <td className="str">STR x 3</td>
                            <td>{this.props.abilities.damage}</td>
                        </tr>
                        <tr>
                            <th className="agi">Initiative</th>
                            <td className="agi">AGI x 1</td>
                            <td>{this.props.abilities.initiative}</td>
                        </tr>
                        <tr>
                            <th className="agi">Movement</th>
                            <td className="agi">AGI x 2</td>
                            <td>{this.props.abilities.movement}</td>
                        </tr>
                        <tr>
                            <th className="int">Perception</th>
                            <td className="int">INT x 2</td>
                            <td>{this.props.abilities.perception}</td>
                        </tr>
                        <tr>
                            <th className="int">Science</th>
                            <td className="int">INT x 2</td>
                            <td>{this.props.abilities.science}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}
