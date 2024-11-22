import cloudinary from "cloudinary";


const fileStorageConnection = () => {
  cloudinary.v2.config({
    cloud_name: 'dgfi3c7dv',
    api_key: '325321982625387',
    api_secret: '3bgj8SzmoyRzxa3ZTjhMpfaaaZI'
  })
}

export default fileStorageConnection;
