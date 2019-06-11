import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import getAllProducts from '../../actions/productsActions';
import { pageSections, endpoints } from '../../utils';
import './contacts.scss';


class Contacts extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  renderFormGroup = (id, placeholder) => (
    <div key={id} className="form-group">
      <input
        type="text"
        className="form-control"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={this.onChange}
        required
      />
    </div>
  )

  render() {
    const { products } = this.props;
    const contactsArticles = products.filter(article => article.category === pageSections.contactsPage);
    const formFields = [
      { id: 'fullName', placeholder: 'Full Name' },
      { id: 'email', placeholder: 'Email' },
      { id: 'subject', placeholder: 'Subject' },
    ];

    return (
      (contactsArticles && contactsArticles.length > 0)
        ? (
          <div className="mainContent">
            <div className="large-padding">
              <h1 className="sub-section-heading">
                Contacts
                <hr />
              </h1>
              <div className="contacts-page responsive-flex inner-padding">
                <div className="contact-details responsive-flex-child full">
                  <div className="material-card w-100">
                    <ReactMarkdown source={contactsArticles[0].body} />
                  </div>
                </div>
                {/* <div className="contact-form responsive-flex-child half">
                  <div className="material-card w-100">
                    <form className="contacttForm" id="adminLoginForm" onSubmit={this.onSubmit}>
                      {formFields.map(field => this.renderFormGroup(field.id, field.placeholder))}
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          name="message"
                          id="message"
                          placeholder="Message"
                          rows="5"
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">Send Email</button>
                    </form>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ) : ''
    );
  }
}

Contacts.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
