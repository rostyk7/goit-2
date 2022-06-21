import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GrLike } from 'react-icons/gr';
import s from './Post.module.scss';

class Post extends Component {
  state = {
    isLiked: false,
    count: 0
  };

  toggleLike = () => {
    const { id, onChange } = this.props;
    onChange(id);
  }

  render() {
    const { imageUrl, isLiked, count } = this.props;
    return (
      <div>
        <div>Toggle count: {count}</div>
        <div>
          <div
            className={s.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        <div onClick={this.toggleLike}>
          <GrLike
            className={isLiked ? s.liked : s.notLiked}
          />
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Post;