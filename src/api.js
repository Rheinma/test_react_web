const fetchNegara = async (kd_negara) => {
    try {
        const response = await fetch(
            `https://insw-dev.ilcs.co.id/n/negara?ur_negara=${kd_negara.toUpperCase()}`
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error fetching product:", error);
    }
};

const fetchPelabuhan = async (kd_negara, kd_pelabuhan) => {
    try {
        const response = await fetch(
            `https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=${kd_negara}&ur_pelabuhan=${kd_pelabuhan}`
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error fetching product:", error);
    }
};

const fetchDescBarang = async (kd_barang) => {
    try {
        const response = await fetch(
            `https://insw-dev.ilcs.co.id/n/barang?hs_code=${kd_barang}`
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error fetching product:", error);
    }
};

const fetchTarif = async (kd_barang) => {
    try {
        const response = await fetch(
            `https://insw-dev.ilcs.co.id/n/tarif?hs_code=${kd_barang}`
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error fetching product:", error);
    }
};

export { fetchNegara, fetchPelabuhan, fetchDescBarang, fetchTarif };
