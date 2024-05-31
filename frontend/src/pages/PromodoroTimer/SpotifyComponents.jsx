import React, { useState, useEffect } from 'react';
import { Spotify } from 'react-spotify-embed'; // Adjust the import based on the actual Spotify component you are using

const isValidUrl = (url) => {
  try {
    new URL(url); // Try to construct URL object
    return true; // If successful, URL is valid
  } catch (error) {
    return false; // If error occurs, URL is invalid
  }
};

const SpotifyComponent = ({ playListLink }) => {
  const [isValidLink, setIsValidLink] = useState(true); // Default to true to avoid initial error message
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Set loading to true when URL validation starts
    setIsValidLink(isValidUrl(playListLink)); // Check if link is valid URL when playListLink changes
    setLoading(false); // Set loading back to false after URL validation completes
  }, [playListLink]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : !isValidLink ? (
        <div>Invalid URL</div>
      ) : (
        <Spotify link={playListLink} />
      )}
    </div>
  );
};

export default SpotifyComponent;

