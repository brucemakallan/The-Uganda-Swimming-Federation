import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import getAllProducts from '../../actions/productsActions';
import PageLoader from '../PageLoader';
import {
  pageSections,
  endpoints,
  concreteSubtleBackground,
  localFiles,
} from '../../utils';
import './contacts.scss';
import sendEmail from '../../actions/emailActions';


class Contacts extends Component {
  state = {
    email: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  }

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
        onChange={this.handleOnChange}
        required
      />
    </div>
  )

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { sendEmailDispatch } = this.props;
    sendEmailDispatch(endpoints.sendEmail, email);
  }

  handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { email } = this.state;
    this.setState({
      email: {
        ...email,
        [name]: value,
      }
    });
  }

  render() {
    const { products } = this.props;
    const contactsArticles = products.filter(article => article.category === pageSections.contactsPage);
    const formFields = [
      { id: 'name', placeholder: 'Full Name' },
      { id: 'email', placeholder: 'Email' },
      { id: 'subject', placeholder: 'Subject' },
    ];

    return (
      (contactsArticles && contactsArticles.length > 0)
        ? (
          <div className="mainContent">
            <PageLoader />

            <div className="large-padding" style={concreteSubtleBackground}>
              <h1 className="sub-section-heading">
                Contacts
                <hr />
              </h1>
              <div className="contacts-page">
                <div className="responsive-flex inner-padding">
                  <div className="responsive-flex-child full">
                    <div className="social-icons">
                      <a href="https://twitter.com/UgandaSwimming" target="_blank" rel="noopener noreferrer">
                        <img src={localFiles.twitter} alt="Twitter" />
                      </a>
                      <a
                        href="https://www.facebook.com/UgandaSwimmingFederation/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={localFiles.facebook} alt="Facebook" />
                      </a>
                    </div>
                  </div>

                  <div className="contact-details responsive-flex-child half">
                    <div className="material-card w-100">
                      <ReactMarkdown source={contactsArticles[0].body} />
                    </div>
                  </div>

                  <div className="contact-form responsive-flex-child half">
                    <div className="material-card w-100 h-100">
                      <form className="contacttForm" id="adminLoginForm" onSubmit={this.handleSubmit}>
                        {formFields.map(field => this.renderFormGroup(field.id, field.placeholder))}
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            name="message"
                            id="message"
                            placeholder="Message"
                            rows="7"
                            onChange={this.handleOnChange}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Send Email</button>
                      </form>
                    </div>
                  </div>

                  <div className="google-embedded-map responsive-flex child full">
                    <div className="material-card w-100">
                      <iframe
                        title="Google Map"
                        width="100%"
                        height="500"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=uganda%20olympic%20committee&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                      />
                    </div>
                  </div>
                </div>
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
  sendEmailDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
  sendEmailDispatch: sendEmail,
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
