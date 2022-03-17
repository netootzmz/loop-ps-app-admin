import React, {FC} from "react";
import Image from "next/image";
import logo from "../../public/logo-smart.png";
import pci from "../../public/pci.png";

const FooterImage: FC = () => {

    return (
        <>
            <div className="cardHolder__containerImage">
                <picture className="cardHolder__containerImage--picture">
                    <Image
                        src={logo}
                        alt="Smart Payment Services SA de CV"
                        className="cardHolder__containerImage--icon"
                        layout="fill"
                    />
                </picture>
                <picture className="cardHolder__containerImage--picture">
                    <Image
                        src={pci}
                        alt="PCI"
                        className="cardHolder__containerImage--icon"
                        layout="fill"
                    />
                </picture>
            </div>
        </>
    );
};

export default FooterImage;
