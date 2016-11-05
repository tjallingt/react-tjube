import { connect } from 'react-redux';

import Toaster from '../components/Toaster/Toaster';

const mapStateToProps = state => ({
	toasts: state.toasts.slice(-3),
});

export default connect(mapStateToProps)(Toaster);
