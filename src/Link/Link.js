import React from 'react';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';
import { SECONDARY_COLOR } from '../colors';

const Link = ({ url, children }) => {
  return (
    <a className={css`
      color: ${SECONDARY_COLOR}
    `} href={url}>
      {children}
    </a>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;