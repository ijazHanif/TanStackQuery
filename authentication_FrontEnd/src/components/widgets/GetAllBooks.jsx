import React, { useState } from "react";
import {
  Wraper,
  useNavigate,
  axiosInstance,
} from "../../components/shared/CommonImports";
import Header from "./Header";
import edit from "../../assets/edit.svg";
import delet from "../../assets/delet.svg";
import book from "../../assets/book.png";
import calendar from "../../assets/calendar.png";
import Alert from "./Alert";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";

const GetAllBooks = () => {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const cachedBooks = queryClient.getQueryData(["books"]);
      if (cachedBooks) {
        return cachedBooks;
      } else {
        const response = await axiosInstance.get("/books");
        return response.data;
      }
    },
    staleTime: 5000,
    cacheTime: 10000,
    refetchOnWindowFocus: false,
    // enabled: false,  // disabled the book query
    // retry:5,
  });
  
  const deleteBookMutation = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/books/${id}`);
      return id;
    },
    onSuccess: (bookId) => {
      // Update cached data by filtering out the deleted book
      queryClient.setQueryData(["books"], (oldBooks) =>(oldBooks || []).filter((book) => book._id !== bookId)
      );
      setError("Book is deleted successfully.");
      setShowAlert(true);
    },
    onError: (err) => {
      console.error("Error deleting book:", err);
      let errorMessage = "An error occurred while deleting the book.";
      if (err.response) {
        console.error("Error response:", err.response.data);
        if (err.response.status === 404) {
          errorMessage = "Book not found. 404 code";
        } else if (err.response.status === 401) {
          errorMessage = "Unauthorized request. Please log in. 401 code";
        } else if (err.response.status === 403) {
          errorMessage =
            "Unauthorized user tried to delete the book. 403 code";
        }
      } else if (err.request) {
        console.error("Network request failed:", err.request);
        errorMessage = "Network error. Please try again.";
      }
      setError(errorMessage);
      setShowAlert(true);
    },
  });
  
  const handleDelete = (id, e) => {
    e.preventDefault();
    console.log("Deleting book with ID:", id);
    deleteBookMutation.mutate(id);
  };
  

  const handleEdit = (bookId) => {
    navigate(`/editbook/${bookId}`);
  };

  const openBook = (openBookId) => {
    navigate(`/openbook/${openBookId}`);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching books.</div>;
  }

  return (
    <div>
      {showAlert && <Alert message={error} onClose={closeAlert} />}{" "}
      <Wraper className="bg-purple-500 min-h-screen pt-28">
        <div className="max-w-screen-md mx-auto space-y-10">
          <Header />
          <div>
            <form className="bg-white rounded-lg p-6 space-y-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-purple-taupe">
                  All Books
                </h1>
                <input
                  type="search"
                  placeholder="Search by title or Author"
                  className="outline-blue-600 shadow-lg rounded px-2"
                />
              </div>
              <div className="space-y-6 overflow-auto max-h-80">
                {books.map((item) => (
                  <div key={item._id}>
                    <h1 className="text-purple-taupe text-xl font-bold">
                      {item.title}
                    </h1>
                    <p className="pb-1">{item.description}</p>
                    <div className="flex justify-between">
                      <div className="text-sm flex space-x-2 font-semibold">
                        <button
                          className="flex items-center bg-orange-300 rounded px-1"
                          onClick={() => openBook(item._id)}
                        >
                          <img
                            src={book}
                            alt="book"
                            className="w-5 text-white pr-1"
                          />
                          <span>Book Details</span>
                        </button>
                        <div className="flex items-center bg-blue-300 rounded px-1 cursor-pointer">
                          <img
                            src={calendar}
                            alt="calendar"
                            className="w-5 pr-1"
                          />
                          {new Date(item.publishdate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm flex space-x-2 font-semibold">
                        <button
                          className="flex items-center bg-green-400 rounded px-1"
                          onClick={() => handleEdit(item._id)}
                        >
                          <img src={edit} alt="edit" className="w-6" />
                          <span>Edit</span>
                        </button>
                        <button
                          className="flex items-center bg-red-300 rounded px-1"
                          onClick={(e) => handleDelete(item._id, e)}
                        >
                          <img src={delet} alt="delete" className="w-6" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </Wraper>
    </div>
  );
};

export default GetAllBooks;
