import { connect } from 'react-redux';
import { nextTour, endTour } from '../actions';

import Dialogs from '../components/Player/Dialogs';

const mapStateToProps = state => ({
	socket: state.socket,
	tour: state.player.tour,
});

const mapDispatchToProps = {
	nextTour,
	endTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
