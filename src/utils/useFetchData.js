import { ref } from "vue";

export function useFetchData() {
  const isLoading = ref(false);
  const data = ref(null);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      data.value = "Fetched Data";
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, data, fetchData };
}
