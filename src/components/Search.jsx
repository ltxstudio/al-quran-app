import React, { useState } from 'react';
import {
  TextField,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';

const Search = ({ surahs, onSelectSurah }) => {
  const [query, setQuery] = useState('');

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(query.toLowerCase()) ||
      surah.ayahs.some((ayah) => ayah.text.includes(query))
  );

  return (
    <Card>
      <CardContent>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <List>
          {filteredSurahs.map((surah) => (
            <ListItem
              button
              key={surah.number}
              onClick={() => onSelectSurah(surah)}
            >
              <Typography variant="body1">
                {surah.number}. {surah.name}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Search;
