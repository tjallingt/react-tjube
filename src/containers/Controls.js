import { connect } from 'react-redux';
import { startTutorial, toggleFill } from '../actions';

import Controls from '../components/Player/Controls';

const mapStateToProps = state => ({
	fill: state.player.fill,
});

const mapDispatchToProps = {
	startTutorial,
	toggleFill,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
