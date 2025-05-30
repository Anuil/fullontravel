import { createContext, useContext, useState } from "react";
const AccordionContext = createContext();


export const AccordionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("tabOne");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});

  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const toggleGallery = () => {
    setGalleryOpen((prev) => !prev);
  };

  const updateGalleryImages = (imagesdata) => {
    setGalleryImages(imagesdata);
  };

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAccordions = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <AccordionContext.Provider
      value={{
        activeSection,
        toggleSection,
        openAccordions,
        toggleAccordion,
        activeAccordion,
        toggleAccordions,
        isGalleryOpen,
        toggleGallery,
        galleryImages,
        updateGalleryImages,
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
};



export const useAccordion = () => useContext(AccordionContext);
