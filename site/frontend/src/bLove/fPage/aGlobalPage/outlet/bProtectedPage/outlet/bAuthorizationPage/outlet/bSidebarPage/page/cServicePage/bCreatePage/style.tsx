// import { Link } from "react-router-dom";
import styled from "styled-components";


const license = [
  "License - 10",
  "License - 10A",
  "License - 11",
  "License - 11-A",
  "License - 12-B",
  "License - 25",
  "License - 25B",
  "License - 28",
  "License - 28-B",
  "License - 28-D",
  "License - 25-F",
  "License - 25-A",
  "License - 28-A",
  "License - 28-DA",
  "License - 25-D",
  "License - 25-E",
  "License - 25-C",
  "License - COS-2",
  "License - COS-3",
  "License - COS-4A",
  "License - COS-8",
  "License - COS-9",
  "License - Form 29",
  "License - Form 28-C",
  "License - Form 28-E",
  "License - Form 28-F",
  "License - Annexure C",
  "License - Form 37",
  "License - Form 48",
  "License - COS-23",
  "License - MD-2",
  "License - MD-5",
  "License - MD-6",
  "License - MD-9",
  "License - MD-10",
  "License - MD-13",
  "License - MD-15",
  "License - MD-17",
  "License - MD-19",
  "License - MD-21",
  "License - MD-23",
  "License - MD-25",
  "License - MD-27",
  "License - MD-29",
  "License - 20",
  "License - 20A",
  "License - 20B",
  "License - 20BB",
  "License - 20C",
  "License - 20D",
  "License - 20F",
  "License - 20G",
  "License - 21",
  "License - 21A",
  "License - 21B",
  "License - 21BB",
];

