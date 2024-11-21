import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Box,
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReactPlayer from 'react-player';

const SurahDetails = ({ surah, toggleBookmark, bookmarkedAyahs = [], language = 'quran_bn' }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    if (surah) {
      setAudioUrl(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah.id}.mp3`);
    }
  }, [surah]);

  if (!surah) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Please select a Surah to view its details.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {surah.name} ({surah.transliteration})
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {surah.type.charAt(0).toUpperCase() + surah.type.slice(1)} Surah - {surah.total_verses} Verses
        </Typography>

        <List sx={{ mt: 2 }}>
          {surah.verses.map((ayah) => (
            <ListItem key={ayah.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {ayah.id}. {ayah.text}
                </Typography>
                <IconButton onClick={() => toggleBookmark(ayah)}>
                  {bookmarkedAyahs.some((item) => item.id === ayah.id) ? (
                    <BookmarkIcon color="primary" />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {ayah.transliteration}
              </Typography>
              {/* Displaying Translation based on selected language */}
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                Translation: {ayah[language] ? ayah[language] : "Translation not available."}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setAudioPlaying((prev) => !prev)}>
            {audioPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Typography variant="body2">Listen to Surah Recitation</Typography>
        </Box>
        <ReactPlayer
          url={audioUrl}
          playing={audioPlaying}
          controls={false}
          width="0"
          height="0"
        />
      </CardContent>
    </Card>
  );
};

export default SurahDetails;
