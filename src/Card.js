import React, { Component  } from "react";
import Hammer from "react-hammerjs";

export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classList: ["card_container"],
			showLeftSection: false,
			showRightSection: false,
		};
	}

	componentDidMount() {
	}

	onPan(event) {
		if(this.props.isSwipeEnabled !== false) {
			if((this.props.isLeftSwipeEnabled !== false && event.deltaX <= 0) || (this.props.isRightSwipeEnabled !== false && event.deltaX >= 0))
			{
				this.state.classList.push('moving');
				if (event.deltaX === 0) return;
				if (event.center.x === 0 && event.center.y === 0) return;
				var xMulti = event.deltaX * 0.03;
				var yMulti = event.deltaY / 80;
				var rotate = xMulti * yMulti;
				event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';

				if(event.deltaX < 0) {
					this.setState({
						showLeftSection: true,
						showRightSection: false,
					});
					if (this.props.onDraggingLeft) {
						this.props.onDraggingLeft(this.props.data);
					}
				} else{
					this.setState({
						showLeftSection: false,
						showRightSection: true,
					});

					if (this.props.onDraggingRight) {
						this.props.onDraggingRight(this.props.data);
					}
				}





			}
		}
	}

	onPanEnd(event) {

		this.setState({
			showLeftSection: false,
			showRightSection: false,
		});

		if(this.props.isSwipeEnabled !== false) {
			if((this.props.isLeftSwipeEnabled !== false && event.deltaX <= 0) || (this.props.isRightSwipeEnabled !== false && event.deltaX >= 0)) {
				var newClass = this.state.classList.filter(s => s !== 'moving');
				this.setState({classList: newClass});
				var moveOutWidth = document.body.clientWidth;
				var triggerSwipeDistance = undefined !== this.props.triggerSwipeDistance ? +this.props.triggerSwipeDistance : 300;



				var keep = Math.abs(event.deltaX) < triggerSwipeDistance;
				event.target.classList.toggle('removed', !keep);
				if (keep) {
					event.target.style.transform = '';
				} else {
					var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
					var toX = event.deltaX > 0 ? endX : -endX;
					var endY = Math.abs(event.velocityY) * moveOutWidth;
					var toY = event.deltaY > 0 ? endY : -endY;
					var xMulti = event.deltaX * 0.03;
					var yMulti = event.deltaY / 80;
					var rotate = xMulti * yMulti;
					event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
					// DO SWIPE ACTIONS
					this.props.superOnSwipe();
					if(this.props.onSwipe) this.props.onSwipe(this.props.data);
					if(toX < 0 && this.props.onSwipeLeft) {
						this.props.onSwipeLeft(this.props.data);
					} else if(this.props.onSwipeRight) {
						this.props.onSwipeRight(this.props.data);
					}
				}
			}

		}

		if (this.props.onDraggingEnd){
			this.props.onDraggingEnd(this.props.data);
		}

	}

	onDoubleTap(event) {
		event.target.classList.toggle('removed', true);
		if(this.props.onDoubleTap) this.props.onDoubleTap(this.props.data);

	}

	render() {
		return (
			<Hammer onPan={this.onPan.bind(this)} onPanEnd={this.onPanEnd.bind(this)} onDoubleTap={this.onDoubleTap.bind(this)}>
				<div className={this.state.classList.join(" ")} style={this.props.style}>
					{this.props.children}
					<div className={"left-section card-text-section " + ( this.state.showLeftSection ? "show" : "hidden d-none")}>{this.props.leftSection}</div>
					<div className={"right-section card-text-section " + ( this.state.showRightSection ? "show" : "hidden d-none")}>{this.props.rightSection}</div>
				</div>
			</Hammer>
		);
	}
}
