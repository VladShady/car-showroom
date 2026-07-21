import {useState, useEffect} from "react";
import {fetchVehicles} from "../../api/vehiclesApi";
import {VehicleCard} from "../../components/VehicleCard/VehicleCard";
import styles from './Home.module.scss';

export function Home() {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchVehicles();
                setVehicles(data);
            } catch (error) {
                setError('Failed to fetch vehicles.');
            } finally {
                setIsLoading(false);
        } 
        };

        loadData();
    }, []);

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) || vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if(isLoading) return <div className={styles.message}>Loading...</div>
    if(error) return <div className={styles.error}>{error}</div>

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            {filteredVehicles.length > 0 ? (
                <div className={styles.grid}>
                    {filteredVehicles.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            ) : (
                <div className={styles.message}>No vehicles found.</div>
            )}
        </div>
    );
}