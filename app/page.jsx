import { set } from "mongoose";
import TicketCard from "./(components)/TicketCard";
import Image from "next/image";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <h1 className="text-center mb-5"> <Image src="/bug.png" alt="" width={40} height={40} className="bug" /> D-<span className="text-red-400">BUG</span></h1>
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h3 className="ml-2">{uniqueCategory}</h3>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key="_index"
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
