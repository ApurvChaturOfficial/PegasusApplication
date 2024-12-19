import baseURL from "@/bLove/hAsset/aBaseURl";
import axios from "axios";


const handleImageCreateForObject = async (event: any, fieldName: any, fieldName2: any, setFormObject: any, setFileLoading: any) => {
  setFileLoading(true)

  if (!event.target.files?.[0]) {
    alert("Please select an image!");
    return setFileLoading(false);
  }

  const formData = new FormData();
  formData.append("image", event.target.files?.[0]);
  formData.append("folder", "folder");

  try {
    const response = await axios.post<{ create: { url: string, pid: string } }>(
      `${baseURL}/single-image/create/`,
      formData,
      { 
        headers: { "Content-Type": "multipart/form-data" }, 
        withCredentials: true,
      },
    );

    // console.log(response.data.create);
    // setFileID(response.data.create.pid)
    // setFile(response.data.create.url)
    setFormObject((prev: any) => ({
      ...prev,
      [fieldName]: response.data.create.url,
      [fieldName2]: response.data.create.pid,
    }))
    return;
  } catch (error) {
    console.error(error);
  } finally {
    setFileLoading(false)
  }
}

export default handleImageCreateForObject;
