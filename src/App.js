import "./styles.css";
import { useState } from "react";
import {
  fetchDescBarang,
  fetchNegara,
  fetchPelabuhan,
  fetchTarif
} from "./api";

export default function App() {
  let idField = {
    kd_negara: "",
    ur_negara: "",
    kd_pelabuhan: "",
    ur_pelabuhan: "",
    hs_code_format: "",
    uraian_id: "",
    sub_header: "",
    bm: "",
    harga: 0
  };
  const [field, setField] = useState(idField);
  const handleChangeNegaraField = async (e) => {
    const { ur_negara, ...rest } = field;

    const updatedField = {
      ur_negara: e.target.value,
      ...rest
    };
    setField(updatedField);
    if (e.target.value.length === 3) {
      const data = await fetchNegara(e.target.value);
      if (data !== undefined && data.data.length > 0) {
        const { kd_negara, ur_negara, ...rest } = field;

        const updatedField = {
          kd_negara: data.data[0].kd_negara,
          ur_negara: data.data[0].ur_negara,
          ...rest
        };
        setField(updatedField);
      }
    } else {
      setField(updatedField);
    }
  };

  const handleChangePelabuhanField = async (e) => {
    const { ur_pelabuhan, ...rest } = field;

    const updatedField = {
      ur_pelabuhan: e.target.value,
      ...rest
    };
    setField(updatedField);
    if (e.target.value.length === 3) {
      const data = await fetchPelabuhan(field.kd_negara, e.target.value);
      if (data !== undefined && data.data.length > 0) {
        const { kd_pelabuhan, ur_pelabuhan, ...rest } = field;

        const updatedField = {
          kd_pelabuhan: data.data[0].kd_pelabuhan,
          ur_pelabuhan: data.data[0].ur_pelabuhan,
          ...rest
        };
        setField(updatedField);
      }
    } else {
      setField(updatedField);
    }
  };

  const handleChangeDescField = async (e) => {
    const { hs_code_format, ...rest } = field;

    const updatedField = {
      hs_code_format: e.target.value,
      ...rest
    };
    setField(updatedField);
    const data = await fetchDescBarang(e.target.value);
    const bmData = await fetchTarif(e.target.value);
    if (data && data.data && data.data.length > 0 && bmData && bmData.data && bmData.data.length > 0) {
      const { sub_header, uraian_id, bm, ...rest } = field;

      const updatedField = {
        sub_header: data.data[0].sub_header,
        uraian_id: data.data[0].uraian_id,
        bm: bmData.data[0].bm,
        ...rest
      };
      setField(updatedField);
    } else {
      // Handle the case when data or bmData is undefined or empty
      const updatedField = {
        sub_header: "",
        uraian_id: "",
        bm: "",
        ...rest
      };
      setField(updatedField);
    }
  };

  return (
    <div className="App">
      <div>
        <label>Negara </label>
        <input onChange={handleChangeNegaraField} value={field.ur_negara} />
      </div>
      <div>
        <label>Pelabuhan </label>
        <input
          onChange={handleChangePelabuhanField}
          value={field.ur_pelabuhan}
        />
      </div>
      <div>
        <label>Barang </label>
        <input
          onChange={handleChangeDescField}
        />
      </div>
      <div>
        <label> </label>
        <textarea readOnly value={`${field.sub_header} ${field.uraian_id}`} />
      </div>
      <div>
        <label>Harga </label>
        <input
          onChange={(e) => {
            const { harga, ...rest } = field;

            const updatedField = {
              harga: e.target.value,
              ...rest
            };
            setField(updatedField);
          }}
          type="number"
          value={field.harga}
        />
      </div>
      <div>
        <label>Tarif Bea Masuk </label>
        <input readOnly type="number" value={field.bm} />
        <span> %</span>
      </div>
      <div>
        <label></label>
        <input
          type="number"
          readOnly
          value={field.harga * (parseInt(field.bm) / 100)}
        />
      </div>
    </div>
  );
}
