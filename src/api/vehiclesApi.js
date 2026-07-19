const BASE_URL = 'https://dummyjson.com';

export const fetchVehicles = async () => {
    try {
        const res = await fetch(`${BASE_URL}/products/category/vehicle`);
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export const fetchVehicleById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching vehicle with id ${id}:`, error);
        throw error;
    }
}