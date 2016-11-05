import { connect } from 'react-redux';
import { deleteVideo, sendVideo } from '../actions';

import Dialogs from '../components/Remote/Dialogs';

const mapStateToProps = state => ({
	video: state.video,
	socket: state.socket,
});

const mapDispatchToProps = {
	deleteVideo,
	sendVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
