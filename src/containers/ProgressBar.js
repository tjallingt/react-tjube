import { connect } from 'react-redux';

import ProgressBar from '../components/ProgressBar/ProgressBar';

const mapStateToProps = state => ({
	youtube: state.player.youtube,
});

export default connect(mapStateToProps)(ProgressBar);
