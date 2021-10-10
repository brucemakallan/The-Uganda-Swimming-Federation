/* eslint-disable react/prop-types */
import React from 'react';
import Typography from '@mui/material/Typography';

import { concreteSubtleBackground } from '../../utils';
import './styles.scss';
import AccordionList from '../../components/MUI/AccordionList';

const AuditedAccounts = ({ accounts }) => {
  const { heading1, body, files } = accounts;

  return (
    <div className="mainContent">
      <div className="root large-padding" style={concreteSubtleBackground}>
        <h1 className="sub-section-heading">
          {heading1}
          <hr />
        </h1>
        <Typography variant="body1" align="center" gutterBottom sx={{ mt: 2 }}>
          {body}
        </Typography>
        <div className="inner-padding">
          <AccordionList list={files} />
        </div>
      </div>
    </div>
  );
};

export default AuditedAccounts;
