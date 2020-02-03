class Inventory extends React.Component {

    renderInv = () => {
        let inv = [];

        for (let i = 0; i < this.props.inv.length; i++) {
            inv.push(
                <div key={"invItem-" + i}>
                    <label htmlFor={"invItem-" + i}>Inventory item {i + 1}</label>
                    <input id={"invItem-" + i} name={"invItem-" + i} type="text" defaultValue={this.props.inv[i]} onBlur={(e) => this.props.onChange(e)} />
                </div>
            );
        }

        return inv;
    }

    render() {
        return (
            <section>
                <h3 className="align-center">Inventory</h3>

                <div className="accessible align-center">
                    {this.renderInv()}
                </div>
            </section>
        )
    }
}