const companyData = [
  {
    companyName: "CompanyName1",
    firmType: "Firmtype1",
    contactInfo: {
      id: "ABC12345XYZ",
      phone: "+91-987653210",
      email: "untawalegaurav22@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
  {
    companyName: "CompanyName2",
    firmType: "Firmtype2",
    contactInfo: {
      id: "XYZ98765ABC",
      phone: "+91-1234567890",
      email: "untawalegaurav22@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
  {
    companyName: "CompanyName3",
    firmType: "Firmtype2",
    contactInfo: {
      id: "XYZ98765ABC",
      phone: "+91-1234567890",
      email: "untawalegaurav22@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
  {
    companyName: "CompanyName4",
    firmType: "Exporter",
    contactInfo: {
      id: "XYZ98765ABC",
      phone: "+91-1234567890",
      email: "23.digvijaypatil@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
];

const statesAndCities = {
"Andhra Pradesh": [
  "Visakhapatnam",
  "Vijayawada",
  "Guntur",
  "Nellore",
  "Kurnool",
  "Tirupati",
  "Rajahmundry",
  "Kakinada",
  "Eluru",
  "Ongole",
  "Anantapur",
  "Kadapa",
  "Chittoor",
  "Vizianagaram",
  "Machilipatnam",
],
"Arunachal Pradesh": [
  "Itanagar",
  "Tawang",
  "Ziro",
  "Pasighat",
  "Bomdila",
  "Tezu",
  "Aalo",
  "Naharlagun",
  "Khonsa",
],
Assam: [
  "Guwahati",
  "Dibrugarh",
  "Silchar",
  "Jorhat",
  "Tezpur",
  "Nagaon",
  "Tinsukia",
  "Bongaigaon",
  "Karimganj",
  "Sivasagar",
],
Bihar: [
  "Patna",
  "Gaya",
  "Bhagalpur",
  "Muzaffarpur",
  "Darbhanga",
  "Purnia",
  "Bihar Sharif",
  "Arrah",
  "Begusarai",
  "Katihar",
],
Chhattisgarh: [
  "Raipur",
  "Bilaspur",
  "Durg",
  "Bhilai",
  "Korba",
  "Rajnandgaon",
  "Jagdalpur",
  "Ambikapur",
  "Raigarh",
  "Dhamtari",
],
Goa: [
  "Panaji",
  "Margao",
  "Vasco da Gama",
  "Mapusa",
  "Ponda",
  "Bicholim",
  "Curchorem",
  "Sanguem",
  "Sanquelim",
  "Quepem",
],
Gujarat: [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Junagadh",
  "Gandhinagar",
  "Anand",
  "Navsari",
  "Morbi",
  "Nadiad",
  "Surendranagar",
  "Bharuch",
  "Mehsana",
],
Haryana: [
  "Chandigarh",
  "Gurugram",
  "Faridabad",
  "Ambala",
  "Panipat",
  "Hisar",
  "Karnal",
  "Sonipat",
  "Rohtak",
  "Yamunanagar",
],
"Himachal Pradesh": [
  "Shimla",
  "Manali",
  "Dharamshala",
  "Kullu",
  "Solan",
  "Mandi",
  "Chamba",
  "Palampur",
  "Hamirpur",
  "Kangra",
],
Jharkhand: [
  "Ranchi",
  "Jamshedpur",
  "Dhanbad",
  "Bokaro",
  "Deoghar",
  "Hazaribagh",
  "Giridih",
  "Ramgarh",
  "Phusro",
  "Gumia",
],
Karnataka: [
  "Bengaluru",
  "Mysuru",
  "Mangalore",
  "Hubli",
  "Belgaum",
  "Gulbarga",
  "Davangere",
  "Bellary",
  "Bijapur",
  "Shimoga",
  "Tumkur",
  "Raichur",
  "Bidar",
  "Hospet",
  "Hassan",
],
Kerala: [
  "Thiruvananthapuram",
  "Kochi",
  "Kozhikode",
  "Thrissur",
  "Kollam",
  "Alappuzha",
  "Palakkad",
  "Malappuram",
  "Kottayam",
  "Kasaragod",
],
"Madhya Pradesh": [
  "Bhopal",
  "Indore",
  "Gwalior",
  "Jabalpur",
  "Ujjain",
  "Sagar",
  "Dewas",
  "Satna",
  "Ratlam",
  "Rewa",
  "Murwara",
  "Singrauli",
  "Burhanpur",
  "Khandwa",
  "Bhind",
],
Maharashtra: [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Solapur",
  "Amravati",
  "Kolhapur",
  "Sangli",
  "Nanded",
  "Jalgaon",
  "Akola",
  "Latur",
  "Ahmednagar",
  "Chandrapur",
],
Manipur: [
  "Imphal",
  "Churachandpur",
  "Thoubal",
  "Ukhrul",
  "Bishnupur",
  "Senapati",
  "Tamenglong",
  "Kakching",
  "Jiribam",
  "Moirang",
],
Meghalaya: [
  "Shillong",
  "Tura",
  "Nongpoh",
  "Jowai",
  "Baghmara",
  "Williamnagar",
  "Mairang",
  "Nongstoin",
  "Cherrapunji",
  "Mawlai",
],
Mizoram: [
  "Aizawl",
  "Lunglei",
  "Saiha",
  "Champhai",
  "Serchhip",
  "Kolasib",
  "Lawngtlai",
  "Mamit",
  "Bairabi",
  "Saitual",
],
Nagaland: [
  "Kohima",
  "Dimapur",
  "Mokokchung",
  "Wokha",
  "Tuensang",
  "Mon",
  "Phek",
  "Zunheboto",
  "Longleng",
  "Kiphire",
],
Odisha: [
  "Bhubaneswar",
  "Cuttack",
  "Rourkela",
  "Sambalpur",
  "Puri",
  "Berhampur",
  "Balasore",
  "Baripada",
  "Bhadrak",
  "Jharsuguda",
  "Jeypore",
  "Angul",
  "Paradeep",
  "Bhawanipatna",
  "Dhenkanal",
],
Punjab: [
  "Chandigarh",
  "Ludhiana",
  "Amritsar",
  "Jalandhar",
  "Patiala",
  "Bathinda",
  "Hoshiarpur",
  "Mohali",
  "Pathankot",
  "Phagwara",
  "Ferozepur",
  "Zirakpur",
  "Moga",
  "Batala",
  "Abohar",
],
Rajasthan: [
  "Jaipur",
  "Udaipur",
  "Jodhpur",
  "Kota",
  "Bikaner",
  "Ajmer",
  "Bhilwara",
  "Alwar",
  "Bharatpur",
  "Sikar",
  "Pali",
  "Tonk",
  "Beawar",
  "Nagaur",
  "Barmer",
],
Sikkim: [
  "Gangtok",
  "Namchi",
  "Gyalshing",
  "Mangan",
  "Rangpo",
  "Singtam",
  "Jorethang",
  "Pelling",
  "Ravangla",
  "Yuksom",
],
"Tamil Nadu": [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Erode",
  "Tiruppur",
  "Vellore",
  "Thoothukudi",
  "Nagercoil",
  "Thanjavur",
  "Dindigul",
  "Cuddalore",
  "Kanchipuram",
  "Kumarapalayam",
],
Telangana: [
  "Hyderabad",
  "Warangal",
  "Nizamabad",
  "Karimnagar",
  "Khammam",
  "Ramagundam",
  "Mahbubnagar",
  "Mancherial",
  "Adilabad",
  "Suryapet",
  "Miryalaguda",
  "Nalgonda",
  "Jagtial",
  "Huzurabad",
  "Bhadrachalam",
],
Tripura: [
  "Agartala",
  "Dharmanagar",
  "Udaipur",
  "Kailashahar",
  "Belonia",
  "Khowai",
  "Ambassa",
  "Sabroom",
  "Sonamura",
  "Amarpur",
],
"Uttar Pradesh": [
  "Lucknow",
  "Kanpur",
  "Varanasi",
  "Agra",
  "Meerut",
  "Allahabad",
  "Bareilly",
  "Aligarh",
  "Moradabad",
  "Saharanpur",
  "Gorakhpur",
  "Noida",
  "Firozabad",
  "Jhansi",
  "Muzaffarnagar",
],
Uttarakhand: [
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Rishikesh",
  "Roorkee",
  "Haldwani",
  "Rudrapur",
  "Kashipur",
  "Pantnagar",
  "Mussoorie",
],
"West Bengal": [
  "Kolkata",
  "Darjeeling",
  "Siliguri",
  "Howrah",
  "Durgapur",
  "Asansol",
  "Malda",
  "Kharagpur",
  "Bardhaman",
  "Jalpaiguri",
  "Bally",
  "Alipurduar",
  "Cooch Behar",
  "Haldia",
  "Balurghat",
],
};

const ContactInfo = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;


const StateInfo = styled.div``;

const CityInfo = styled.div``;


const Container = styled.div`
display: flex;
flex-direction: column;
margin: 10px 50px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 750px;
`;

const InputHeading = styled.div`
margin-top: 10px;
margin-bottom: 2px;
font-weight: 500;
`;

const InputHeadingp = styled.div`
margin-top: 10px;
margin-bottom: 2px;
font-weight: 500;
width: 20%; // Adjusted width for better alignment
`;

const Input = styled.input`
margin: 2px 0;
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;
width: 720px;
height: 20px;
`;

const MainHeading = styled.h1`
margin-bottom: 0;
padding: 0;
font-weight: 500;
letter-spacing: 1.2px;
font-family: "Inter", sans-serif;
font-style: normal;
`;

const SecondaryHeading = styled.h2`
margin-bottom: 8px;
padding: 0;
font-weight: 400;
letter-spacing: 0.8px;
font-family: "Inter", sans-serif;
font-size: 1.5rem;
color: #333;
`;

const Dropdown = styled.select`
padding: 10px;
border-radius: 10px;
border: 1px solid #ccc;
font-size: 16px;
width: 100%; // Full width for better alignment
margin-top: 10px;
`;

const DropdownOption = styled.option`
font-size: 16px;
font-weight: 400;
`;

const ContactInput = styled.input`
margin: 10px 0;
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;
width: 100%; // Full width for better alignment
`;

const FileInputContainer = styled.div`
margin: 10px 0;
padding: 10px;
border: 1px dashed #ccc;
border-radius: 10px;
width: 100%; // Full width for better alignment
height: 60px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: #007bff;
`;

const FileInput = styled.input`
display: none;
`;

const FileInputLabel = styled.label`
cursor: pointer;
color: #007bff;
`;

const UploadedFile = styled.div`
margin-top: 10px;
`;

const FinalTag = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between; // Added spacing between children
`;

const AddNew = styled.button`
margin: 10px 20px 10px 0;
padding: 15px 30px;
border: 1px solid #00cf07;
border-radius: 15px;
font-size: 1.1rem;
background-color: #00cf07;
color: #fff;

&:hover {
  cursor: pointer;
  color: #00cf07;
  background-color: #fff;
}
`;

const RemoveButton = styled.button`
background-color: #dc3545;
color: white;
border: none;
padding: 10px;
border-radius: 15px;
margin-top: 25px;
width: 100px; // Adjust width for consistency
align-self: flex-end; // Align to the end of the container

&:hover {
  background-color: #c82333;
  cursor: pointer;
}
`;

const ButtonTwo = styled.button`
background-color: #007bff;
color: white;
border: none;
padding: 10px 20px;
margin-top: 50px;
cursor: pointer;
border-radius: 15px;
width: 100%;
font-size: 1rem;
letter-spacing: 1.2px;
`;

const CancelButton = styled.button`
padding: 15px 35px;
border: 1px solid #ff0000;
border-radius: 15px;
font-size: 1.1rem;
background-color: #fff;
color: #ff0000;
cursor: pointer;
margin-left: 20px;
transition: all 0.3s ease-in-out;

&:hover {
  background-color: #ff0000;
  color: #fff;
}
`;

const ButtonContainer = styled.div`
margin-top: 20px;
`;

const TopButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
margin-bottom: -20px;
`;

const CommonButton = styled.button`
padding: 15px 30px;
border-radius: 15px;
font-size: 1.1rem;
flex-grow: 1;
color: white;
cursor: pointer;

&:hover {
  opacity: 0.8;
}
`;

const SubmitButton = styled(CommonButton)`
border: 1px solid #00cf07;
background-color: #00cf07;
color: #fff;
margin-right: 20px;

&:hover {
  background-color: #fff;
  color: #00cf07;
}
`;

const RowContainer = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
`;

const RowInput = styled.input`
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;
width: 100%; // Full width for better alignment
margin-right: 20px; // Adjust margin for consistency
`;

const ExpiryDate = styled.div`
display: flex;
flex-direction: column;
width: 45%;
`;

const IssueDate = styled.div`
display: flex;
flex-direction: column;
width: 45%;
`;

export {
  license,
  companyData,
  statesAndCities,
  ContactInfo,
  StateInfo,
  CityInfo,
  Container,
  Form,
  InputHeading,
  InputHeadingp,
  Input,
  MainHeading,
  SecondaryHeading,
  Dropdown,
  DropdownOption,
  ContactInput,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  UploadedFile,
  FinalTag,
  AddNew,
  RemoveButton,
  ButtonTwo,
  CancelButton,
  ButtonContainer,
  TopButtonContainer,
  CommonButton,
  SubmitButton,
  RowContainer,
  RowInput,
  ExpiryDate,
  IssueDate,
}
