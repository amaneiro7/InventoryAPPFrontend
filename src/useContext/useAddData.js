import { createCategories } from "../services/addData";
import { loading, error, setLoading, setError } from "./useGetAddData";

export function useAddData() {
    const createNewCategory = (data) => {
        setLoading(true);
        setError(false);
        createCategories(data)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };
    
    return {
        createNewCategory,
    }
}
