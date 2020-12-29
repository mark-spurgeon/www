const path = require('path');
/**
 * Retrieve language from file name
 * Taike either 
 */
exports.getLanguage = ({ name }) => {
  const defaultLanguage = 'en';
  const explodedName = path.basename(name).split('.');
  const length = explodedName.length;

  return (length === 3) ? explodedName[1] : defaultLanguage;
}

exports.getExtension = ({ name }) => {
  const explodedName = path.basename(name).split('.')
  return explodedName[explodedName.length - 1]
}

exports.isTextExtension = ({ ext }) => {
  const acceptedText = [
    'docx',
    'txt',
    'aml',
  ];
  return acceptedText.includes(ext)
}

exports.isImageExtension = ({ ext }) => {
  const acceptedImage = [
    'png',
    'jpg',
    'gif',
  ]

  return acceptedImage.includes(ext)
}

