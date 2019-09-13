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
} from '../../utils';
import './contacts.scss';
import sendEmail from '../../actions/emailActions';
import SocialMediaIcons from '../../components/SocialMediaIcons';


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

  renderFormGroup = (id, type, placeholder) => (
    <div key={id} className="form-group">
      <input
        type={type || 'text'}
        className="form-control custom-input"
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
      { id: 'email', type: 'email', placeholder: 'Email' },
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
                    <SocialMediaIcons />
                  </div>

                  <div className="contact-details responsive-flex-child half">
                    <div className="material-card w-100">
                      <ReactMarkdown source={contactsArticles[0].body} />
                    </div>
                  </div>

                  <div className="contact-form responsive-flex-child half">
                    <div className="material-card w-100 h-100">
                      <form className="contacttForm" id="adminLoginForm" onSubmit={this.handleSubmit}>
                        {formFields.map(field => this.renderFormGroup(field.id, field.type, field.placeholder))}
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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.748503932836!2d32.585754714827644!3d0.33895376408327565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbba60c51b6a7%3A0x2b5bb801a44dcf22!2s17%20Cooper%20Rd%2C%20Kampala!5e0!3m2!1sen!2sug!4v1568373519333!5m2!1sen!2sug"
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
