import { useParams } from 'react-router-dom';

function HikeSingular() {
    const { hike } = useParams();
    console.log(useParams());
    return (
      <>
        <p>${hike}</p>
      </>
    );
}

export default HikeSingular;