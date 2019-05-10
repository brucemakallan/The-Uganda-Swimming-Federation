import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class ProductForm extends Component {
  renderInputField = (
    label, fieldName, value, onChange, onArrayChange, removeRow,
    addRow, addCloudinaryImage, entity, required, list, many, large, images, number,
  ) => (
    <div className="form-group" key={fieldName}>
      <div>
        {label}
        {required && <span className="red" title="Required"> *</span>}
      </div>

      {images && value && value.length > 0 && (
        <div>
          <div className="productImages responsive-flex">
            {value.map((imageUrl, index) => (
              <div key={imageUrl} className="text-center">
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
        <button
          type="button"
          id="addRowBt"
          className="btn btn-sm m-2 btn-outline-primary"
          onClick={() => addCloudinaryImage(value)}
        >
          Upload Image
        </button>
      )}

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
            {list.map(
              element => <option value={element.name} key={element.name}>{_.startCase(element.name)}</option>
            )}
          </select>
        )}

      {many && value && Array.isArray(value)
        && (
          <div>
            <div className="groupedValues">
              {value.map((element, index) => (
                <div key={String(index)} className="flex-container">
                  <input
                    type="text"
                    className={`form-control ${fieldName}`}
                    name={`${index}`}
                    onChange={e => onArrayChange(e, value)}
                    value={(element && element) || ''}
                  />
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
        <button
          type="button"
          id="addRowBt"
          className="btn btn-sm m-2 btn-outline-primary"
          onClick={() => addRow(value)}
        >
          Add Another
        </button>
      )}

      {large && (
        <textarea
          rows="5"
          className="form-control"
          id={fieldName}
          name={fieldName}
          required={required}
          onChange={onChange}
          value={(entity && value) || ''}
        />
      )}

      {((!list || (list && list.length === 0)) && !many && !large && !images)
        && (
          <input
            type={number ? 'number' : 'text'}
            className="form-control"
            id={fieldName}
            name={fieldName}
            required={required}
            onChange={onChange}
            defaultValue={(entity && value) || ''}
          />
        )}
    </div>
  );

  render() {
    const {
      title, onChange, onArrayChange, removeRow, addRow, addCloudinaryImage, onSubmit, entity, isNew, properties,
    } = this.props;

    const getPropertiesOfType = (propertyType) => {
      const allEntitiesOfOneType = properties.filter(property => property.family.trim().toLowerCase() === propertyType);
      return _.sortBy(allEntitiesOfOneType, type => type.name);
    };

    const productValues = [
      {
        label: 'Images', fieldName: 'images', value: entity && entity.images, required: true, images: true,
      },
      {
        label: 'Title', fieldName: 'title', value: entity && entity.title, required: true,
      },
      {
        label: 'Description',
        fieldName: 'description',
        value: entity && entity.description,
        required: true,
        large: true,
      },
      {
        label: 'Quantity', fieldName: 'quantity', value: entity && entity.quantity, required: true, number: true,
      },
      {
        label: 'Price (USD)', fieldName: 'price', value: entity && entity.price, required: true, number: true,
      },
      {
        label: 'Category',
        fieldName: 'category',
        value: entity && entity.category,
        required: true,
        list: getPropertiesOfType('category'),
      },
      {
        label: 'Condition',
        fieldName: 'condition',
        value: entity && entity.condition,
        required: true,
        list: getPropertiesOfType('condition'),
      },
      { label: 'Brand', fieldName: 'brand', value: entity && entity.brand },
      { label: 'Model', fieldName: 'model', value: entity && entity.model },
      { label: 'Size', fieldName: 'size', value: entity && entity.size },
      { label: 'Capacity', fieldName: 'capacity', value: entity && entity.capacity },
      { label: 'Manufacturer', fieldName: 'manufacturer', value: entity && entity.manufacturer },
      { label: 'Material', fieldName: 'material', value: entity && entity.material },
      { label: 'Year of manufacture / release', fieldName: 'year', value: entity && entity.year },
      { label: 'Weight', fieldName: 'weight', value: entity && entity.weight },
      { label: 'Shipping details', fieldName: 'shipping', value: entity && entity.shipping },
      { label: 'Seller', fieldName: 'seller', value: entity && entity.seller },
      { label: 'Delivery options', fieldName: 'delivery', value: entity && entity.delivery },
      { label: 'Shape', fieldName: 'shape', value: entity && entity.shape },
      { label: 'Style / Form', fieldName: 'style', value: entity && entity.style },
      {
        label: 'Colours', fieldName: 'colours', value: entity && entity.colours, many: true
      },
      {
        label: 'Features', fieldName: 'features', value: entity && entity.features, many: true
      },
    ];

    return (
      <div>
        <h1>{title}</h1>
        <form className="inputForm" id="productForm" onSubmit={onSubmit}>

          {productValues.map(
            v => this.renderInputField(
              v.label,
              v.fieldName,
              v.value,
              onChange,
              onArrayChange,
              removeRow,
              addRow,
              addCloudinaryImage,
              entity,
              v.required,
              v.list,
              v.many,
              v.large,
              v.images,
              v.number,
            )
          )}

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
  addCloudinaryImage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  entity: PropTypes.shape({}),
  properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isNew: PropTypes.bool,
};
ProductForm.defaultProps = {
  title: 'Create new',
  entity: {},
  isNew: false,
};
export default ProductForm;
