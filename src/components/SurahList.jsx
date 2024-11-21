import React from 'react';
import { Card, CardContent, Typography, List, ListItem, IconButton, Box, Divider, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

const SurahList = ({ surahs, onSelectSurah }) => {
  const theme = useTheme(); // For dynamic styling

  return (
    <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Surah List
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <List>
          {surahs.map((surah) => (
            <ListItem
              button
              key={surah.id}
              onClick={() => onSelectSurah(surah)}
              sx={{
                padding: 2,
                borderRadius: 2,
                marginBottom: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={8}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    <strong>{surah.id}.</strong> {surah.name} ({surah.transliteration})
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {surah.total_verses} Verses
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton edge="end">
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SurahList;
