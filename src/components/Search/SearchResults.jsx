import React from 'react';
import { connect } from 'react-redux';
import { addVideo } from '../../actions';
import SearchResultsItem from './SearchResultsItem';

function SearchResults({ id, results, onClickVideo }) {
	const styles = {
		list: {
			listStyleType: 'none',
		},
	};

	return (
		<ul
			id={id}
			style={styles.list}
		>
			{results.map((video, index) => (
				<SearchResultsItem
					key={video.key}
					index={index}
					video={video}
					onClick={() => onClickVideo(video, index)}
				/>
			))}
		</ul>
	);
}

SearchResults.propTypes = {
	id: React.PropTypes.string,
	results: React.PropTypes.array.isRequired,
	onClickVideo: React.PropTypes.func,
};

SearchResults.defaultProps = {
	onClickVideo: () => null,
};

const mapStateToProps = (state) => ({
	results: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
	onClickVideo: (video) => {
		dispatch(addVideo(video));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
