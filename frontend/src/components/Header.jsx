
import { MdOutlineSettings } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import "animate.css";


export default function Header( props ) {
    const { onSettingClick } = props;
  return (
    <nav className="flex text-white w-screen absolute flex-wrap justify-around items-center pt-5 ">
      <div className="flex items-center flex-wrap">
        <h1 className=" text-l sm:text-4xl m-0">Timer</h1>
      </div>
      <ul className="list-none flex items-center space-x-4 text-l sm:text-2xl">
        <li className="flex items-center">
          <a className="flex text-white no-underline hover:opacity-50 duration-300" href="#" onClick={onSettingClick}>
            <MdOutlineSettings className="mr-2" />
            Setting
          </a>
        </li>
      </ul>
    </nav>
  );
}
