import { useNavigate } from "react-router-dom";
import { useHikeContext } from "../context/HikeContext";
import Button from "./ui/Button";
import Form from "./ui/Form";
import Input from "./ui/Input";

export default function NewHike() {
  const { toggleRefresh } = useHikeContext();
  const navigate = useNavigate();
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
        const data = await res.json();
        console.log(data);
        e.target.reset();
        toggleRefresh();
        navigate(`/hikes/${data[0].id}`);
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error("Hiking Post error:", error);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" id="hikeName" name="hikeName" label="Name:" />
      <Input
        type="textarea"
        id="hikeLocation"
        name="hikeLocation"
        label="Location:"
      />
      <Input
        type="text"
        id="hikeDescription"
        name="hikeDescription"
        label="Description:"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
