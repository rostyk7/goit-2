import React from 'react';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';
import { PRIMARY_COLOR } from '../colors';

const Title = ({ text }) => {
  return (
    <div className={css`
      color: ${PRIMARY_COLOR};
      margin-left: 20px;
    `}>
       {text}
    </div>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default Title;