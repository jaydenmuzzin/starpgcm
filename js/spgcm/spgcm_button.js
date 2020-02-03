class Button extends React.Component {

    render() {
        return (
            <button onClick={this.props.onClick} className={this.props.classes ? "btn " + this.props.classes : "btn"}>
                {this.props.text}
            </button>
        );
    }
}
