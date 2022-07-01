import { useEffect, useState } from "react";

interface AirtableData<Type> {
  data: Type | null;
  error: any | null;
  loading: boolean;
}

const API = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_KEY}`;
const BEARER = `Bearer ${process.env.REACT_APP_AIRTABLE_BEARER}`;

export function useAirTable<Type>(url: string, fields?: string[]) {
  const [state, setState] = useState<AirtableData<Type>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fn = async () => {
      const filter = fields?.map((field) => "fields%5B%5D=" + field).join("&");

      const result = await fetcher<Type>(url, filter);
      setState(result);
    };

    fn();
  }, [url, fields]);

  return state;
}

async function fetcher<Type>(
  url: string,
  filter: string | undefined
): Promise<AirtableData<Type>> {
  const data = fetch(`${API}${url}${filter ? "?" + filter : ""}`, {
    headers: { Authorization: BEARER },
  })
    .then((response) => response.json())
    .then(async (json) => {
      if (json.error) {
        return { data: null, error: json.error, loading: false };
      } else {
        // Detect offset
        if (json.offset) {
          let recordsArray = json.records;

          await fetch(
            `${API}${url}?offset=${json.offset}${filter ? "&" + filter : ""}`,
            {
              headers: { Authorization: BEARER },
            }
          )
            .then((response) => response.json())
            .then((json) => recordsArray.push(...json.records));

          return {
            data: recordsArray.map(
              ({ fields, ...rest }: { fields: any; rest: any }) => ({
                ...rest,
                ...fields,
              })
            ),
            error: null,
            loading: false,
          };
        } else {
          return {
            data: json.records.map(
              ({ fields, ...rest }: { fields: any; rest: any }) => ({
                ...rest,
                ...fields,
              })
            ),
            error: null,
            loading: false,
          };
        }
      }
    })
    .catch((error) => {
      return { data: null, error: error, loading: false };
    });

  return await data;
}
