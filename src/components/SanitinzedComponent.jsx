import DOMPurify from 'dompurify';
// import PropType from 'prop-types'

const SanitinzedComponent = ({htmlContent}) => {
    const sanitinzedHTML = DOMPurify.sanitize(htmlContent);
  return (
    <div id="formpay" dangerouslySetInnerHTML={{__html: sanitinzedHTML}} />
  )
}

export default SanitinzedComponent