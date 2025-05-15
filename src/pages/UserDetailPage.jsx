import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RepoModal from '../components/Repomodal';
import { Button, Box, Typography, Avatar } from '@mui/material';
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos, setPage } from '../features/repos/repoSlice';

const UserDetailPage = ({darkMode}) => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [selectedRepo, setSelectedRepo] = useState(null);
  const dispatch = useDispatch();
  const { repos, page, perPage, loading, } = useSelector((state) => state.repos);

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userRes.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    if (username) {
      dispatch(fetchRepos({ username, page, perPage }));
    }
  }, [username, page, perPage, dispatch]);

  const handlePrev = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNext = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <>
      <Box p={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={user.avatar_url} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h5">{user.name || user.login}</Typography>
            <Typography variant="body2">{user.bio}</Typography>
            <Typography variant="body2">Followers: {user.followers}</Typography>
          </Box>
        </Box>

        <Typography variant="h6" mt={4}>Public Repositories (Page {page}):</Typography>
        <Box mt={2}>
          <Box>
            {
              loading ? (
                <div className='flex items-center justify-center min-h-[200px] '>
                  <FadeLoader color={darkMode?"#fff":"#000000"} size={15} margin={5} speedMultiplier={1.5} />
                </div>
              ) : (
                <>
                  {repos.map((repo) => (
                    <Box
                      key={repo.id}
                      p={2}
                      border="1px solid #ccc"
                      borderRadius={2}
                      mb={2}
                      onClick={() => setSelectedRepo(repo)}
                      sx={{ cursor: 'pointer', backgroundColor: 'background.paper' }}
                    >
                      {repo.name}
                    </Box>
                  ))}
                </>
              )
            }
          </Box>

        </Box>

        <Box mt={2} display="flex" gap={2}>
          <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>
            Previous
          </Button>
          <Button variant="outlined" onClick={handleNext}>
            Next
          </Button>
        </Box>

        {selectedRepo && <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
      </Box>
    </>
  );
};

export default UserDetailPage;
