/* Remove popup name from address bar (except in IE and Edge) */
const ua = window.navigator.userAgent;
const isIEEdge = /MSIE|Trident|Edge\//.test(ua);

function removeHash(e) {
    if (!isIEEdge) {
        history.replaceState({}, '', location.pathname);
    }
}

window.addEventListener("popstate", (e) => removeHash(e), false);


class Popup extends React.Component {

    renderButtons = () => {
        if (Array.isArray(this.props.buttons) && this.props.buttons.length) {
            return (
                <div className="flex-ctr-container">
                    {this.props.buttons.map((button, i) => {
                        if (!button.dismiss) {
                            return <Button key={"popup-" + this.props.id + "-button-" + i} classes={button.classes ? "popup-dflt-btn " + button.classes : "popup-dflt-btn"} text={button.text ? button.text : "Okay"} onClick={button.onClick} />
                        } else {
                            return <a key={"popup-" + this.props.id + "-button-" + i} href="#0" className={button.classes ? "btn popup-dflt-btn " + button.classes : "btn popup-dflt-btn"} onClick={button.onClick}>{button.text ? button.text : "Okay"}</a>
                        }

                    })}
                </div>
            );
        } else if (typeof this.props.buttons == "string") {
            return (
                <div className="flex-ctr-container">
                    <a href="#0" className="btn popup-dflt-btn">{this.props.buttons}</a>
                </div>
            );
        }

        return "";
    }

    render() {
        return (
            <div id={this.props.id} className="popup-overlay">
            	<div className="popup" role="dialog" aria-labelledby={this.props.id + "-heading"} aria-describedby={this.props.id + "-content"}>
            		{this.props.heading ? <h2 id={this.props.id + "-heading"}>{this.props.heading}</h2> : ""}
            		<a href="#0" aria-label="Close popup" className="close">&times;</a>

            		<div id={this.props.id + "-content"} className="content">
            			{this.props.content}
            		</div>

                    {this.renderButtons()}
            	</div>
            </div>
        );
    }
}
