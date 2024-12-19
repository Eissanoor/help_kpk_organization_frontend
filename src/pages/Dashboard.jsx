import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar"
const Dashboard = () => {
  const navigate = useNavigate(); // Use the navigate hook

  // Define card data
  const cardData = [
    {
      id: 1,
      imgSrc: "https://source.unsplash.com/Lki74Jj7H-U/400x300",
      title: "User",
      description:
        "A compact and interactive visual representation of a user's profile, showcasing key details like their name, profile picture, and a brief bio. Clicking the card reveals more detailed information about the user, such as contact details, activities, or personal achievements.",
      onClick: () => navigate("/user"),
    },
    {
      id: 2,
      imgSrc: "https://source.unsplash.com/L9_6GOv40_E/400x300",
      title: "Product",
      description:
        "A visually appealing card that highlights key product details such as the product name, image, price, and a brief description. Clicking the card provides a detailed view, including specifications, reviews, and purchasing options.",
      onClick: () => navigate("/product"),
    },
    {
      id: 3,
      imgSrc: "https://source.unsplash.com/7JX0-bfiuxQ/400x300",
      title: "Requested",
      description:
        "A compact card displaying essential details of a user request, such as the request title, category, and status. Clicking the card reveals the full request description, associated files, or further actions that can be taken.",
      onClick: () => navigate("/requested"),
    },
  ];

  return (
    <>
      <Sidebar />
      <Navbar />
      <section className="flex flex-col justify-center max-w-5xl  px-4 py-10 mx-auto sm:px-6">
        <div className="flex flex-wrap items-center justify-between mb-20">
          <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
            Dashboard
          </h2>
        </div>

        <div className="flex flex-wrap -mx-4">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col cursor-pointer"
              onClick={card.onClick}
            >
              <div className="flex flex-grow">
                <div className="triangle"></div>
                <div className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400 text rounded-md">
                  
                  <div>
                    <h3 className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600">
                      {card.title}
                    </h3>
                    <p className="mb-4">{card.description}</p>
                  </div>
                  <div>
                    <h3
                      onClick={card.onClick}
                      className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                    >
                      Go to
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
