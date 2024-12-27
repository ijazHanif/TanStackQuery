import React, { useState, useEffect } from "react";
import {
  Wraper,
  Input,
  TextButton,
  axiosInstance,
  headerJson,
} from "../../components/shared/CommonImports";
import Header from "./Header";
import Alert from "./Alert";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BookForm = ({ isEditMode = false }) => {
  const { bookId } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    publishdate: "",
  });
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Fetch single book for editing
  const { data: bookData, isLoading } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/books/${bookId}`);
      return res.data;
    },
    enabled: isEditMode && !!bookId, // Only fetch in edit mode
  });

  useEffect(() => {
    if (bookData) {
      setFormData({
        title: bookData.title || "",
        description: bookData.description || "",
        author: bookData.author || "",
        publishdate: bookData.publishdate
          ? new Date(bookData.publishdate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [bookData]);

  const mutation = useMutation({
    mutationFn: async (bookData) => {
      if (isEditMode && bookId) {
        return await axiosInstance.patch(`/books/${bookId}`, bookData, headerJson);
      } else {
        return await axiosInstance.post(`/books`, bookData, headerJson);
      }
    },
    onSuccess: async (response) => {
      const newbook = response.data
      if(isEditMode){
      const updatedBook = await axiosInstance.get(`/books/${bookId}`);
      queryClient.setQueryData(["books"], (oldBooks) => {
        console.log(oldBooks)
        return oldBooks.map((book) =>
          book._id === bookId ? { ...updatedBook.data } : book
        );
      });
      setFormData({
        title: "",
        description: "",
        author: "",
        publishdate: "",
      })
     }else{
      queryClient.setQueryData(["books"],(oldBooks=[])=>{
        return [...oldBooks, newbook]
      })
      if (!isEditMode) {
          setFormData({
            title: "",
            description: "",
            author: "",
            publishdate: "",
          });
     }
    }
    },
    onError: () => {
      setError("Something went wrong in adding book.");
      setShowAlert(true);
    },
  });

   const updatedCache = queryClient.getQueryData(['books'])
   console.log('updated Cache:', updatedCache)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Wraper className="bg-purple-500 min-h-screen pt-28">
      <div className="max-w-screen-md mx-auto space-y-10">
        <Header />
        {showAlert && (
          <Alert message={error} onClose={() => setShowAlert(false)} />
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 space-y-6"
        >
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Book" : "Add Book"}
          </h1>
          {["title", "description", "author", "publishdate"].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-gray-600 capitalize font-semibold text-md">
                {field}
              </label>
              <Input
                type={field === "publishdate" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border rounded w-full  text-lg"
              />
            </div>
          ))}
          <TextButton
            type="submit"
            variant="primary"
            disabled={mutation.isLoading}
            className="w-full"
          >
            {isEditMode ? "Update Book" : "Add Book"}
          </TextButton>
        </form>
      </div>
    </Wraper>
  );
};

export default BookForm;
