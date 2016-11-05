import { connect } from 'react-redux';
import { addVideo, addVideoWithToast } from '../actions';

import SearchResults from '../components/SearchResults/SearchResults';

const mapStateToProps = state => ({
	results: state.results,
});

const mapDispatchToProps = dispatch => ({
	addVideo: video => dispatch(addVideo(video)),
});

const mapDispatchToPropsWithToast = dispatch => ({
	addVideo: video => dispatch(addVideoWithToast(video)),
});

export default connect(mapStateToProps, mapDispatchToPropsWithToast)(SearchResults);
export const withoutToast = connect(mapStateToProps, mapDispatchToProps)(SearchResults);
