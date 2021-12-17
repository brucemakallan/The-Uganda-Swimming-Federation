/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */

// Using Firebase Storage to upload files. Config at src/lib/firebase.js
// https://firebase.google.com/docs/storage/web/upload-files#upload_files

import React from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import kebabCase from 'lodash/kebabCase';
import Dropzone from 'react-dropzone';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import Alert from '@mui/material/Alert';
import storage from '../../lib/firebase';
import styles from './styles';

const UploadButton = ({
  title = 'Upload or Drop files',
  subfolder = 'articles',
  article = 'uncategorized',
  onUploadComplete,
  disabled,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const whileUploading = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setLoading(progress < 100);
  };

  const onError = (error) => { // https://firebase.google.com/docs/storage/web/handle-errors
    console.error(error);
    setLoading(false);
    setErrorMessage(error.message);
  };

  const onSuccess = uploadTask => () => { // https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setErrorMessage('');
      console.log('File available at', downloadURL);
      onUploadComplete(downloadURL);
    });
  };

  const handleOnDrop = (files) => {
    if (disabled) return;

    files.forEach((file) => {
      const fileName = `${subfolder}/${kebabCase(article)}/${kebabCase(file.name)}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', whileUploading, onError, onSuccess(uploadTask));
    });
  };

  return (
    <>
      <Dropzone onDrop={handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="contained"
              color="primary"
              component="span"
              startIcon={<UploadIcon />}
              disabled={disabled}
            >
              {title}
            </LoadingButton>
          </span>
        )}
      </Dropzone>
      {errorMessage && <Alert sx={styles.alert} severity="error">{errorMessage}</Alert>}
    </>
  );
};

export default UploadButton;
