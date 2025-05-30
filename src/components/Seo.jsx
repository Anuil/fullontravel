import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Seo = ({
  ogimg,
  name,
  description,
  url,
  seoMetaDescription,
  seoMetaKeyword,
  seoPageTitle,
  slug
}) => {
  const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
  const canonical = `https://fullontravel.com/tours/${slug}`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoPageTitle}</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={seoMetaDescription} />
        <meta name="keywords" content={seoMetaKeyword} />

        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={BASE_IMAGE_SRC + ogimg} />
        <meta property="og:url" content={url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
    </HelmetProvider>
  );
};

Seo.propTypes = {
  url: PropTypes.string.isRequired,
  seoMetaDescription: PropTypes.string,
  seoMetaKeyword: PropTypes.string,
  seoPageTitle: PropTypes.string,
  slug: PropTypes.string,
};

export default Seo;


// import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
// const Seo = ({
//   ogimg,
//   name,
//   description,
//   url,
//   seoMetaDescription,
//   seoMetaKeyword,
//   seoPageTitle,
//   slug
// }) => {
//   const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
//   const canonical = `https://fullontravel.com/tours/${slug}`;
//   return (
//     <Helmet>
//       <title>{seoPageTitle}</title>
//       <link rel="canonical" href={canonical}></link>
//       <meta name="description" content={seoMetaDescription} />
//       <meta name="keywords" content={seoMetaKeyword} />


//       <meta property="og:title" content={name} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={BASE_IMAGE_SRC + ogimg} />
//       <meta property="og:url" content={url} />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />

      
//       {/* <meta name="title" content={seoPageTitle} /> */}
//     </Helmet>
//   )
// }
// Seo.propTypes = {
//   // ogimg: PropTypes.string.isRequired,
//   // name: PropTypes.string.isRequired,
//   // description: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   seoMetaDescription: PropTypes.string,
//   seoMetaKeyword: PropTypes.string,
//   seoPageTitle: PropTypes.string,
//   slug: PropTypes.string,
// };

// export default Seo

