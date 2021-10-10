/* eslint-disable react/prop-types */
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PdfViewer from '../../PdfViewer';

const AccordionList = ({ list }) => (
  <div>
    {list.map(({ title, description, source }) => (
      <Accordion key={title}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
          <PdfViewer pdfFile={source} />
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
);

export default AccordionList;
