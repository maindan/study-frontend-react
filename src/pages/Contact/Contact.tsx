import React from "react";
import { PageContainer } from "@/components/core/PageContainer/PageContainer";
import TiltedCard from "@/components/react-bits/TiltedCard";
import img from "@/assets/img.jpeg";
import Squares from "@/components/react-bits/Squares";
import { Github, Instagram, Linkedin } from "lucide-react";
import GlassIcons from "@/components/react-bits/GlassIcons";

export function Contact() {
    // const img = import("@/assets/img.jpeg")

    const items = [
        { icon: <Github />, color: 'gray', label: 'Github', url: "https://github.com/maindan" },
        { icon: <Linkedin />, color: 'blue', label: 'LinkedIn', url: "https://www.linkedin.com/in/danlimadev/" },
        { icon: <Instagram />, color: 'red', label: 'Instagram', url: "http://instagram.com/__maindan" },
        // { icon: <FiBook />, color: 'purple', label: 'Books' },
        // { icon: <FiHeart />, color: 'red', label: 'Health' },
        // { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
        // { icon: <FiEdit />, color: 'orange', label: 'Notes' },
        // { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
    ];

    return(
        <PageContainer>
            <div className="w-full h-[550px] border rounded-2xl flex flex-col items-center justify-center bg-black relative">
                <div className="w-full h-full absolute overflow-hidden rounded-2xl">
                    <Squares
                    speed={0.2} 
                    squareSize={40}
                    direction='diagonal'
                    borderColor='#fff'
                    hoverFillColor='#141b52'
                    />
                </div>
                <TiltedCard
                    imageSrc={img}
                    altText="profile pic"
                    captionText="Daniel Lima"
                    containerHeight="200px"
                    containerWidth="200px"
                    imageHeight="200px"
                    imageWidth="200px"
                    rotateAmplitude={12}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                        <p className="text-sm mb-3 bg-gray-800 rounded-2xl px-2 text-white">
                        @maindan
                        </p>
                    }
                    />
                    <div className="w-full h-[200px] flex items-center justify-center">
                        <GlassIcons items={items} className="custom-class"/>
                    </div>
            </div>
        </PageContainer>
    )
}