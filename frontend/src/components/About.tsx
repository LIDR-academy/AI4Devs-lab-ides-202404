import React from "react";
import NavBar from "./layout/NavBar";

const About: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p>
          This website, LTI, has been meticulously designed and developed by
          Miguel Antonio Casallas Tarazona as part of the Artificial
          Intelligence training for developers at Lidr. The project showcases a
          seamless integration of AI technologies and modern web development
          practices, reflecting Miguel's commitment to innovation and excellence
          in the digital realm. Through this platform, Miguel demonstrates a
          profound understanding of AI applications, aiming to enhance user
          engagement and operational efficiency. The LTI site stands as a
          testament to the practical application of AI skills acquired in the
          Lidr training program, setting a benchmark for future projects in the
          field.
        </p>
      </div>
    </div>
  );
};

export default About;
// Adding an empty export to ensure the file is treated as a module
export {};
