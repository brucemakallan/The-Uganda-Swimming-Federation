/* eslint-disable react/prop-types */
import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';

const PdfViewer = ({ pdfFile }) => {
  const [numberOfPages, setNumberOfPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumberOfPages(numPages);
  };

  const handlePrevious = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < numberOfPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div>
      <Document
        file={pdfFile}
        loading={<Box sx={{ m: 3, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <Box sx={{ display: 'flex', m: 2, justifyContent: 'space-between' }}>
        <Typography>{`Page ${pageNumber} of ${numberOfPages}`}</Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={handlePrevious} disabled={pageNumber === 1}>
            <ChevronLeftIcon />
          </Button>
          <Button onClick={handleNext} disabled={pageNumber === numberOfPages}>
            <ChevronRightIcon />
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default PdfViewer;
