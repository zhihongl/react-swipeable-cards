import React, {Component} from 'react'
import {render} from 'react-dom'
import { Card, CardWrapper } from '../../src/index'

class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "React-Swipe-Card",
			messageButton: "Add End Card",
			showEndCard: false,
			showLeftSection: false,
			showRightSection: false,
		}
		this.Like = 'http://tinder-moustache.s3-website-ap-southeast-2.amazonaws.com/32a65604ffb8cb6d97f7cff01261085c.svg';
		this.Dislike = 'http://tinder-moustache.s3-website-ap-southeast-2.amazonaws.com/0c1e5999d92367d14f27de4ac9c84411.svg';

	}


	onSwipeLeft(data) {
	}

	onSwipeRight(data) {
	}

	onDoubleTap(data) {
	}

	onDraggingLeft(data) {
	    // console.warn('onDraggingLeft', data);
		// this.state.showLeftSection = true;
	}

	onDraggingRight(data) {
	}

	onDraggingEnd(data) {
		// console.warn('onDraggingEnd', data);
		// this.state.showLeftSection = false;
		// this.state.showRightSection = false;
	}

	addEndCard() {
		let titleStyle = {
			textAlign: "center",
			fontWeight: "bold",
			fontSize: "50px",
			fontFamily: "Sans-Serif",
			marginTop: "10px"
		};
		return(
			<div style={titleStyle}>
				You Finished Swiping!
			</div>
		);
	}

	leftSection = () => {
		// return React.default.createElement(
		// 	'div',
		// 	{ className: 'card_container end_card' },
		// 	<div><h1>LEFT Section</h1><img src={this.Like} alt=""/></div>
		// );
	}

	rightSection = () => {
		return(
			<div><h1>LEFT Section</h1></div>
		);
	}


	changeEndCardState(e) {
		e.preventDefault();
		let showingEndCard = this.state.showEndCard;
		let message = showingEndCard ? "Add End Card" : "Remove End Card";
		this.setState({
			messageButton: message,
			showEndCard: !showingEndCard
		});
	}

	renderCards() {
		let data = [{id: 1, title: "First"},{id: 2, title: "Second"},{id: 3, title: "Third"}];
		// data = [{id: 1, title: "First"}];
		let titleStyle = {
			textAlign: "center",
			fontWeight: "bold",
			fontSize: "50px",
			fontFamily: "Sans-Serif",
			pointerEvent: "none",
			marginTop: "10px",
			background: "grey",
			height: '100%',
			position: "relative",
			width: "100%"
		};
		console.warn('data', data);
		return data.map((d) => {
			return(
				<Card
					key={d.id}
					data={d}
					triggerSwipeDistance={100}
					leftSection={<div><h1>LEFT Section</h1><img src={this.Like} alt=""/></div>}
					rightSection={<h1 style={{'background':'red'}}><img src={this.Dislike} alt=""/></h1>}
					onDraggingLeft={this.onDraggingLeft.bind(this)}
					onDraggingEnd={this.onDraggingEnd.bind(this)}
					onDraggingRight={this.onDraggingRight.bind(this)}
					onSwipeLeft={this.onSwipeLeft.bind(this)}
					onSwipeRight={this.onSwipeRight.bind(this)}
					onDoubleTap={this.onDoubleTap.bind(this)}
				>
					<div style={titleStyle}>
						{d.title}
					</div>
				</Card>
			);
		});
	}



	render() {
		let wrapperStyle = {
			backgroundColor: "#024773",
			height: "80vh",
		};
		let containerStyle = {
			backgroundColor: "#024773",
			height: "calc(100vh - 16px)"
		}
		let messageStyle = {
			color: "white",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: "2vw",
			fontFamily: "Sans-Serif",
		}
		let buttonStyle = {
			textAlign: "center",
			marginTop: "10px"
		}
		return(
			<div style={containerStyle}>
				<CardWrapper style={wrapperStyle} addEndCard={this.state.showEndCard ? this.addEndCard.bind(this) : null}>
					{this.renderCards()}
				</CardWrapper>

				<h1>Testing</h1>
				{this.state.showLeftSection && 'showLeftSection'}
				{this.state.showRightSection && 'showRightSection'}

				<div style={messageStyle}>{this.state.message}</div>
				<div style={{textAlign: "center"}}><button style={buttonStyle} onClick={this.changeEndCardState.bind(this)}>{this.state.messageButton}</button></div>
			</div>
		);
	}
}

render(<Demo/>, document.querySelector('#demo'))
