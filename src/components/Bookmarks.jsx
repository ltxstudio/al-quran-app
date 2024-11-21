import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const Bookmarks = ({ bookmarks }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Bookmarked Ayahs
      </Typography>
      <List>
        {bookmarks.length > 0 ? (
          bookmarks.map((ayah, index) => (
            <ListItem key={index}>
              <Typography variant="body1">
                <strong>{ayah.number}:</strong> {ayah.text}
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No bookmarks added yet.</Typography>
        )}
      </List>
    </CardContent>
  </Card>
);

export default Bookmarks;
