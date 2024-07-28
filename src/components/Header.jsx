import {Link,useNavigate} from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";

const Header = () => {
  // form gonderilince çalisacak fonksiyon
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  //Aratılacak metin
  const text=e.target[0].value;
  //Metin boşsa fonksiyonu durdur.
  if (text.trim() === "") return;
  navigate(`/results?search_query=${text}`);
  };
  return (
    <header className="flex justify-between items-center p-4">
       <Link to="/" className="flex items-center gap-2">
         <img src="/youtube.png" alt="logo" className="w-[50px] " />
         <h1 className="text-2xl font-mono max-sm:hidden">Youtube</h1>
       </Link>
      <form 
         onSubmit={handleSubmit}
         className="group flex border border-gray-400 rounded-[20px] overflow-hidden">
     
       <input
          type="text"
          placeholder="Ara..."
          className="group-hover:border group-hover:border-blue-500 bg-black text-white py-1 px-5 outline-none rounded-l-[20px] focus:border-blue-500"
          
       />
       <button className="px-4 text-2xl bg-zinc-800">
          <CiSearch />
       </button>
      </form>
      
      <div className="flex gap-3 text-xl cursor-pointer">
        <FaBell className="hover:text-gray-400 transition duration-[250ms]" />
        <IoIosVideocam className="hover:text-gray-400 transition duration-[250ms]" />
        <MdVideoLibrary className="hover:text-gray-400 transition duration-[250ms]" />
      </div>
      


    </header>
  );
};

export default Header;
