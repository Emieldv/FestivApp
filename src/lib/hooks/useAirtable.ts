import { useEffect, useState } from "react";

const API = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_KEY}`;

export const useAirTable = (url: string, fields?: string[]) => {
  const [state, setState] = useState<{
    data: any | null;
    error: any | null;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const filter = fields?.map((field) => "fields%5B%5D=" + field).join("&");

    fetch(`${API}${url}${fields ? "?" + filter : ""}`, {
      headers: { Authorization: "Bearer keyWFjC7AsnLrN0QT" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setState({ data: null, error: json.error, loading: false });
        } else {
          setState({
            data: json.records.map(
              ({ fields, ...rest }: { fields: any; rest: any }) => ({
                ...rest,
                ...fields,
              })
            ),
            error: null,
            loading: false,
          });
        }
      })
      .catch((error) => {
        setState({ data: null, error: error, loading: false });
      });
  }, [url, fields]);

  return state;
};
