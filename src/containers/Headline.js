import { connect } from 'react-redux';
import { deleteVideo } from '../actions';

import Headline from '../components/Player/Headline';

const mapStateToProps = state => ({
	canSkip: !!state.playlist[1],
	subtitle: state.playlist[1] ? state.playlist[1].title : undefined,
	title: state.playlist[0] ? state.playlist[0].title : undefined,
});

const mapDispatchToProps = dispatch => ({
	onSkip: () => dispatch(deleteVideo(0)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Headline);
