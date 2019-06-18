import React from 'react';
import { localFiles } from '../../utils';
import './socialMediaIcons.scss';

const SocialMediaIcons = () => (
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
    <a
      href="https://www.instagram.com/ugandaswimming/?hl=en"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={localFiles.instagram} alt="Instagram" />
    </a>
  </div>
);

export default SocialMediaIcons;
