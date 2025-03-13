import logo from "../assets/logo.png";
export default function Header({ title }) {
  return (
    <>
      <header className="flex flex-col items-center justify-center  mb-8">
        <img
          src={logo}
          alt="A canvas"
          className="object-contain mb-8 w-64 h-44"
        />
        <h1 className="text-2xl md:text-4xl font-semibold tracking-widest  text-stone-900  font-[Pacifico] m-0">
          EnPoint Bank
        </h1>
        <h2 className="text-2xl md:text-l font-bold tracking-widest  text-stone-500  m-0">
          {title}
        </h2>
        <p className="text-center text-stone-500 m-0">
          Pure Banking, Nothing Else
        </p>
      </header>
    </>
  );
}
