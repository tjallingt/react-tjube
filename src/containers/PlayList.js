import { connect } from 'react-redux';
import { moveVideo, deleteVideo } from '../actions';

import PlayList from '../components/PlayList/PlayList';

const mapStateToProps = state => ({
	playlist: state.playlist,
});

const mapDispatchToProps = {
	moveVideo,
	deleteVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
