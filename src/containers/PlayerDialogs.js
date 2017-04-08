import { connect } from 'react-redux';
import { nextTutorial, endTutorial } from '../actions';

import Dialogs from '../components/Player/Dialogs';

const mapStateToProps = state => ({
	socket: state.socket,
	tutorial: state.player.tutorial,
});

const mapDispatchToProps = {
	nextTutorial,
	endTutorial,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
