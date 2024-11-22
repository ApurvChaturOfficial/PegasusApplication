import styled from "styled-components";
import BellImage from "@/bLove/hAsset/assets/bell.png"
import { Link } from "react-router-dom";


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

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  flex-basis: 40%;
  background: url(${BellImage}) no-repeat center center;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 20px;
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

const Input = styled.input`
  margin: 2px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 720px;
  height: 20px;
  margin-right: 50px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 15px;
  width: 50%;
  font-size: 1rem;
  letter-spacing: 1.2px;
`;

const MainHeading = styled.h1`
  margin-bottom: 0px;
  padding: 0px;
  font-weight: 500;
  letter-spacing: 1.2px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-variation-settings: "slnt" 0;
`;

const Para = styled.p`
  margin: 5px 0;
  letter-spacing: 1.2px;
  display: flex;
  flex-direction: row;
`;

const PageLink = styled(Link)`
  color: #000 !important;
  text-decoration: none;
  display: flex;
  margin-top: 30px;
  margin-left: 25px;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
  margin-top: 2px;
`;

const HyperLink = styled.a`
  text-decoration: none;
  color: #007bff;
  margin-left: 5px;
`;

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 330px;
  margin-top: 10px;
  margin-right: 10px;
`;

const DropdownOption = styled.option`
  font-size: 16px;
  font-weight: 400 !important;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PhoneInfo = styled.div``;

const EmailInfo = styled.div``;

const StateInfo = styled.div``;

const CityInfo = styled.div``;

const PinCode = styled.div``;

const PanCard = styled.div``;

const ContactInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 324px;
  height: 20px;
  margin-right: 50px;
`;

const ContinueLink = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;

export {
  statesAndCities,
  Container,
  ImageWrapper,
  ContentWrapper,
  Form,
  InputHeading,
  Input,
  Button,
  MainHeading,
  Para,
  PageLink,
  Image,
  HyperLink,
  Dropdown,
  DropdownOption,
  ContactInfo,
  PhoneInfo,
  EmailInfo,
  StateInfo,
  CityInfo,
  PinCode,
  PanCard,
  ContactInput,
  ContinueLink,
}
