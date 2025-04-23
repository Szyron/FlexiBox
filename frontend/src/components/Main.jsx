import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Main() {
  const { user } = useContext(AuthContext);

  return (
    <section className="text-gray-600 body-font bg-base-200 dark:bg-slate-900">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-4 py-10 md:px-12 lg:px-24 pb-28 md:pb-10">

        {/* Szöveges rész */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
          <div className="divider divider-secondary w-full text-2xl font-extrabold leading-9 tracking-tight text-primary dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal"></div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Üdvözlünk a FlexiStore demóban!
          </h1>

          <p className="mb-6 leading-relaxed dark:text-gray-300 text-info max-w-md">
            Egy modern platform, ahol a jövő automatizált bérlési rendszere épül. <br />
            Fedezd fel a legújabb technológiákat és innovációkat, amelyek jobbá teszik az életedet!
          </p>

          <p className="text-info font-bold mb-6">
            Készítette: Szirony Balázs Gábor és Gombkötő Gábor <br />
            © Minden jog fenntartva.
          </p>

          <div className="divider divider-secondary w-full"></div>

          <div className="flex gap-4 mt-4 flex-wrap justify-center lg:justify-start">
            <Link to="/lockers" className="btn btn-primary text-white">Csomagautomaták</Link>
            {!user && (
              <Link to="/register2" className="btn btn-info text-white">Regisztráció</Link>
            )}
          </div>
        </div>

        {/* Illusztráció */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <svg
            className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Main