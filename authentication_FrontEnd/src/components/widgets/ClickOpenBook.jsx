import React from "react";
import {
  Wraper,
  useNavigate,
  axiosInstance,
} from "../../components/shared/CommonImports";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import { useParams } from "react-router-dom";

const ClickOpenBook = () => {
  const { openBookId } = useParams();
  const queryClient = useQueryClient();

  // const { data: bookDetails, isLoading, isError } = useQuery({
  //   queryKey: ["bookDetails", openBookId],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get(`/books/${openBookId}`);
  //     return response.data;
  //   },
  //   staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  //   retry: 2, // Retry fetch twice on failure
  // });

    const cacheBooks = queryClient.getQueryData(['books'])
    const bookDetails = cacheBooks.find((books)=>books._id ===openBookId)
    console.log('open book data:',bookDetails);

  // if (isLoading) {
  //   return (
  //     <Wraper className="bg-purple-500 min-h-screen pt-28">
  //       <div>
  //         <pre className="text-white text-center">Loading book details...</pre>
  //       </div>
  //     </Wraper>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <Wraper className="bg-purple-500 min-h-screen pt-28">
  //       <div>
  //         <pre className="text-white text-center">
  //           Error fetching book details.
  //         </pre>
  //       </div>
  //     </Wraper>
  //   );
  // }

  if (!bookDetails) {
    return (
      <Wraper className="bg-purple-500 min-h-screen pt-28">
        <div>
          <pre className="text-white text-center">Book not found.</pre>
        </div>
      </Wraper>
    );
  }
  return (
    <Wraper className="bg-purple-500 min-h-screen pt-28">
      <div className="max-w-4xl mx-auto space-y-10 px-6">
        <Header />
        <div className="bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            {bookDetails.title}
          </h1>
          <div className="border-t border-gray-300 mt-2 mb-6"></div>
          <p className="text-lg text-gray-600 font-medium mb-4">
            <span className="font-semibold text-gray-800">Author: </span>
            {bookDetails.author}
          </p>
          <p className="text-md text-gray-500 mb-6">
            <span className="font-semibold text-gray-800">Published on: </span>
            {new Date(bookDetails.publishdate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="text-lg text-gray-700 mb-6">{bookDetails.description}</p>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
            <div>
              <p className="text-md text-gray-600">
                <span className="font-semibold text-gray-800">
                  Total Pages:
                </span>{" "}
                {bookDetails.pages}
              </p>
            </div>
            <div>
              <p className="text-md text-gray-600">
                <span className="font-semibold text-gray-800">ID: </span>
                {bookDetails._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default ClickOpenBook;
