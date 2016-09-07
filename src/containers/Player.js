import { connect } from 'react-redux';
import { deleteVideo, setYoutube } from '../actions';

import Player from '../components/Player/Player';

const mapStateToProps = (state) => ({
	fill: state.player.fill,
	toasts: state.toasts,
	videoId: state.playlist[0] ? state.playlist[0].id : undefined,
});

const mapDispatchToProps = (dispatch) => ({
	setYoutube: (event) => dispatch(setYoutube(event.target)),
	skipVideo: () => dispatch(deleteVideo(0)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
