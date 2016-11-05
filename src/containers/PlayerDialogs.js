import { connect } from 'react-redux';

import Dialogs from '../components/Player/Dialogs';

const mapStateToProps = state => ({
	socket: state.socket,
});

export default connect(mapStateToProps)(Dialogs);
