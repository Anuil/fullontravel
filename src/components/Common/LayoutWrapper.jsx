import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import NewGallery from "../Newgallery/NewGallery";
import { useAccordion } from "../AccordionContext";
import StickyButton from "../Stickybuttons/StickyButton";
import { BottomBar } from "../Footer/BottomBar";
import Footer from "../Footer/Footer";

export default function LayoutWrapper() {
    const { isGalleryOpen, toggleGallery } = useAccordion();
    const [isFooterLoaded, setFooterLoaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFooterLoaded(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <StickyButton />
            <BottomBar />
            {isGalleryOpen && <NewGallery openGallery={toggleGallery} />}
            {isFooterLoaded && <Footer />}
        </>
    );
}
