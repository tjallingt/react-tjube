import { connect } from 'react-redux';
import { toggleFill } from '../actions';

import Controls from '../components/Player/Controls';

const mapStateToProps = (state) => ({
	fill: state.player.fill,
});

const mapDispatchToProps = {
	toggleFill,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
