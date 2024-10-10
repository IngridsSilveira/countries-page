import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Api {
  id: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  flags: {
    png: string;
    svg: string;
  };
}
export const Section = () => {
  const [input, setInput] = useState<string>("");
  const [paises, setPaises] = useState<Api[]>([]);

  const pesquisa = () => {
    const nomePaises = paises.map((pais) => pais.name.common)
    const teste = nomePaises.find((pais) => input === pais)
    console.log("o nome ", nomePaises);
    console.log("testando ", teste);
  }

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/all`;

    const ApiFetch = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPaises(json.slice(200, 250));
      } catch (error) {
        console.log("Não foi possível realizar essa solicitação ", error);
      }
    };
    ApiFetch();
    pesquisa()
  }, [input]);

  return (
    <section className="min-h-auto flex flex-col p-4 gap-6">
      <div className="flex justify-between relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-20 py-3 rounded-md shadow-md font-mono font-bold"
          placeholder="Pesquise pelo país"
        />
        <CiSearch className="absolute left-4 top-3" size={25} />
        <p>{input}</p>

        <select id="selectItens" className="bg-white p-2 font-baloo font-semibold">
            <label>Filtro</label>
            <option selected disabled>Filtro pela Região</option>
            <option value="America">Africa</option>
            <option value="America">America</option>
            <option value="America">Europe</option>
            <option value="America">Asia</option>
            <option value="America">Oceania</option>
        </select>
      </div>
      <article className="flex flex-row flex-wrap gap-10 justify-center">
        {paises.map((pais) => (
          <div
            id={pais.id}
            className="h-80 w-64 rounded-sm shadow-lg dark:shadow-white dark:shadow-sm bg-white dark:bg-black dark:text-white hover:scale-105"
          >
            <img
              className="h-2/4 w-full rounded-t-sm"
              src={pais?.flags.png}
              alt="Bandeira dos países"
            />
            <h1 className="font-bold font-baloo pl-4 pt-2 text-lg">{pais?.name.common}</h1>
            <div className="p-4">
              <p>
                <span className="font-semibold">População: </span>
                {new Intl.NumberFormat().format(pais?.population ?? 0)}
              </p>
              <p>
                <span className="font-semibold">Região:</span> {pais?.region}
              </p>
              <p>
                <span className="font-semibold">Capital:</span> {pais?.capital}
              </p>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};
