/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { WithContext as ReactTags } from 'react-tag-input';
import get from 'lodash/get';
import {
  dateToEpoc,
  epocToDate,
  SHORT_DATE_FORMAT,
  entityTypes,
} from '../../utils';
import UploadButton from '../UploadButton';

library.add(faTrash, faCloudUploadAlt);

class ProductForm extends Component {
  renderTagInput = (isTagInput, tags, suggestions, onTagAdd, onTagDelete, onTagDrag) => {
    const KeyCodes = { comma: 188, enter: 13 };
    return (
      <React.Fragment>
        {isTagInput && (
          <div className="tags">
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              handleDelete={onTagDelete}
              handleAddition={onTagAdd}
              handleDrag={onTagDrag}
              delimiters={[KeyCodes.comma, KeyCodes.enter]}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  renderLabel = (label, required) => (
    <React.Fragment>
      <div>
        {label}
        {required && <span className="red" title="Required"> *</span>}
      </div>
    </React.Fragment>
  );

  renderTextInput = (isTextInput, isNumber, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {isTextInput && (
        <input
          type={isNumber ? 'number' : 'text'}
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={onChange}
          defaultValue={(entity && value) || ''}
        />
      )}
    </React.Fragment>
  );

  renderDateInput = (isDateInput, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {isDateInput && (
        <input
          type="date"
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={e => onChange(e, dateToEpoc(e.target.value))}
          defaultValue={(entity && value && epocToDate(value, SHORT_DATE_FORMAT)) || ''}
        />
      )}
    </React.Fragment>
  );

  renderTextArea = (isTextArea, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {isTextArea && (
        <textarea
          rows="10"
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={onChange}
          value={(entity && value) || ''}
        />
      )}
    </React.Fragment>
  );

  renderDropdownList = (list, fieldName, required, onChange, entity, value) => (
    <React.Fragment>
      {(list && list.length > 0)
        && (
          <select
            className="form-control"
            id={fieldName}
            name={fieldName}
            required={required}
            onChange={onChange}
            value={entity && value}
          >
            {(list[0]._id && list[0].category)
              ? (
                <React.Fragment>
                  <option value="">N/A</option>
                  {list.map(
                    (p, index) => (
                      <option value={p._id} key={String(index)}>
                        {`${p.category.toUpperCase()}: ${p._id} ${p.heading1 ? p.heading1 : ''}`}
                      </option>
                    )
                  )}
                </React.Fragment>
              )
              : list.map((p, index) => <option value={p} key={String(index)}>{p}</option>)
            }
          </select>
        )}
    </React.Fragment>
  );

  renderMultipleStringInput = (
    many, value, fieldName, onArrayChange, removeRow, addRow, addFile, isFileInput, entity, addMultipleFiles,
  ) => (
    <React.Fragment>
      {many && value && Array.isArray(value)
        && (
          <div>
            <div className="groupedValues">
              {value.map((element, index) => (
                <div key={String(index)} className="flex-container single-element">
                  <div className="inputFields">
                    <input
                      type="text"
                      className={`form-control ${fieldName}`}
                      name="title"
                      placeholder="Title"
                      onChange={e => onArrayChange(e, value, index)}
                      value={(element && element.title) || ''}
                    />
                    <input
                      type="text"
                      className={`form-control ${fieldName}`}
                      name="description"
                      placeholder="Description"
                      onChange={e => onArrayChange(e, value, index)}
                      value={(element && element.description) || ''}
                    />
                    <input
                      type="text"
                      className={`form-control ${fieldName}`}
                      name="source"
                      placeholder="Source"
                      onChange={e => onArrayChange(e, value, index)}
                      value={(element && element.source) || ''}
                      required
                    />
                    {isFileInput && (
                      <UploadButton
                        article={entity.heading1}
                        disabled={!entity.heading1}
                        onUploadComplete={url => addFile(index, url)}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    id="removeRowBt"
                    className="iconButton"
                    onClick={() => removeRow(value, index)}
                    title="Remove"
                  >
                    <FontAwesomeIcon icon="trash" className="icon red" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      }
      {many && (
        <>
          {isFileInput && <div>{`${get(entity, 'files', []).length} file(s)`}</div>}
          <button
            type="button"
            id="addRowBt"
            className="btn btn-sm m-2 btn-outline-primary"
            onClick={() => addRow(value, { title: '', description: '', source: '' })}
          >
            Add Another
          </button>
          {isFileInput && (
            <UploadButton
              title="Upload or Drop Multiple files"
              article={entity.heading1}
              disabled={!entity.heading1}
              onUploadComplete={(url, file) => addMultipleFiles(url, file)}
            />
          )}
        </>
      )}
    </React.Fragment>
  );

  renderImagesInput = (images, value, removeRow, entity, addImages) => (
    <React.Fragment>
      {images && value && value.length > 0 && (
        <div>
          <div className="productImages responsive-flex">
            {value.map((imageUrl, index) => (
              <div key={String(index)} className="text-center">
                <div className="imageHolder"><img src={imageUrl} alt="product" /></div>
                <button
                  type="button"
                  id="removeRowBt"
                  className="iconBorderedButton red"
                  onClick={() => removeRow(value, index)}
                  title="Remove"
                >
                  <FontAwesomeIcon icon="trash" className="icon red" />
                  <small>Delete Image</small>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {images && (
        <UploadButton
          article={entity.heading1}
          disabled={!entity.heading1}
          onUploadComplete={url => addImages(value, url)}
          showDropArea
        />
      )}
    </React.Fragment>
  );

  renderAllFormFields = (
    index,
    label,
    fieldName,
    value,
    onChange,
    onArrayChange,
    removeRow,
    addRow,
    addImages,
    addFile,
    entity,
    required,
    list,
    many,
    isTextArea,
    images,
    isNumber,
    isTextInput,
    isTagInput,
    tagSuggestions,
    onTagAdd,
    onTagDelete,
    onTagDrag,
    isDateInput,
    isFileInput,
    addMultipleFiles,
  ) => (
    <div className="form-group" key={String(index)}>
      {this.renderLabel(label, required)}
      {this.renderImagesInput(images, value, removeRow, entity, addImages)}
      {this.renderTagInput(isTagInput, value, tagSuggestions, onTagAdd, onTagDelete, onTagDrag)}
      {this.renderTextArea(isTextArea, fieldName, required, onChange, entity, value)}
      {this.renderMultipleStringInput(
        many, value, fieldName, onArrayChange, removeRow, addRow, addFile, isFileInput, entity, addMultipleFiles,
      )}
      {this.renderDropdownList(list, fieldName, required, onChange, entity, value)}
      {this.renderTextInput(isTextInput, isNumber, fieldName, required, onChange, entity, value)}
      {this.renderDateInput(isDateInput, fieldName, required, onChange, entity, value)}
    </div>
  );

  copyToClipboard = () => {
    const { entity } = this.props;

    if (entity && entity._id) {
      navigator.clipboard.writeText(entity._id);
    }
  }

  render() {
    const {
      title,
      onChange,
      onArrayChange,
      removeRow,
      addRow,
      addImages,
      addFile,
      onSubmit,
      entity,
      allEntities,
      isNew,
      tagSuggestions,
      onTagAdd,
      onTagDelete,
      onTagDrag,
      addMultipleFiles,
    } = this.props;

    const formFields = [
      {
        label: 'Images',
        fieldName: 'images',
        value: entity && entity.images,
        required: true,
        images: true,
      },
      {
        label: 'Tags',
        fieldName: 'tags',
        value: entity && entity.tags,
        isTagInput: true,
      },
      {
        label: 'Parent',
        fieldName: 'parent',
        value: entity && entity.parent,
        list: allEntities,
      },
      {
        label: 'Category',
        fieldName: 'category',
        value: entity && entity.category,
        required: true,
        list: entityTypes,
      },
      {
        label: 'Heading1',
        fieldName: 'heading1',
        value: entity && entity.heading1,
        isTextInput: true,
      },
      {
        label: 'Heading2',
        fieldName: 'heading2',
        value: entity && entity.heading2,
        isTextInput: true,
      },
      {
        label: 'Heading3',
        fieldName: 'heading3',
        value: entity && entity.heading3,
        isTextInput: true,
      },
      {
        label: 'Heading4',
        fieldName: 'heading4',
        value: entity && entity.heading4,
        isTextInput: true,
      },
      {
        label: 'Heading5',
        fieldName: 'heading5',
        value: entity && entity.heading5,
        isTextInput: true,
      },
      {
        label: 'Heading6',
        fieldName: 'heading6',
        value: entity && entity.heading6,
        isTextInput: true,
      },
      {
        label: 'Body',
        fieldName: 'body',
        value: entity && entity.body,
        required: true,
        isTextArea: true,
      },
      {
        label: 'Date-In',
        fieldName: 'dateIn',
        value: entity && entity.dateIn,
        isDateInput: true,
      },
      {
        label: 'Date-Out',
        fieldName: 'dateOut',
        value: entity && entity.dateOut,
        isDateInput: true,
      },
      {
        label: 'Files',
        fieldName: 'files',
        value: entity && entity.files,
        isFileInput: true,
        many: true,
      },
      {
        label: 'Youtube Videos',
        fieldName: 'videos',
        value: entity && entity.videos,
        many: true,
      },
    ];

    return (
      <div>
        <h1>{title}</h1>

        <div>
          {entity && entity._id}
          {' '}
          <button type="button" className="btn btn-primary" onClick={this.copyToClipboard}>Copy</button>
        </div>
        <div>
          Images:
          {' '}
          {get(entity, 'images[0]', '').includes('cloudinary') ? 'CLOUDINARY! 😢' : '✅'}
        </div>
        <div>
          Files:
          {' '}
          {get(entity, 'files[0].source', '').includes('cloudinary') ? 'CLOUDINARY! 😢' : '✅'}
        </div>

        <form className="inputForm" id="productForm" onSubmit={onSubmit}>
          <div>
            <button type="submit" className="btn btn-primary mr-3">Save</button>
          </div>

          {formFields.map((v, index) => this.renderAllFormFields(
            index,
            v.label,
            v.fieldName,
            v.value,
            onChange,
            onArrayChange,
            removeRow,
            addRow,
            addImages,
            addFile,
            entity,
            v.required,
            v.list,
            v.many,
            v.isTextArea,
            v.images,
            v.isNumber,
            v.isTextInput,
            v.isTagInput,
            tagSuggestions,
            onTagAdd,
            onTagDelete,
            onTagDrag,
            v.isDateInput,
            v.isFileInput,
            addMultipleFiles,
          ))}
          <div className="mb-2">
            <span className="red" title="Required"> * </span>
            <span>Required Fields</span>
          </div>
          <button type="submit" className="btn btn-primary mr-3">Save</button>
          {isNew && (
            <button type="button" onClick={event => onSubmit(event, true)} className="btn btn-primary">
              Save &amp; Create Another
            </button>
          )}
        </form>
      </div>
    );
  }
}

ProductForm.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onArrayChange: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  addImages: PropTypes.func.isRequired,
  addFile: PropTypes.func.isRequired,
  addMultipleFiles: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  entity: PropTypes.shape({}),
  allEntities: PropTypes.arrayOf(PropTypes.shape({})),
  isNew: PropTypes.bool,
  tagSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
  onTagAdd: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
  onTagDrag: PropTypes.func.isRequired,
};
ProductForm.defaultProps = {
  title: 'Create new',
  entity: {},
  allEntities: [],
  isNew: false,
  tagSuggestions: [],
};
export default ProductForm;
