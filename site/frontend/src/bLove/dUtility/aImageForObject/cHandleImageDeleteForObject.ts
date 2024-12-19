import axios from "axios";


const handleImageDeleteForObject = async (fieldName: any, fieldName2: any, setFormObject: any, setFileLoading: any, fileID: any) => {
  setFileLoading(true)
  
  try {
    const parts = fileID?.split("/");

    const response = await axios.post(
      "http://localhost:8080/api/v1/single-image/delete/",
      {
        folder: "folder",
        public_id: parts?.[parts.length - 1]
      },
      { 
        withCredentials: true,
      },
    );

    console.log(response.data);
    // setFileID(null)
    // setFile(null)
    setFormObject((prev: any) => ({
      ...prev,
      [fieldName]: null,
      [fieldName2]: null,
    }))
    return;
  } catch (error) {
    console.error(error);
  } finally {
    setFileLoading(false)
  } 
}

export default handleImageDeleteForObject;
