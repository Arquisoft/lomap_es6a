import React, { useState, useRef, FormEvent } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

interface AddCommentViewProps {
  map: Map;
  marker: Marker;
}

const AddCommentView: React.FC<AddCommentViewProps> = ({ map, marker }) => {
  const [comment, setComment] = useState('');
  const mapRef = useRef<Map>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const popup = new mapboxgl.Popup()
      .setLngLat(marker.getLngLat())
      .setHTML(`<p>${comment}</p>`)
      .addTo(map);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Add a comment:</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCommentView;
