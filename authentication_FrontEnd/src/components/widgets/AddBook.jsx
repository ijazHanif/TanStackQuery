// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useHistory } from "react-router-dom"; // If you're using React Router

// function BookForm({ isEditMode }) {
//   const [book, setBook] = useState({
//     title: "",
//     description: "",
//     author: "",
//     publishdate: "",
//   });
//   const [error, setError] = useState("");
//   const { id } = useParams(); // For edit mode to get the book ID from the URL
//   const history = useHistory(); // To redirect after adding or editing a book

//   // If in edit mode, fetch the book details to pre-fill the form
//   useEffect(() => {
//     if (isEditMode && id) {
//       const fetchBookDetails = async () => {
//         try {
//           const response = await axios.get(`/api/books/${id}`);
//           setBook(response.data); // Pre-fill form with book data
//         } catch (err) {
//           console.error("Error fetching book details:", err);
//         }
//       };
//       fetchBookDetails();
//     }
//   }, [isEditMode, id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBook({
//       ...book,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!book.title || !book.description || !book.author || !book.publishdate) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       if (isEditMode) {
//         // Edit mode: Update an existing book
//         await axios.put(`/api/books/${id}`, book, {
//           headers: { Authorization: `Bearer YOUR_TOKEN` },
//         });
//         alert("Book updated successfully!");
//       } else {
//         // Add mode: Create a new book
//         await axios.post("/api/books", book, {
//           headers: { Authorization: `Bearer YOUR_TOKEN` },
//         });
//         alert("Book added successfully!");
//       }
//       // Redirect or refresh
//       history.push("/books"); // Redirect to book list
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       setError(
//         err.response?.data?.error || "An error occurred while submitting the form."
//       );
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">
//         {isEditMode ? "Edit Book" : "Add a New Book"}
//       </h2>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={book.title}
//             onChange={handleInputChange}
//             placeholder="Enter book title"
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Description</label>
//           <textarea
//             name="description"
//             value={book.description}
//             onChange={handleInputChange}
//             placeholder="Enter book description"
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Author</label>
//           <input
//             type="text"
//             name="author"
//             value={book.author}
//             onChange={handleInputChange}
//             placeholder="Enter author name"
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Publish Date</label>
//           <input
//             type="date"
//             name="publishdate"
//             value={book.publishdate}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           {isEditMode ? "Update Book" : "Add Book"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default BookForm;









// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import {
//   React,
//   Wraper,
//   Input,
//   FormHeader,
//   FormPara,
//   TextButton,
//   useNavigate,
//   Link,
//   axiosInstance, 
//   headerJson,
//   toast, 
// } from "../components/shared/CommonImports";
// import 'react-toastify/dist/ReactToastify.css';

// const BookForm = () => {
//     const initialValues = {
//         title:'',
//         description:'',
//         author:'',
//         publishDate:'',
//         owner:''
//     }
//     const validationSchema = Yup.object({
//         title:Yup.string().
//         required('Book title is required'),
//         description:Yup.string().
//         required('Book description is required'),
//         author:Yup.string().
//         required('Author name is required'),
//         publishDate:Yup.string().
//         required('Book Publish date is required'),
//         owner:Yup.string()
//         .required('Book Owner name is required')
//     })
//   return (
//     <Formik 
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       validateOnChange={true}
//       validateOnBlur={true}
//       onSubmit={handleSubmit}
//     >
//       {(errors , touched)=>(
//        <div className="bg-gray-300 min-h-screen">
//         <Wraper>
//          <div>
//             <div>
//                 <FormHeader>Add Book</FormHeader>
//             </div>
//             <Form>
//               <div>
//                 <label>Title</label>
//                 <Field
//                   as={Input}
//                   type='text'
//                   name='title'
//                   placeholder='Book title'
//                   className={
//                     touched.title && errors.title
//                     ?'border-red-500':''
//                   }
//                 />
//                 <ErrorMessage
//                  name="title"
//                  component={div}
//                  className="text-red-500 text-sm"
//                 />
//               </div>
//             </Form>
//          </div>
//         </Wraper>
//        </div>
//       )}
//     </Formik>
//   )
// }

// export default BookForm




// Book Form Component
import React, { useState, useEffect } from "react";
import {
  Wraper,
  Input,
  TextButton,
  axiosInstance,
  headerJson,
} from "../../components/shared/CommonImports";
import Header from "./Header";
import Alert from "./Alert"; // Import Alert component
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../components/shared/CommonImports";

const arr = [
  {
    label: "Title",
    type: "text",
    placeholder: "Enter title",
    name: "title",
  },
  {
    label: "Description",
    type: "text",
    placeholder: "Enter description",
    name: "description",
  },
  {
    label: "Author",
    type: "text",
    placeholder: "Enter Author name",
    name: "author",
  },
  {
    label: "Publish Date",
    type: "date",
    placeholder: "Enter book publish date",
    name: "publishdate",
  },
];

const BookForm = ({ isEditMode = false }) => {
  const { bookId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    publishdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false); 

  // Fetch book data when editing
  useEffect(() => {
    if (isEditMode && bookId) {
      const fetchBook = async () => {
        try {
          const response = await axiosInstance.get(`/books/${bookId}`);
  
          // Convert the publishdate to yyyy-mm-dd format if it exists
          const formattedPublishDate = response.data.publishdate
            ? new Date(response.data.publishdate).toISOString().split('T')[0]
            : '';

          setFormData({
            ...response.data,
            publishdate: formattedPublishDate,
          });
        } catch (err) {
          setError("Error fetching book data.");
          setShowAlert(true); // Show alert when there's an error fetching the book data
        }
      };
  
      fetchBook();
    }
  }, [bookId, isEditMode]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const { title, description, author, publishdate } = formData;
  
      // Convert the publishdate to ISO string before sending it
      const formattedData = {
        title,
        description,
        author,
        publishdate: publishdate ? new Date(publishdate).toISOString() : "",
      };
  
      if (isEditMode && bookId) {
        // Update existing book with PATCH request
        console.log(formattedData);
        await axiosInstance.patch(`/books/${bookId}`, formattedData, headerJson);
        console.log("This is the book ID after submission:", bookId);
        console.log("Book updated successfully.");
      } else {
        // Add a new book API integration
        await axiosInstance.post("/books", formattedData, headerJson);
        console.log("New book added successfully.");
        setFormData({
          title: "",
          description: "",
          author: "",
          publishdate: "",
        });
      }
    } catch (err) {
      if(err.response.status === 403){
      setError("UnAuthorized user are not allowed to updated");
      setShowAlert(true);
    }
      else if(err.response.status ===400){
        setError('Fill the full form')
        setShowAlert(true)
      }
      else if(err.response.status === 500){
        setError('SomeThing wrong in server')
        setShowAlert(true)
      }
      
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false); // Function to close the alert
  };
  

  return (
    <div>
      {showAlert && <Alert message={error} onClose={closeAlert} />} {/* Display alert */}
      <Wraper className="bg-purple-500 min-h-screen pt-28">
        <div className="max-w-screen-md mx-auto space-y-10">
          <Header />
          <div>
            <form className="bg-white rounded-lg" onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold">
                  {isEditMode ? "Edit Book" : "Add Book"}
                </h1>
                {arr.map((item, index) => (
                  <div className="space-y-1.5" key={index}>
                    <label className="text-gray-600 text-md font-medium">
                      {item.label}
                    </label>
                    <Input
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      value={formData[item.name] || ""}
                      className="border-none outline-none text-lg"
                    />
                  </div>
                ))}
                {/* {error && <div className="text-red-500">{error}</div>} */}
                <TextButton
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
                </TextButton>
              </div>
            </form>
          </div>
        </div>
      </Wraper>
    </div>
  );
};

export default BookForm;
