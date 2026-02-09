import { useHikeContext } from "../context/HikeContext";

export default function NewHike() {
  const { toggleRefresh } = useHikeContext();
  async function handleSubmit(e) {
    e.preventDefault();


    const formData = new FormData(e.target);
    const newHike = {
      name: formData.get("hikeName"),
      location: formData.get("hikeLocation"),
      description: formData.get("hikeDescription"),
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHike),
      };
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/hikes`,
        options,
      );
      if (res.ok) {
        e.target.reset();
        toggleRefresh();
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error("Hiking Post error:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="hikeName">Name:</label>
      <input type="text" id="hikeName" name="hikeName" />
      <br></br>

      <label htmlFor="hikeLocation">Location:</label>
      <input type="text" id="hikeLocation" name="hikeLocation" />
      <br></br>

      <label htmlFor="hikeDescription">Description:</label>
      <input type="text" id="hikeDescription" name="hikeDescription" />
      <br></br>

      <button type="submit" id="hikeSubmit">
        Submit
      </button>
    </form>
  );
}
