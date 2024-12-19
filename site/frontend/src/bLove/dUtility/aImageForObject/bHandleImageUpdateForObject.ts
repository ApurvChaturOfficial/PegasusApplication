import axios from "axios";


const handleImageUpdateForObject = async (event: any, fieldName: any, fieldName2: any, setFormObject: any, setFileLoading: any, fileID: any) => {
  setFileLoading(true)

  if (!event.target.files?.[0]) {
    alert("Please select an image!");
    return setFileLoading(false);
  }

  const parts = fileID?.split("/");

  const formData = new FormData();
  formData.append("image", event.target.files?.[0]);
  formData.append("folder", "folder");
  formData.append("public_id", parts?.[parts.length - 1]);

  try {
    const response = await axios.post<{ update: { url: string, pid: string } }>(
      "http://localhost:8080/api/v1/single-image/update/",
      formData,
      { 
        headers: { "Content-Type": "multipart/form-data" }, 
        withCredentials: true,
      },
    );

    // console.log(response.data.update);
    // setFileID(response.data.update.pid)
    // setFile(response.data.update.url)
    setFormObject((prev: any) => ({
      ...prev,
      [fieldName]: response.data.update.url,
      [fieldName2]: response.data.update.pid,
    }))
    return;
  } catch (error) {
    console.error(error);
  } finally {
    setFileLoading(false)
  } 
}

export default handleImageUpdateForObject;
