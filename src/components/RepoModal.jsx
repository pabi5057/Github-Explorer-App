import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Link,
} from '@mui/material';

const RepoModal = ({ repo, onClose }) => {
  if (!repo) return null;

  return (
    <Dialog open={Boolean(repo)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{repo.name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          {repo.description || 'No description available.'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RepoModal;
