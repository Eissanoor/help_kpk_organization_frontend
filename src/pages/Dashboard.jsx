import React from "react";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  // Define card data for reusability
  const cardData = [
    {
      id: 1,
      imgSrc: "https://source.unsplash.com/Lki74Jj7H-U/400x300",
      title: "User",
      description:
        "A compact and interactive visual representation of a user's profile, showcasing key details like their name, profile picture, and a brief bio. Clicking the card reveals more detailed information about the user, such as contact details, activities, or personal achievements.",
      link: "#",
    },
    {
      id: 2,
      imgSrc: "https://source.unsplash.com/L9_6GOv40_E/400x300",
      category: "Client-based Adoption",
      title: "Old School Art",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla delectus.",
      link: "#",
    },
    {
      id: 3,
      imgSrc: "https://source.unsplash.com/7JX0-bfiuxQ/400x300",
      category: "Intellectual Capital",
      title: "5 Things To Do About Rain",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, neque. Eius, ea possimus.",
      link: "#",
    },
  ];

  return (
    <>
    <Sidebar/>
    <section className="flex flex-col justify-center max-w-5xl min-h-screen px-4 py-10 mx-auto sm:px-6">
         
      <div className="flex flex-wrap items-center justify-between mb-20">
        <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
        Dashboard
        </h2>
      </div>

      <div className="flex flex-wrap -mx-4 ">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col"
          >
           
            <div className="flex flex-grow">
              <div className="triangle"></div>
              <div className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400 text rounded-md">
                <div>
                  <a
                    href={card.link}
                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    {card.category}
                  </a>
                  <a
                    href={card.link}
                    className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    {card.title}
                  </a>
                  <p className="mb-4">{card.description}</p>
                </div>
                <div>
                  <a
                    href={card.link}
                    className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
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
