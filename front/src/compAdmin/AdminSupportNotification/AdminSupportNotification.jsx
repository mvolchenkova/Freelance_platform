import { fetchUsers } from "../../store/Slices/userSlicer";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";

export default function AdminSupportNotification({ record }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users.data || []);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const matchedUser = users.find((user) => user.idUser === record.UserId);
    if (matchedUser) {
      setUserName(matchedUser.login);
    }
  }, [users, record?.UserId]);

  if (record.answer) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        gap: "20px",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "5px 10px",
        borderRadius: "10px"
      }}
    >
      <Box>
        <Typography><strong>Question:</strong> {record.question}</Typography>
        <Typography sx={{ fontSize: "12px", padding: "0px" }}>
          From {userName || 'Unknown user'}
        </Typography>
      </Box>

      <Typography>
        <strong>Status:</strong> Pending
      </Typography>
    </Box>
  );
}
